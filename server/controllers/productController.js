const Product = require("../models/productSchema.js");
const {
  productSchemaValidator,
} = require("../utils/productSchemaValidator.js");
const cloudinary = require("cloudinary").v2;

async function addProduct(req, res) {
  if (typeof req.body.sizes === "string") {
    req.body.sizes = req.body.sizes.split(",");
  }

  const { error, value } = productSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { name, category, description, sizes, price, stock } = value;
  const { filename, path } = req.file;

  const cratedProduct = await Product.create({
    name,
    category,
    description,
    sizes,
    price,
    stock,
    productImage: { url: path, filename: filename },
  });

  return res.status(201).json({
    success: true,
    message: "Product added successfully",
  });
}

async function getAllProducts(req, res) {
  const allProducts = await Product.find({}).select({
    name: 1,
    category: 1,
    productImage: 1,
    price: 1,
    stock: 1,
  });

  res.status(200).json({
    success: true,
    data: allProducts,
  });
}

async function deleteProduct(req, res) {
  const { productId } = req.params;

  const findProduct = await Product.find({ _id: productId });

  if (!findProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const deleteProduct = await Product.deleteOne({ _id: productId });

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}

async function getProductInfo(req, res) {
  const { productId } = req.params;

  const product = await Product.find({ _id: productId });
  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: product,
  });
}

async function editProductInfo(req, res) {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Handle sizes
  if (typeof req.body.sizes === "string") {
    req.body.sizes = req.body.sizes.split(",");
  }

  // Validation
  const { error, value } = productSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
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

  const file = req.file;

  // If new image uploaded
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

  return res.status(200).json({
    success: true,
    message: "Product Information edited successfully",
  });
}

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductInfo,
  editProductInfo,
};
