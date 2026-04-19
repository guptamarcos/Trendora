const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");
const { addressSchema } = require("../utils/addressSchemaValidator.js");

async function addOrder(req, res) {
  // CHECK CART NOT EMPTY
  const userId = req.user._id;
  const Cart = await User.findById(userId)
  .select("cart")
  .populate({
    path: "cart.product",
  });


  if (!Cart.cart || Cart.cart.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Please select the item for order",
    });
  }

  const { paymentMethod, ...address } = req.body;

  // CHECK ADDRESS IS VALID
  const { error, value } = addressSchema.validate(address, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  // CHECK PAYMENT METHOD IS VALID
  const paymentMethods = ["cod", "razorpay", "stripe"];
  if (!paymentMethods.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment method",
    });
  }

  const paymentStatus = paymentMethod === "cod" ? "Pending" : "Completed";
  
  const allOrders = Cart.cart.map((cartItem) => {
    return {
      user: userId,
      product: cartItem.product._id,
      quantity: cartItem.quantity,
      priceAtOrder: cartItem.product.price,
      size: cartItem.size,
      totalAmount: (cartItem.quantity * cartItem.product.price),
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

  return res.status(201).json({
    success: true,
    message: "Order crated successfully",
  });
}

async function getUserOrder(req, res) {
  const userId = req.user._id;
  const userOrders = await Order.find({ user: userId }).sort({ createdAt: -1 })
    .populate({
      path: "product",
      select: "productImage name",
    })

  return res.status(200).json({
    success: true,
    orders: userOrders,
  });
}

async function getAllOrder(req, res) {
  const allOrders = await Order.find({})
    .select("createdAt totalAmount product paymentStatus user")
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "username"
    })
    .populate(
      {
        path: "product",
        select: "productImage name",
      },
    );

  return res.status(200).json({
    success: true,
    allOrders,
  });
}

module.exports = { addOrder, getUserOrder,getAllOrder };
