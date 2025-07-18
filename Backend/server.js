import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API is working well and good"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
