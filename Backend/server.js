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

console.log("--- ✅ SERVER IS STARTING WITH LATEST CODE ---");

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use("/api/clerk", clerkWebhooks);



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