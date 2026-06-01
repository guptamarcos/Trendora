const Product = require("../models/productSchema.js");
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

  const product = await Product.find({ _id: productId });

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

  const product = await Product.findById(productId);

  if (!product) {
    throw new ExpressError(404, "Product not found");
  }

  const relatedProducts = await Product.find({ category: product.category })
    .select("productImage category price name")
    .limit(5);

  return {
    success: true,
    data: relatedProducts,
  };
}

async function getAllUserProducts() {
  const allProducts = await Product.find({});

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
  if (typeof body.sizes === "string") {
    body.sizes = body.sizes.split(",");
  }

  if(!file){
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

  // Handle sizes
  if (typeof body.sizes === "string") {
    body.sizes = body.sizes.split(",");
  }

  // Validation
  const { error, value } = productSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => err.name);
    throw new ExpressError(422, errors);
  }

  const { name, category, description, sizes, price, stock } = value;

  // Prepare update object
  const updateData = {
    name,
    category,
    description,
    sizes,
    price,
    stock,
  };

  if (file) {
    const { filename, path } = file;

    // delete old image FIRST
    if (product.productImage?.filename) {
      await cloudinary.uploader.destroy(product.productImage.filename);
    }

    updateData.productImage = {
      url: path,
      filename: filename,
    };
  }

  // Single DB call
  await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  return {
    success: true,
    message: "Product Information edited successfully",
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

  return {
    success: true,
    message: "Product deleted successfully",
  };
}

async function getProducts(search, category, limit) {
  let query = {};

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
