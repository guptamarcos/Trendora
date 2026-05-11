const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
} = require("../controllers/wishlistController.js");

router.get("/", wrapAsync(getWishlistItems));
router.post("/", wrapAsync(addToWishlist));
router.delete("/:itemId", wrapAsync(removeWishlistItem));

module.exports = router;
