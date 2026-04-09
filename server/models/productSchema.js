const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [100, "Name cannot exceed 20 characters"],
      index: true,
    },
    category: {
      type: String,
      enum: ["men", "boy", "girl", "women"],
      lowercase: true,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
      trim: true,
      maxLength: [500, "Description cannot exceed 500 characters "],
    },
    sizes: {
      type: [String],
      enum: ["XXL", "XL", "L", "M", "S"],
      required: true,
      validate: [
        {
          validator: (arr) => arr.length > 0,
          message: "At least one size required",
        },
        {
          validator: (arr) => arr.length === new Set(arr).size,
          message: "Duplicate sizes not allowed",
        },
      ],
    },
    productImage: {
      url: {
        type: String,
        required: [true, "Product Image url is required"],
      },
      filename: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      min: [0, "Price can't be negative"],
    },
    stock: {
      type: Number,
      min: [0, "Stock can't be negative"],
      required: [true, "Product Stock is required"],
      default: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
