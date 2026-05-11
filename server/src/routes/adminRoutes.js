const express = require("express");
const router = express.Router();
const { DashboardInfo } = require("../controllers/adminController.js");
const { getAllOrder } = require("../controllers/orderController.js");
const { getAllUser, deleteUser } = require("../controllers/userController.js");
const {
  addProduct,
  editProductInfo,
  deleteProduct,
} = require("../controllers/productController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const upload = require("../middleware/multerMiddleware.js");

// ALL THE ROUTES

router.get("/users", wrapAsync(getAllUser));
router.get("/orders", wrapAsync(getAllOrder));
router.get("/dashboard", wrapAsync(DashboardInfo));
router.post("/products", upload.single("productImage"), wrapAsync(addProduct));
router.patch(
  "/products/:productId",
  upload.single("productImage"),
  wrapAsync(editProductInfo),
);
router.delete("/users/:userId", wrapAsync(deleteUser));
router.delete("/products/:productId", wrapAsync(deleteProduct));

module.exports = router;
