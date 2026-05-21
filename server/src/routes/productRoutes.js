const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const {
  getProductInfo,
  latestCollections,
  getBestSeller,
  getRelatedProducts,
  getAllUserProducts,
  updateProductRating
} = require("../controllers/productController.js");
const upload = require("../middleware/multerMiddleware.js");

router.get("/", wrapAsync(getAllUserProducts));
router.get("/latest", wrapAsync(latestCollections));
router.get("/best-sellers", wrapAsync(getBestSeller));
router.get("/:productId/related", wrapAsync(getRelatedProducts));
router.get("/:productId", wrapAsync(getProductInfo));
router.post("/:productId/rating",wrapAsync(updateProductRating));

module.exports = router;
