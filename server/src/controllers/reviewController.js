const reviewServices = require("../services/reviewServices.js");
const isValidDocumentId = require("../utils/Validator.js");
const ExpressError = require("../utils/ExpressError.js");

async function getProductReviews(req, res) {
  const { productId } = req.params;
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await reviewServices.getReviews(productId);

  return res.status(200).json(result);
}

async function addProductReview(req, res) {
  const { productId } = req.params;
  const userId = req.user._id;
  const body = req.body;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await reviewServices.addReviews(body, productId, userId);

  return res.status(201).json(result);
}

async function deleteReview(req, res) {
  const { productId, reviewId } = req.params;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  if (!isValidDocumentId(reviewId)) {
    throw new ExpressError(400, "Invalid review Id");
  }

  const result = await reviewServices.deleteReviews(productId, reviewId);

  return res.status(200).json(result);
}

module.exports = { getProductReviews, addProductReview, deleteReview };
