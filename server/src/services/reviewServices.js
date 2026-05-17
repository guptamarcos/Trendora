const Review = require("../models/reviewSchema.js");
const Product = require("../models/productSchema.js");
const ExpressError = require("../utils/ExpressError.js");

async function getReviews(productId) {
  const allReviews = await Review.find({ productId: productId })
    .populate("userId", "username profileImage")

  return {
    success: true,
    allReviews,
  };
}

async function addReviews(body, productId, userId) {
  let { content, rating } = body;
  rating = Number(rating);

  if (rating < 1 || rating > 5) {
    throw new ExpressError(400, "Invalid rating value");
  }

  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new ExpressError(404, "Product not found");
  }

  const existingReview = await Review.findOne({ productId, userId });
  if (existingReview) {
    throw new ExpressError(400, "You already reviewed this product");
  }

  const newReview = await Review.create({
    productId,
    userId,
    content,
    rating,
  });

  const ratingMap = {
    1: "oneStar",
    2: "twoStar",
    3: "threeStar",
    4: "fourStar",
    5: "fiveStar",
  };

  const fieldToUpdate = `rating.distribution.${ratingMap[rating]}`;

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: {
        "rating.count": 1,
        [fieldToUpdate]: 1,
      },
    },
    { new: true },
  );

  return {
    success: true,
    message: "Review added successfully",
  };
}

async function deleteReviews(productId, reviewId) {
  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new ExpressError(404, "Review not found");
  }

  const rating = deletedReview.rating;

  const ratingMap = {
    1: "oneStar",
    2: "twoStar",
    3: "threeStar",
    4: "fourStar",
    5: "fiveStar",
  };

  const fieldToUpdate = `rating.distribution.${ratingMap[rating]}`;

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: {
        "rating.count": -1,
        [fieldToUpdate]: -1,
      },
    },
    { new: true },
  );

  return {
    success: true,
    message: "Review deleted successfully",
  };
}

module.exports = { getReviews, addReviews, deleteReviews };
