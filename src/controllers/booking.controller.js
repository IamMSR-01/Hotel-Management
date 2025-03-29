import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";
import mongoose from "mongoose";

const createBooking = asyncHandler(async (req, res) => {
  const { roomId, userId, checkInDate, checkOutDate, guests } = req.body;

  // Validate required fields
  if (!roomId || !userId || !checkInDate || !checkOutDate || !guests) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure check-in date is before check-out date
  if (new Date(checkInDate) >= new Date(checkOutDate)) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // Fetch room details
      const room = await Room.findById(roomId).session(session);
      if (!room) throw new ApiError(404, "Room not found");

      // Check if the room is available for the selected dates
      const existingBooking = await Booking.findOne({
        roomId,
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
        status: { $ne: "Cancelled" },
      }).session(session);

      if (existingBooking) {
        throw new ApiError(400, "Room is already booked for selected dates");
      }

      // Calculate total price based on the number of nights
      const nights = Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = nights * room.price;

      // Create new booking
      const newBooking = await Booking.create(
        [
          {
            roomId,
            userId,
            checkInDate,
            checkOutDate,
            totalPrice,
            status: "Pending",
            paymentStatus: "pending",
          },
        ],
        { session }
      );

      res
        .status(201)
        .json(
          new ApiResponse(201, { booking: newBooking[0] }, "Booking successful")
        );
    });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error | Booking failed");
  } finally {
    session.endSession();
  }
});
const updateBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { checkInDate, checkOutDate } = req.body;
  
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      throw new ApiError(400, "Check-out date must be after check-in date");
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const booking = await Booking.findById(bookingId).session(session);
      if (!booking) throw new ApiError(404, "Booking not found");
  
      const existingBooking = await Booking.findOne({
        roomId: booking.roomId,
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
        status: { $ne: "Cancelled" },
        _id: { $ne: bookingId },
      }).session(session);
  
      if (existingBooking) {
        throw new ApiError(400, "Room is already booked for selected dates");
      }
  
      booking.checkInDate = checkInDate;
      booking.checkOutDate = checkOutDate;
      await booking.save({ session });
  
      await session.commitTransaction();
      session.endSession();
  
      return res
        .status(200)
        .json(new ApiResponse(200, { booking }, "Booking updated successfully"));
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(500, "Internal server error | Booking update failed");
    }
  });
  
export { createBooking, updateBooking };
