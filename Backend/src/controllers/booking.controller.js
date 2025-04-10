import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";
import mongoose from "mongoose";

// Create Booking
const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkInDate, checkOutDate, guests } = req.body;
  const userId = req.user?._id;

  if (!roomId || !checkInDate || !checkOutDate || !guests || !userId) {
    throw new ApiError(400, "All fields are required including user ID");
  }

  if (new Date(checkInDate) >= new Date(checkOutDate)) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const room = await Room.findById(roomId).session(session);
      if (!room) throw new ApiError(404, "Room not found");

      const existingBooking = await Booking.findOne({
        roomId,
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
        status: { $ne: "Cancelled" },
      }).session(session);

      if (existingBooking) {
        throw new ApiError(400, "Room is already booked for selected dates");
      }

      const nights = Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = nights * room.price;

      const [newBooking] = await Booking.create(
        [
          {
            roomId,
            userId,
            checkInDate,
            checkOutDate,
            totalPrice,
            status: "Pending",
            paymentStatus: "Pending",
          },
        ],
        { session }
      );

      return res
        .status(201)
        .json(
          new ApiResponse(201, { booking: newBooking }, "Booking successful")
        );
    });
  } catch (error) {
    console.error("Booking Error:", error.message);
    throw new ApiError(500, "Internal server error | Booking failed");
  } finally {
    session.endSession();
  }
});

// Update Booking
const updateBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { checkInDate, checkOutDate } = req.body;

  if (!bookingId || !checkInDate || !checkOutDate) {
    throw new ApiError(400, "Missing required fields");
  }

  if (new Date(checkInDate) >= new Date(checkOutDate)) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) throw new ApiError(404, "Booking not found");

    const overlappingBooking = await Booking.findOne({
      roomId: booking.roomId,
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
      status: { $ne: "Cancelled" },
      _id: { $ne: bookingId },
    }).session(session);

    if (overlappingBooking) {
      throw new ApiError(400, "Room already booked for selected dates");
    }

    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;
    await booking.save({ session });

    await session.commitTransaction();
    res
      .status(200)
      .json(new ApiResponse(200, { booking }, "Booking updated successfully"));
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(500, "Internal server error | Booking update failed");
  } finally {
    session.endSession();
  }
});

// Delete Booking (Soft delete)
const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) throw new ApiError(404, "Booking not found");

    if (booking.status === "Cancelled") {
      throw new ApiError(400, "Booking is already cancelled");
    }

    booking.status = "Cancelled";
    await booking.save({ session });

    await session.commitTransaction();
    res
      .status(200)
      .json(
        new ApiResponse(200, { booking }, "Booking cancelled successfully")
      );
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(
      500,
      "Internal server error | Booking cancellation failed"
    );
  } finally {
    session.endSession();
  }
});

// Get Booking by ID
const getBookingById = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId)
    .populate("userId", "fullName email")
    .populate("roomId", "title price");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { booking }, "Booking fetched successfully"));
});

// Get Bookings of a User
const getUserBookings = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const bookings = await Booking.find({ userId })
    .populate("roomId", "title price")
    .sort({ createdAt: -1 });

  if (!bookings || bookings.length === 0) {
    throw new ApiError(404, "No bookings found for this user");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { bookings }, "User bookings fetched successfully")
    );
});

// Get All Bookings (Admin)
const getAllBookings = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    paymentStatus,
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const matchStage = {};
  if (status) matchStage.status = status;
  if (paymentStatus) matchStage.paymentStatus = paymentStatus;

  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "rooms",
        localField: "roomId",
        foreignField: "_id",
        as: "room",
      },
    },
    { $unwind: "$room" },
    {
      $match: {
        ...matchStage,
        ...(search && {
          $or: [
            { "user.fullName": { $regex: search, $options: "i" } },
            { "user.email": { $regex: search, $options: "i" } },
          ],
        }),
      },
    },
    {
      $project: {
        _id: 1,
        checkInDate: 1,
        checkOutDate: 1,
        totalPrice: 1,
        status: 1,
        paymentStatus: 1,
        createdAt: 1,
        "user.fullName": 1,
        "user.email": 1,
        "room.title": 1,
        "room.price": 1,
      },
    },
    {
      $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
    },
  ];

  const options = {
    page: Number(page),
    limit: Number(limit),
  };

  const bookings = await Booking.aggregatePaginate(
    Booking.aggregate(pipeline),
    options
  );

  if (!bookings || bookings.docs.length === 0) {
    throw new ApiError(404, "No bookings found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
});

export {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getUserBookings,
  getAllBookings,
};
