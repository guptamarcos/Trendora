const wishlistServices = require("../services/wishlistServices.js");

async function getWishlistItems(req, res) {
  const result = await wishlistServices.getWishlistItems(req.user._id);

  return res.status(200).json(result);
}

async function addToWishlist(req, res) {
  const result = await wishlistServices.addToWishlist(req.body, req.user._id);

  return res.status(201).json(result);
}

async function removeWishlistItem(req, res) {
  const userId = req.user._id;
  const { itemId } = req.params;

  const result = await wishlistServices.removeWishlistItem(userId, itemId);

  return res.status(200).json(result);
}

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
};
