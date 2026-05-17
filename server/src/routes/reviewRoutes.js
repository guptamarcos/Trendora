const express = require("express");
const router = express.Router({mergeParams: true});
const { getProductReviews, addProductReview, deleteReview} = require("../controllers/reviewController.js");
const wrapAsync = require("../utils/WrapAsync.js");
const { verifyAndCheckUserToken } = require("../middleware/authMiddleware.js");

router.get("/", wrapAsync(getProductReviews));
router.post("/", verifyAndCheckUserToken, wrapAsync(addProductReview));
router.delete("/:reviewId",verifyAndCheckUserToken, wrapAsync(deleteReview));

module.exports = router;