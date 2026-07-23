const Product = require("../models/productSchema.js");
const Review = require("../models/reviewSchema.js");
const User = require("../models/userSchema.js");
const {
  productSchemaValidator,
} = require("../validations/productSchemaValidator.js");
const cloudinary = require("cloudinary").v2;
const ExpressError = require("../utils/ExpressError.js");
const isValidDocumentId = require("../utils/Validator.js");

async function getProductInfo(productId) {
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ExpressError(404, "Product not found");
  }

  return {
    success: true,
    data: product,
  };
}

async function getBestSeller() {
  const bestSellers = await Product.find({})
    .select("productImage rating price name")
    .sort({ "rating.average": -1 })
    .limit(10);

  return {
    success: true,
    data: bestSellers,
  };
}

async function getRelatedProducts(productId) {
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const currProduct = await Product.findById(productId);

  if (!currProduct) {
    throw new ExpressError(404, "Product not found");
  }

  const relatedProducts = await Product.find({ category: currProduct.category })
    .select("productImage category price name")
    .limit(5);

  return {
    success: true,
    data: relatedProducts,
  };
}

async function getAllUserProducts() {
  const allProducts = await Product.find({}).sort({ createdAt: -1 });

  return {
    success: true,
    data: allProducts,
  };
}

async function latestCollections() {
  const products = await Product.find()
    .select("productImage updatedAt price name")
    .sort({ updatedAt: -1 })
    .limit(10);

  return {
    success: true,
    data: products,
  };
}

async function addProduct(body, file) {
  if (typeof body?.sizes === "string") {
    body.sizes = body.sizes.split(",");
  }

  if (!file) {
    throw new ExpressError(400, "Product Image is required");
  }

  const { error, value } = productSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => err.name);
    throw new ExpressError(400, errors);
  }

  const { name, category, description, sizes, price, stock } = value;
  const { filename, path } = file;

  const cratedProduct = await Product.create({
    name,
    category,
    description,
    sizes,
    price,
    stock,
    productImage: { url: path, filename: filename },
  });

  return {
    success: true,
    message: "Product added successfully",
  };
}

async function editProductInfo(body, file, productId) {
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ExpressError(404, "Product not found");
  }

  if (typeof body?.sizes === "string") {
    body.sizes = body.sizes.split(",");
  }

  const { error, value } = productSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new ExpressError(422, errors);
  }

  const updateData = { ...value };

  let oldImage = null;

  if (file) {
    oldImage = product.productImage?.filename;

    updateData.productImage = {
      url: file.path,
      filename: file.filename,
    };
  }

  await Product.findByIdAndUpdate(productId, updateData, {
    runValidators: true,
    new: true,
  });

  if (oldImage) {
    await cloudinary.uploader.destroy(oldImage);
  }

  return {
    success: true,
    message: "Product information edited successfully",
  };
}

async function deleteProduct(productId) {
  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product Id");
  }
  
  const deletedProduct = await Product.findByIdAndDelete(productId);
  
  if (!deletedProduct) {
    throw new ExpressError(404, "Product not found");
  }

  // IF PRODUCT IS DELETED THAN ALSO DELETE THE REVIEWS OF THAT PRODUCT
  await Review.deleteMany({productId});

  return {
    success: true,
    message: "Product deleted successfully",
  };
}

async function getProducts(search, category, limit) {
  let query = {};
  if (!limit) {
    throw new ExpressError(400, "limit is required");
  }

  limit = Number(limit);

  if (!Number.isInteger(limit) || limit <= 0) {
    throw new ExpressError(400, "Limit must be a positive integer");
  }

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category.toLowerCase();
  }

  const allProducts = await Product.find(query).limit(Number(limit));
  const matchedProductsCount = await Product.countDocuments(query);

  return {
    success: true,
    data: allProducts,
    matchedProductsCount,
  };
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
};
