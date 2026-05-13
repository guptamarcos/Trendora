const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { addToCart, getCartItems, removeCartItem } = require("../controllers/cartController.js");
const csrfProtection = require("../config/csrfConfig.js");

router.get("/", wrapAsync(getCartItems));
router.post("/", csrfProtection, wrapAsync(addToCart));
router.delete("/:itemId",csrfProtection,wrapAsync(removeCartItem));

module.exports = router;
