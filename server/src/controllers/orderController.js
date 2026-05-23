const orderServices = require("../services/orderServices.js");


async function getUserOrder(req, res) {
  const result = await orderServices.getUserOrder(req.user._id);
  
  return res.status(200).json(result);
}


async function addOrder(req, res) {
  const userId = req.user._id;

  const result = await orderServices.addOrder(req.body,userId)

  return res.status(201).json(result);
}

async function getOrders(req,res){

  const { search, status, limit } = req.query;
  const result = await orderServices.getOrders(search, status, limit );
  return res.status(200).json(result);
}


module.exports = { addOrder, getUserOrder, getOrders };
