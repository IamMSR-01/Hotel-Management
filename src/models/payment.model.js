import mongoose, { mongo, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const paymentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Card", "UPI", "Bank Transfer", "Cash"],
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);


paymentSchema.plugin(mongooseAggregatePaginate);

export const Payment = mongoose.model("Payment", paymentSchema);
