const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const {
  getProductInfo,
  latestCollections,
  getBestSeller,
  getRelatedProducts,
  getAllProducts,
} = require("../controllers/productController.js");
const upload = require("../middleware/multerMiddleware.js");

router.get("/", wrapAsync(getAllProducts));
router.get("/latest", wrapAsync(latestCollections));
router.get("/best-sellers", wrapAsync(getBestSeller));
router.get("/:productId/related", wrapAsync(getRelatedProducts));
router.get("/:productId", wrapAsync(getProductInfo));

module.exports = router;
