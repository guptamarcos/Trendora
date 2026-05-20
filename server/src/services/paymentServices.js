const razorpay = require("../config/razorpayConfig.js");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils.js");

async function createOrder(amount) {
  const options = {
    amount: Number(amount) * 100,
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
