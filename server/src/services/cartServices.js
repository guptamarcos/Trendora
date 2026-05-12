const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");

async function getCartItems(userId) {
  const cartItems = await User.findById(userId).select("cart").populate({
    path: "cart.product",
    select: "productImage name price",
  });

  return {
    success: true,
    data: cartItems,
  };
}

async function addToCart(body,userId) {
  const { productId, size, quantity } = body;

  await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        cart: {
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
    message: "Product added to cart",
  };
}

async function removeCartItem(userId, itemId) {
  const cartItems = await User.updateOne(
    { _id: userId },
    {
      $pull: {
        cart: { _id: itemId },
      },
    },
  );

  return {
    success: true,
    message: "Items removed successfully",
  };
}

module.exports = {
  getCartItems,
  addToCart,
  removeCartItem,
};
