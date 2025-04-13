import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js";
import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPayment = asyncHandler(async (req, res) => {
  const { amount, paymentMethod, bookingId, transactionId, status } = req.body;
  const { userId } = req.params;

  if (!amount || !paymentMethod || !transactionId || !status || !bookingId) {
    throw new ApiError(400, "All fields are required");
  }
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const payment = await Payment.create({
    userId,
    bookingId,
    amount,
    paymentMethod,
    transactionId,
    status,
  });
  booking.paymentStatus = status;
  await booking.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Payment done successfully", payment));
});

const getPaymentById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  const payment = await Payment.find({ userId })
    .populate("userId", "fullName email")
    .populate("bookingId")
    .sort({ createdAt: -1 });
  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }
  return res.status(200).json(new ApiResponse(200, "Payment fetched", payment));
});

const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
    .populate("userId", "fullName email")
    .populate("bookingId")
    .sort({ createdAt: -1 });
  if (!payments) {
    throw new ApiError(404, "Payments not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Payments fetched", payments));
});

export { createPayment, getPaymentById, getAllPayments };
