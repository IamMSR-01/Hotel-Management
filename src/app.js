import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


// app using express
const app = express();

// cors setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// express setup
app.use(express.json({limit: "12kb"}))
app.use(express.urlencoded({extended: true, limit:"12kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export { app };