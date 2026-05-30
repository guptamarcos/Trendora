const reviewServices = require("../services/reviewServices.js");

async function getProductReviews(req, res) {
  const { productId } = req.params;

  const result = await reviewServices.getReviews(productId);

  return res.status(200).json(result);
}

async function addProductReview(req, res) {
  const { productId } = req.params;
  const userId = req.user._id;
  const body = req.body;

  const result = await reviewServices.addReviews(body, productId, userId);

  return res.status(201).json(result);
}

async function deleteReview(req, res) {
  const { productId, reviewId } = req.params;

  const result = await reviewServices.deleteReviews(productId, reviewId);

  return res.status(200).json(result);
}

module.exports = { getProductReviews, addProductReview, deleteReview };
