const razorpay = require("../config/razorpayConfig.js");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/userSchema.js");

async function createOrder(userId) {
  const user = await User.findById(userId).populate("cart.product");

  const totalAmount = user.cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  return {
    success: true,
    order,
  };
}

async function verifyPayment(body) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ExpressError(400, "Payment details missing");
  }

  const isAuthentic = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET,
  );

  if (!isAuthentic) {
    throw new ExpressError(400, "Payment failed !!");
  }

  return {
    success: true,
    message: "Payment successful",
  };
}

module.exports = { createOrder, verifyPayment };
