import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 25,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    //   default: ""
    },
    refreshToken: {
      type: String,
      default: null
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
