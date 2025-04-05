import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
  const { roomId, rating, comment } = req.body;
  const userId = req.user._id;

  if (!roomId || !rating || !comment) {
    throw new ApiError(400, "room id, rating and comment is required");
  }

  if (!userId) {
    throw new ApiError(400, "User id is missing");
  }

  try {
    const review = await Review.create({
      userId,
      roomId,
      rating,
      comment,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, review, "Review is submitted successfully"));
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "You have already given a review for this room");
    }
    throw new ApiError(500, "Review not submitted please try again");
  }
});

const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const reviewId = req.params.id;
  const userId = req.user._id;

  if (!rating || !comment) {
    throw new ApiError(400, "rating and comment are required");
  }
  if (!reviewId) {
    throw new ApiError(400, "review id missing");
  }
  if (!userId) {
    throw new ApiError(400, "User id missing");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this review");
  }

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;

  await review.save();

  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review updated succussfully"));
});

export { createReview, updateReview };
