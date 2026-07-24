const Review = require("../models/reviewSchema.js");
const Product = require("../models/productSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const isValidDocumentId = require("../utils/Validator.js");

async function getReviews(productId) {
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  // IN CASE OF NO REVIEWS IT WILL RETURN EMPTY ARRAY
  const allReviews = await Review.find({ productId }).populate(
    "userId",
    "username profileImage",
  );

  return {
    success: true,
    allReviews,
  };
}

async function addReviews(body, productId, userId) {
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  let { content, rating } = body;
  if (!rating || !content) {
    throw new ExpressError(400, "Content and rating both fields are required");
  }

  rating = Number(rating);

  if (rating < 1 || rating > 5) {
    throw new ExpressError(400, "Invalid rating");
  }

  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new ExpressError(404, "Product not found");
  }

  const existingReview = await Review.findOne({ productId, userId });
  if (existingReview) {
    if (existingReview.content === "" && content !== "") {
      existingReview.content = content;
      await existingReview.save();
      return {
        success: true,
        message: "Review added successfully",
      };
    } else if (existingReview.content === "" && content === "") {
      throw new ExpressError(409, "You already rated the product");
    } else {
      throw new ExpressError(409, "You already reviewed this product");
    }
  }

  await Review.create({
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

  const { average, count } = existingProduct.rating;

  const newAverage = (average * count + rating) / (count + 1);
  existingProduct.rating.average = newAverage;
  await existingProduct.save();

  const fieldToUpdate = `rating.distribution.${ratingMap[rating]}`;

  await Product.findByIdAndUpdate(
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
  
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  if (!isValidDocumentId(reviewId)) {
    throw new ExpressError(400, "Invalid review Id");
  }

  const product = await Product.findById(productId);
  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new ExpressError(404, "Review not found");
  }

  if (!product) {
    throw new ExpressError(404, "Product not found");
  }

  const { average, count } = product.rating;
  const rating = deletedReview.rating;

  const ratingMap = {
    1: "oneStar",
    2: "twoStar",
    3: "threeStar",
    4: "fourStar",
    5: "fiveStar",
  };

  const fieldToUpdate = `rating.distribution.${ratingMap[rating]}`;

  let newAverage = 0;

  if (count > 1) {
    newAverage = (average * count - rating) / (count - 1);
  }

  await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        "rating.average": Number(newAverage.toFixed(1)),
      },
      $inc: {
        "rating.count": -1,
        [fieldToUpdate]: -1,
      },
    },
    { new: true },
  );
}

module.exports = { getReviews, addReviews, deleteReviews };
