const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");

const { addressSchema } = require("../utils/addressSchemaValidator.js");

async function addOrder(req, res) {
  const data = req.body;
  const { paymentMethod, ...address } = data;

  const { error, value } = addressSchema.validate(address, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  };

  const userId = req.user._id;
  const Cart = await User.findById(userId).select("cart").populate({
    path: "cart.product",
    select: "name price",
  });

  if(Cart.length === 0 ){
    return res.status(404).json({
        success: false,
        message: "Cart is empty",
    })
  }
  
  console.log(Cart.cart[0].product);
  const paymentMethods = ["cod", "razorpay", "stripe"];
  if (!paymentMethods.includes(paymentMethod)) {
    return res.status(404).json({
      success: false,
      message: "Invalid payment method",
    });
  }

  
  return res.status(201).json({
    success: true,
    message: "Order crated successfully",
  });
}

module.exports = { addOrder };
