const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");
const ExpressError = require("../utils/ExpressError.js");

async function getWishlistItems(userId) {
  const wishlist = await User.findById(userId).select("wishlist").populate({
    path: "wishlist.product",
    select: "productImage name price",
  });

  return {
    success: true,
    data: wishlist,
  };
}

async function addToWishlist(body, userId) {
  const { productId, size, quantity } = body;
 
  const product = await Product.findById(productId);

  if (!product) {
    throw new ExpressError(404, "Product not found");
  }

  if (product.stock === 0) {
    throw new ExpressError(400, "Product is out of stock");
  }

  if (product.stock < quantity){
    throw new ExpressError(400, "Product is unavailable");
  }

  product.stock -= 1;
  await product.save();

  await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        wishlist: {
          product: productId,
          size,
          quantity,
        },
      },
    },
    { returnDocument: "after" },
  );

  return {
    success: true,
    message: "Product added to wishlist",
  };
}

async function removeWishlistItem(userId, itemId) {
  const item = await User.updateOne(
    { _id: userId },
    {
      $pull: {
        wishlist: { _id: itemId },
      },
    },
  );

  return {
    success: true,
    message: "Item removed successfully",
  };
}

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
};
