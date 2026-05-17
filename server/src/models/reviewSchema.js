const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review Owner is required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product Id is required"],
      index: true,
    },
    content: {
      type: String,
      required: [true, "Review content is required"],
      trim: true,
      minLength: [3, "Review must be at least 3 characters"],
      maxLength: [1000, "Review cannot exceed 1000 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is also required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
