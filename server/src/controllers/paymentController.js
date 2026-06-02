const paymentServices = require("../services/paymentServices.js");


async function createOrder(req, res) {
  const userId = req.user._id;
  const result = await paymentServices.createOrder(userId);

  return res.status(201).json(result);
}

async function verifyPayment(req, res) {
 
  const result = await paymentServices.verifyPayment(req.body);

  return res.status(201).json(result);
}

module.exports = { createOrder, verifyPayment };
