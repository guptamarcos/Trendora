const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { addProduct,getAllProducts,deleteProduct, getProductInfo, editProductInfo
 } = require("../controllers/productController.js");
const upload = require("../utils/multer.js");


router.get("/getAllProduct", wrapAsync(getAllProducts));
router.get("/:productId", wrapAsync(getProductInfo))
router.post("/addProduct",upload.single("productImage"), wrapAsync(addProduct));
router.patch("/:productId",upload.single("productImage"), wrapAsync(editProductInfo));
router.delete("/:productId",wrapAsync(deleteProduct));


module.exports = router;
