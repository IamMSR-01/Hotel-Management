import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password, phoneNumber } = req.body;

  if (!username || !fullName || !email || !password) {
    throw new ApiError(400, "Username, fullName, email, and password are required");
  }

  const phone = parseInt(phoneNumber, 10);
  if (Number.isNaN(phone) || !phoneNumber.trim()) {
    throw new ApiError(400, "Valid phone number is required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new ApiError(401, "This email or username already exists");
  }

  let avatarUrl = "";
  if (req.files?.avatar?.length > 0) {
    try {
      const avatarLocalPath = req.files.avatar[0].path;
      const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
      avatarUrl = uploadedAvatar?.url || "";
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new ApiError(500, "Avatar upload failed. Please try again.");
    }
  }

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    phoneNumber: phone,
    avatar: avatarUrl,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Internal server error | User not registered");
  }

  return res.status(200).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
