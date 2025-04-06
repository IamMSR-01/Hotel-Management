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

const router = express.Router();

// 🔓 Public Routes
router.get("/", getAllRooms);
router.get("/:slug", getRoomBySlug);

// 🔐 Admin/Manager Routes
router.post(
  "/",
  varifyJwt,
  authorizeRoles("admin"),
  addRoom
);

router.put(
  "/:roomId",
  varifyJwt,
  authorizeRoles("admin"),
  updateRoom
);

router.delete(
  "/:roomId",
  varifyJwt,
  authorizeRoles("admin"),
  deleteRoom
);

export default router;
