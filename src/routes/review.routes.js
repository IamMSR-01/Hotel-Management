import express from "express";
import { varifyJwt } from "../middlewares/auth.middleware.js";

import {
  createReview,
  updateReview,
  deleteReview,
  getUserReview,
  getRoomReview,
  getAllReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

// protected routes
router.post("/", varifyJwt, createReview);
router.put("/:id", varifyJwt, updateReview);
router.delete("/:id", varifyJwt, deleteReview);
router.get("/user", varifyJwt, getUserReview);

// public routes
router.get("/room/:roomId", getRoomReview);
router.get("/", getAllReviews);

export default router;
