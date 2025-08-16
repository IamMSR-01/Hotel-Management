import { requireAuth } from "@clerk/express";
import User from "../models/user.model.js";

export const protect = [
  requireAuth(), 
  async (req, res, next) => {
    try {
      const { userId } = req.auth; 
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protect middleware:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
];
