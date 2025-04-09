import express from "express";
import {
  addRoom,
  getAllRooms,
  getRoomBySlug,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { varifyJwt } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.get("/", varifyJwt, getAllRooms);
router.get("/:slug", getRoomBySlug);

// 🔐 Admin/Manager Routes
router.post(
  "/",
  varifyJwt,
  authorizeRoles("admin"),
  upload.array("images", 10),
  addRoom
);


router.put(
  "/:slug",
  varifyJwt,
  authorizeRoles("admin"),
  upload.array("images", 10),
  updateRoom
);

router.delete(
  "/:slug",
  varifyJwt,
  authorizeRoles("admin"),
  deleteRoom
);

export default router;
