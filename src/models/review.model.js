import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const reviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ userId: 1, roomId: 1 }, { unique: true });

reviewSchema.plugin(mongooseAggregatePaginate);


export const Review = mongoose.model("Review", reviewSchema);
