import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from '@clerk/express'

// app using express
const app = express();


// clerk Middleware setup
app.use(clerkMiddleware);

// cors setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// express setup
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// declared routes
app.use("/api/clerk", clerkWebhooks);


export { app };
