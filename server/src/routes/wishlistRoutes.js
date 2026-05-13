const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
} = require("../controllers/wishlistController.js");
const csrfProtection = require("../config/csrfConfig.js");

router.get("/", wrapAsync(getWishlistItems));
router.post("/",csrfProtection, wrapAsync(addToWishlist));
router.delete("/:itemId", csrfProtection, wrapAsync(removeWishlistItem));

module.exports = router;
