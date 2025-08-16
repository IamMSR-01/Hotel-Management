import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/user.routes.js";
import hotelRouter from "./routes/hotel.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/room.routes.js";
import bookingRouter from "./routes/booking.routes.js";

connectCloudinary();
const app = express();

app.use(cors());

// --- FIX: Handle webhooks BEFORE parsing all other JSON bodies ---
app.use("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// Now, use express.json() for all other routes
app.use(express.json());

// All other middleware and routes follow
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
}));



app.get("/", (req, res) => res.send("API is working well and good"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 5000; // Changed to 5000 to match your other files

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});