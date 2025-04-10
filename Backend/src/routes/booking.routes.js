import express from "express";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getUserBookings,
  getAllBookings,
} from "../controllers/booking.controller.js";
import { varifyJwt } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";

const router = express.Router();

// 🔐 User Routes
router.post("/create", varifyJwt, createBooking);
router.put(
  "/update/:bookingId",
  varifyJwt,
  authorizeRoles("user", "admin"), 
  updateBooking
);
router.delete(
  "/cancel/:bookingId",
  varifyJwt,
  authorizeRoles("user", "admin"), 
  deleteBooking
);
router.get("/user/:userId", varifyJwt, getUserBookings);

router.get("/:bookingId", varifyJwt, authorizeRoles("user","admin"), getBookingById);

// 🔐 Admin Routes
router.get("/all", varifyJwt, authorizeRoles("admin"), getAllBookings);

export default router;
