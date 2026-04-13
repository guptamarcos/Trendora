const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");

async function addToCart(req, res) {
  const { productId, size, quantity } = req.body;

  const userId = req.user;

  console.log(userId);
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

  return res.status(201).json({
    success: true,
    message: "Product added to cart",
  });
}

async function getCartItems(req, res) {
  const userId = req.user._id;

  const cartItems = await User.findById(userId).select("cart").populate({
    path: "cart.product",
    select: "productImage name price",
  });

  return res.status(200).json({
    success: true,
    data: cartItems,
  });
}

async function removeCartItem(req, res) {
  const userId = req.user._id;
  const { cartItemId } = req.params;

  const cartItems = await User.updateOne({ _id: userId },{
      $pull: {
        cart: { _id: cartItemId },
      },
    },
  );

  return res.status(200).json({
    success: true,
    message: "Items removed successfully",
  });
}

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
};
