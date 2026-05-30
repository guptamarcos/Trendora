const express = require("express");
const router = express.Router({mergeParams: true});
const { getProductReviews, addProductReview, deleteReview} = require("../controllers/reviewController.js");
const wrapAsync = require("../utils/WrapAsync.js");
const { verifyAndCheckUserToken } = require("../middleware/authMiddleware.js");
const csrfProtection = require("../config/csrfConfig.js");

router.get("/", wrapAsync(getProductReviews));
router.post("/",csrfProtection, verifyAndCheckUserToken, wrapAsync(addProductReview));
router.delete("/:reviewId",csrfProtection,verifyAndCheckUserToken, wrapAsync(deleteReview));

module.exports = router;