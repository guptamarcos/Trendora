const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");

async function getWishlistItems(req, res) {
  const userId = req.user._id;

  const wishlist = await User.findById(userId).select("wishlist").populate({
    path: "wishlist.product",
    select: "productImage name price",
  });

  return res.status(200).json({
    success: true,
    data: wishlist,
  });
}

async function addToWishlist(req, res) {
  const { productId, size, quantity } = req.body;

  const userId = req.user;

  console.log(userId);
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

  return res.status(201).json({
    success: true,
    message: "Product added to wishlist",
  });
}


async function removeWishlistItem(req, res) {
  const userId = req.user._id;
  const { itemId } = req.params;

  const item = await User.updateOne(
    { _id: userId },
    {
      $pull: {
        wishlist: { _id: itemId },
      },
    },
  );

  return res.status(200).json({
    success: true,
    message: "Item removed successfully",
  });
}

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
};
