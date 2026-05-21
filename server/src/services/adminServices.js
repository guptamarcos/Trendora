const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");
const Product = require("../models/productSchema.js");
const { getExactTime } = require("../utils/Helper.js");

// THESE ARE THE SUBPART OF DASHBOARD INFO FUNCTION
async function getUserInfo() {
  const user = await User.findOne()
    .sort({ createdAt: -1 })
    .select("createdAt");

  return user ? getExactTime(user) : "No User till now";
}

async function getProductInfo() {
  const product = await Product.findOne()
    .sort({ createdAt: -1 })
    .select("createdAt");

  return product ? getExactTime(product) : "No Products till now";
}

async function getOrderInfo() {
  const order = await Order.findOne()
    .sort({ createdAt: -1 })
    .select("createdAt");

  const latestOrder = order
    ? getExactTime(order)
    : "No Orders till now";

  const result = await Order.aggregate([
    {
      $match: {
        paymentStatus: "Completed",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const revenue = result[0]?.totalRevenue || 0;

  return {
    revenue,
    latestOrder,
  };
}

async function dashboardInfo() {
  const [totalUsers, totalProducts, totalOrders] =
    await Promise.all([
      User.estimatedDocumentCount(),
      Product.estimatedDocumentCount(),
      Order.estimatedDocumentCount(),
    ]);

  const [latestUser, latestProduct, orderInfo] =
    await Promise.all([
      getUserInfo(),
      getProductInfo(),
      getOrderInfo(),
    ]);

  return {
    DashboardInfo: {
      totalUsers,
      totalOrders,
      totalProducts,
      revenue: orderInfo.revenue,
      latestUser,
      latestOrder: orderInfo.latestOrder,
      latestProduct,
    },
  };
}

module.exports = { dashboardInfo };