import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
} from "../controllers/payment.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";

const router = express.Router();

router.post("/", verifyJwt, createPayment);
router.get("/", verifyJwt, authorizeRoles, getAllPayments);
router.get("/:id", verifyJwt, getPaymentById);

export default router;
