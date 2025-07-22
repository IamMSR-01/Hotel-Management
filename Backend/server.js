import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/user.routes.js";
import hotelRouter from "./routes/hotel.routes.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware());


// api to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks)

app.get("/", (req, res) => res.send("API is working well and good"));
app.use("/api/user", userRouter)
app.use("/api/hotels", hotelRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
