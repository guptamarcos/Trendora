const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");
const { addressSchema } = require("../validations/addressSchemaValidator.js");
const ExpressError = require("../utils/ExpressError.js");

async function getUserOrder(userId) {
  const userOrders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "product",
      select: "productImage name",
    });

  return {
    success: true,
    orders: userOrders,
  };
}

async function getAllOrder() {
  const allOrders = await Order.find({})
    .select("createdAt totalAmount product paymentStatus user")
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "username",
    })
    .populate({
      path: "product",
      select: "productImage name",
    });

  return {
    success: true,
    allOrders,
  };
}

async function addOrder(body,userId) {
  // CHECK CART NOT EMPTY

  const Cart = await User.findById(userId).select("cart").populate({
    path: "cart.product",
  });

  if (!Cart.cart || Cart.cart.length === 0) {
    throw new ExpressError(404, "Please select the item for order");
  }

  const { paymentMethod, ...address } = body;

  // CHECK ADDRESS IS VALID
  const { error, value } = addressSchema.validate(address, {
    abortEarly: false,
  });

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  // CHECK PAYMENT METHOD IS VALID
  const paymentMethods = ["cod", "razorpay", "stripe"];
  if (!paymentMethods.includes(paymentMethod)) {
    throw new ExpressError(400, "Invalid payment method");
  }

  const paymentStatus = paymentMethod === "cod" ? "Pending" : "Completed";

  const allOrders = Cart.cart.map((cartItem) => {
    return {
      user: userId,
      product: cartItem.product._id,
      quantity: cartItem.quantity,
      priceAtOrder: cartItem.product.price,
      size: cartItem.size,
      totalAmount: cartItem.quantity * cartItem.product.price,
      paymentMethod,
      paymentStatus,
      shippingAddress: address,
    };
  });

  const Orders = await Order.create(allOrders);

  const cartItemIds = Cart.cart.map((cartItem) => {
    return cartItem._id;
  });

  await User.updateOne(
    { _id: userId },
    { $pull: { cart: { _id: { $in: cartItemIds } } } },
  );

  return{
    success: true,
    message: "Order crated successfully",
  };
}

module.exports = { addOrder, getUserOrder, getAllOrder };
