import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addRoom = asyncHandler(async (req, res) => {
  const { title, description, price, maxGuests, amenities, location } =
    req.body;

  if (
    !title ||
    !description ||
    !price ||
    !maxGuests ||
    !amenities ||
    !location
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Slug Generate for room
  const slug = slugify(title, { lower: true });

  // Handle Image Upload
  const uploadedImages = [];
  if (req.files?.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) uploadedImages.push(uploaded.url);
    }
  }

  // Parse Location Safely
  let parsedLocation;
  try {
    parsedLocation = JSON.parse(location);
  } catch (err) {
    throw new ApiError(400, "Invalid location format");
  }

  // Save Room
  const newRoom = await Room.create({
    title,
    slug,
    description,
    price,
    maxGuests,
    amenities,
    images: uploadedImages,
    location: parsedLocation,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { room: newRoom }, "Room added successfully"));
});

const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find().sort({ createdAt: -1 });
  if (!rooms.length) {
    throw new ApiError(404, "No rooms avaliable");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { rooms }, "Rooms are retrived successfully"));
});

const getRoomBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new ApiError(400, "Slug is required");
  }

  const room = await Room.findOne({ slug });
  if (!room) {
    throw new ApiError(404, "Room not available");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { room }, "Room retrieved  successfully"));
});

export { addRoom, getAllRooms, getRoomBySlug };
