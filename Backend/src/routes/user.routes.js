import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserAvatar,
  getUserProfile,
  updateUserProfile
} from "../controllers/user.controller.js";
import { varifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = express.Router();

// 🔓 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// 🔐 Protected Routes
router.post("/logout", varifyJwt, logoutUser);
router.put("/avatar", varifyJwt, upload.single("avatar"), updateUserAvatar);
router.put("/profile", varifyJwt, updateUserProfile);
router.get("/profile/me", varifyJwt, getUserProfile);

export default router;
