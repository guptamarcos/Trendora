const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { addProduct,getAllProducts } = require("../controllers/productController.js");
const upload = require("../utils/multer.js");

router.post("/addProduct",upload.single("productImage"), wrapAsync(addProduct));
router.get("/getAllProduct", wrapAsync(getAllProducts));


module.exports = router;
