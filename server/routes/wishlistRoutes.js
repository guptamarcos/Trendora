const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { addToWishlist, getWishlistItems, removeWishlistItem,
} = require("../controllers/wishlistController.js");
const { verifyAndCheckUserToken } = require("../auth.js");


router.get("/wishlistItems",verifyAndCheckUserToken, wrapAsync(getWishlistItems));
router.post("/addToWishlist",verifyAndCheckUserToken, wrapAsync(addToWishlist));
router.delete("/:wishlistItemId",verifyAndCheckUserToken, wrapAsync(removeWishlistItem));

module.exports = router;