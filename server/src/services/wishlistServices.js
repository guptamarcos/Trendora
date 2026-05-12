const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");

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
