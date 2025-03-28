import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addRoom = asyncHandler(async (req, res) => {
  const { title, description, price, maxGuests, amenities, location } = req.body;

  if (!title || !description || !price || !maxGuests || !amenities || !location) {
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

  return res.status(201).json(new ApiResponse(201, { room: newRoom }, "Room added successfully"));
});

export { addRoom };
