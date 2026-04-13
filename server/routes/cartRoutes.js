const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { addToCart, getCartItems, removeCartItem} 
= require("../controllers/cartController.js");
const { verifyAndCheckUserToken } = require("../auth.js");


router.get("/cartItems",verifyAndCheckUserToken, wrapAsync(getCartItems));
router.post("/addToCart",verifyAndCheckUserToken, wrapAsync(addToCart));
router.delete("/:cartItemId",verifyAndCheckUserToken, wrapAsync(removeCartItem));

module.exports = router;