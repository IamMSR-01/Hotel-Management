import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  user.refreshToken = user.generateRefreshToken();
  await user.save({ validateBeforeSave: false });

  return {
    accessToken: user.generateAccessToken(),
    refreshToken: user.refreshToken,
  };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password, phoneNumber } = req.body;
  if (!username || !fullName || !email || !password || !phoneNumber.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  if (await User.exists({ $or: [{ email }, { username }] })) {
    throw new ApiError(401, "Email or Username already exists");
  }

  let avatarUrl = "";
  if (req.files?.avatar?.length > 0) {
    try {
      avatarUrl =
        (await uploadOnCloudinary(req.files.avatar[0].path))?.url || "";
    } catch {
      throw new ApiError(500, "Avatar upload failed");
    }
  }

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    phoneNumber,
    avatar: avatarUrl,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password)
    throw new ApiError(400, "Identifier and password are required");

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
  return res
    .status(200)
    .clearCookie("accessToken", { httpOnly: true, secure: true })
    .clearCookie("refreshToken", { httpOnly: true, secure: true })
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  if (!incommingRefreshToken) throw new ApiError(401, "Unauthorized request");

  const decodedToken = jwt.verify(
    incommingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedToken?._id);
  if (!user || incommingRefreshToken !== user.refreshToken)
    throw new ApiError(401, "Invalid refresh token");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Token refreshed successfully"
      )
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  if (!req.file?.path) throw new ApiError(400, "Avatar file is missing");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (user.avatar) await deleteFromCloudinary(user.avatar);
  user.avatar = (await uploadOnCloudinary(req.file.path))?.url || "";

  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(400, "User ID is missing");

  const userProfile = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "userId",
        as: "bookings",
      },
    },
    { $unwind: { path: "$bookings", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "rooms",
        localField: "bookings.roomId",
        foreignField: "_id",
        as: "bookings.roomDetails",
      },
    },
    {
      $lookup: {
        from: "payments",
        localField: "bookings._id",
        foreignField: "bookingId",
        as: "bookings.paymentDetails",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "userId",
        as: "reviews",
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        fullName: { $first: "$fullName" },
        email: { $first: "$email" },
        phoneNumber: { $first: "$phoneNumber" },
        avatar: { $first: "$avatar" },
        bookings: { $push: "$bookings" },
        reviews: { $first: "$reviews" },
      },
    },
  ]);

  if (!userProfile.length) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, userProfile[0], "User retrieved successfully"));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, username } = req.body;
  if (
    !fullName?.trim() ||
    !email?.trim() ||
    !phoneNumber?.trim() ||
    !username?.trim()
  )
    throw new ApiError(400, "All fields are required");

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
    _id: { $ne: req.user._id },
  });
  if (existingUser) throw new ApiError(400, "Email or Username already exists");

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, email, phoneNumber, username },
    { new: true, runValidators: true }
  );
  if (!updatedUser) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User profile updated successfully")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserAvatar,
  getUserProfile,
  updateUserProfile,
};
