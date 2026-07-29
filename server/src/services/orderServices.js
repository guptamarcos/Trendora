const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");
const Product = require("../models/productSchema.js")
const { addressSchema } = require("../validations/addressSchemaValidator.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  orderConfirmationEmail,
  orderCancelEmail,
} = require("./emailServices.js");
const isValidDocumentId = require("../utils/Validator.js");

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

async function addOrder(body, userId) {
  // CHECK CART NOT EMPTY
  const user = await User.findById(userId).select("cart email username").populate({
    path: "cart.product",
  });

  if (!user.cart || user.cart.length === 0) {
    throw new ExpressError(404, "Please select the items for order");
  }

  const { paymentMethod, ...address } = body;

  // CHECK ADDRESS IS VALID
  const { error, value } = addressSchema.validate(address, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new ExpressError(422, errors);
  }

  // CHECK PAYMENT METHOD IS VALID
  const paymentMethods = ["cod", "razorpay", "stripe"];

  if (!paymentMethods.includes(paymentMethod)) {
    throw new ExpressError(400, "Invalid payment method");
  }

  const paymentStatus = paymentMethod === "cod" ? "Pending" : "Completed";

  // CREATE ORDER DATA
  const allOrders = user.cart.map((cartItem) => ({
    user: userId,
    product: cartItem.product._id,
    quantity: cartItem.quantity,
    priceAtOrder: cartItem.product.price,
    size: cartItem.size,
    totalAmount: cartItem.quantity * cartItem.product.price,
    paymentMethod,
    paymentStatus,
    shippingAddress: address,
  }));

  // SAVE ORDERS
  const orders = await Order.create(allOrders);

  // REMOVE CART ITEMS
  const cartItemIds = user.cart.map((cartItem) => cartItem._id);

  await User.updateOne(
    { _id: userId },
    {
      $addToSet: {
        addresses: value,
      },
      $pull: {
        cart: {
          _id: { $in: cartItemIds },
        },
      },
    },
  );

  const ordersId = orders.map((order) => order._id);
  
  
  // DATA SEND WITH EMAIL
  const orderDetails = {
    customerName: user.username,

    products: user.cart.map((item) => ({
      name: item.product.name,
      image: item.product.productImage.url,
      quantity: item.quantity,
      size: item.size,
      price: item.product.price,
      total: item.quantity * item.product.price,
    })),

    paymentMethod,
    paymentStatus,
    shippingAddress: address,

    totalAmount: user.cart.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0),

    orderDate: new Date().toLocaleDateString(),
  };

  // SEND EMAIL
  
  const OrderConfirmationEmail = await orderConfirmationEmail(
    user?.email,
    orderDetails,
  );

  if (!OrderConfirmationEmail) {
    console.log(
      "Order confirmation email is not sent for email : ",
      user.email,
    );
  }

  return {
    success: true,
    message: "Order created successfully",
  };
}

async function getOrders(search, status, limit) {
  let query = {};

  if (!limit) {
    throw new ExpressError(400, "limit is required");
  }

  limit = Number(limit);

  if (!Number.isInteger(limit) || limit <= 0) {
    throw new ExpressError(400, "Limit must be a positive integer");
  }

  if (status) {
    query.orderStatus = status[0].toUpperCase() + status.slice(1);
  }

  if (search) {
    const users = await User.find({
      username: {
        $regex: search,
        $options: "i",
      },
    }).select("_id");

    query.user = {
      $in: users.map((u) => u._id),
    };
  }

  const matchedOrdersCount = await Order.countDocuments(query);

  const orders = await Order.find(query).populate("user").limit(limit);

  return {
    success: true,
    data: orders,
    matchedOrdersCount,
  };
}

async function updateOrderStatus(orderId, status) {
  if (!isValidDocumentId(orderId)) {
    throw new ExpressError(400, "Invalid order id");
  }

  const orderStatus = [
    "Pending",
    "Shipped",
    "Completed",
    "Delivered",
    "Cancelled",
  ];

  if (!orderStatus.includes(status)) {
    throw new ExpressError(400, "Invalid Order status");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ExpressError(404, "Order not found");
  }

  if (order.orderStatus === "Cancelled") {
    throw new ExpressError(
      400,
      "You can't update the order status it's is already cancelled",
    );
  }

  order.orderStatus = status;
  if (status === "Cancelled") {
    if ((order.paymentStatus = "Pending")) {
      order.paymentStatus = "Cancelled";
    } else {
      order.paymentStatus = "Refunded";
    }
  }

  await order.save();

  return {
    success: true,
    message: "Order status updated successfully",
  };
}

async function cancelOrder(orderId, user) {
  if (!isValidDocumentId(orderId)) {
    throw new ExpressError(400, "Invalid order id");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ExpressError(404, "Order not found");
  }

  

  if (order.user.toString() !== user._id.toString()) {
    throw new ExpressError(403, "You are unauthorized for cancel this order");
  }

  if (order.orderStatus === "Cancelled") {
    throw new ExpressError(400, "Order is already cancelled");
  }

  order.orderStatus = "Cancelled";
  await order.save();

  const product = await Product.findById(order.product);
  const productName = product.name;

  const OrderCancelEmail = await orderCancelEmail({
    userName: user.username,
    email: user.email,
    orderId: order._id,
    productName,
  });

  if (!OrderCancelEmail) {
    console.log(
      "Order confirmation email is not sent for email : ",
      user.email,
    );
  }

  return {
    success: true,
    message: "Order cancelled successfully",
  };
}

module.exports = {
  addOrder,
  getUserOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
};
