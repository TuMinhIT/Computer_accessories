import Review from "../models/review_model.js";
import ApiError from "../utils/apiError.js";

const createReview = async (data) => {
  const reviewData = {
    user: data.user,
    rating: data.rating,
    comment: data.comment,
    targetId: data.targetId,
    targetType: data.targetType,
  };

  const review = await Review.create(reviewData);
  return review;
};

const getReviews = async () => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  return reviews;
};

const updateReview = async (id, data) => {
  const review = await Review.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  return review;
};

const deleteReview = async (id) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  await Review.findByIdAndDelete(id);
  return review;
};

export default {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
