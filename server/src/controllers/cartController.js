const cartServices = require("../services/cartServices.js");

async function getCartItems(req, res) {
  const userId = req.user._id;
  const result = await cartServices.getCartItems(userId);

  return res.status(200).json(result);
}

async function addToCart(req, res) {
  const userId = req.user._id;

  const result = await cartServices.addToCart(req.body, userId);

  return res.status(201).json(result);
}

async function removeCartItem(req, res) {
  const userId = req.user._id;
  const { itemId } = req.params;

  const result = await cartServices.removeCartItem(userId, itemId);

  return res.status(200).json(result);
}

module.exports = {
  getCartItems,
  addToCart,
  removeCartItem,
};
