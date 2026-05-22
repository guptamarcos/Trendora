const productServices = require("../services/productServices.js");
const isValidDocumentId = require("../utils/Validator.js");
const ExpressError = require("../utils/ExpressError.js");

async function getProductInfo(req, res) {
  const { productId } = req.params;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await productServices.getProductInfo(productId);

  return res.status(200).json(result);
}

async function getBestSeller(req, res) {
  const result = await productServices.getBestSeller();

  return res.status(200).json(result);
}

async function getRelatedProducts(req, res) {
  let { productId } = req.params;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await productServices.getRelatedProducts(productId);

  return res.status(200).json(result);
}

async function getAllUserProducts(req, res) {
  const result = await productServices.getAllUserProducts();

  res.status(200).json(result);
}

async function latestCollections(req, res) {
  const result = await productServices.latestCollections();

  return res.status(200).json(result);
}

async function addProduct(req, res) {
  const result = await productServices.addProduct(req.body, req.file);

  return res.status(201).json(result);
}

async function editProductInfo(req, res) {
  const { productId } = req.params;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await productServices.editProductInfo(
    req.body,
    req.file,
    productId,
  );

  return res.status(200).json(result);
}

async function deleteProduct(req, res) {
  const { productId } = req.params;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await productServices.deleteProduct(productId);

  return res.status(200).json(result);
}

async function updateProductRating(req, res) {
  const { productId } = req.params;
  const { rating } = req.body;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const result = await productServices.updateProductRating(productId, rating);

  return res.status(201).json(result);
}

async function getProducts(req, res) {
  const { search, category, limit } = req.query;
  const result = await productServices.getProducts(search, category, limit);
  return res.status(200).json(result);
}

module.exports = {
  addProduct,
  deleteProduct,
  getProductInfo,
  editProductInfo,
  latestCollections,
  getBestSeller,
  getRelatedProducts,
  getAllUserProducts,
  getProducts,
  updateProductRating,
};
