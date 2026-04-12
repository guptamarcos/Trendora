const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { addProduct,getAllProducts,deleteProduct, getProductInfo, editProductInfo, latestCollections,
 getBestSeller, getRelatedProducts } = require("../controllers/productController.js");
const { verifyAndCheckAdminToken } = require("../auth.js");
const upload = require("../utils/multer.js");


router.get("/getAllProduct", wrapAsync(getAllProducts));
router.get("/latestCollections", wrapAsync(latestCollections));
router.get("/getBestSeller", wrapAsync(getBestSeller));
router.get("/getRelatedProducts/:category", wrapAsync(getRelatedProducts));
router.get("/:productId", wrapAsync(getProductInfo))
router.post("/addProduct",verifyAndCheckAdminToken,upload.single("productImage"), wrapAsync(addProduct));
router.patch("/:productId",verifyAndCheckAdminToken,upload.single("productImage"), wrapAsync(editProductInfo));
router.delete("/:productId",verifyAndCheckAdminToken,wrapAsync(deleteProduct));


module.exports = router;
