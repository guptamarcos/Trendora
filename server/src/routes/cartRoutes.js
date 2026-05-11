const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/cartController.js");

router.get("/", wrapAsync(getCartItems));
router.post("/", wrapAsync(addToCart));
router.delete("/:itemId", wrapAsync(removeCartItem));

module.exports = router;
