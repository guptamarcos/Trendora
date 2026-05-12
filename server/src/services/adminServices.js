const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");
const Product = require("../models/productSchema.js");
const getExactTime = require("../utils/Helper.js");

async function dashboardInfo() {
  // estimatedDocumentCount() --> fast , not accept filter
  // countDocuments({ filter }) --> slow , scan all document

  const [totalUsers, totalProducts, totalOrders] = await Promise.all([
    User.estimatedDocumentCount(),
    Product.estimatedDocumentCount(),
    Order.estimatedDocumentCount(),
  ]);

  const result = await Order.aggregate([
    {
      $match: { paymentStatus: "Completed" },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const user = await User.findOne().sort({ createdAt: -1 }).select("createdAt");

  const order = await Order.findOne()
    .sort({ createdAt: -1 })
    .select("createdAt");

  const product = await Product.findOne()
    .sort({ createdAt: -1 })
    .select("createdAt");

  const latestUser = getExactTime(user);
  const latestOrder = getExactTime(order);
  const latestProduct = getExactTime(product);

  return {
    DashboardInfo: {
      totalUsers,
      totalOrders,
      totalProducts,
      revenue: result[0]?.totalRevenue,
      latestUser,
      latestOrder,
      latestProduct,
      id: order._id,
    },
  };
}

module.exports = { dashboardInfo };
