const paymentServices = require("../services/paymentServices.js");


async function createOrder(req, res) {
  const { amount } = req.body;
  const result = await paymentServices.createOrder(amount);

  return res.status(201).json(result);
}

async function verifyPayment(req, res) {
 
  const result = await paymentServices.verifyPayment(req.body);

  return res.status(201).json(result);
}

module.exports = { createOrder, verifyPayment };
