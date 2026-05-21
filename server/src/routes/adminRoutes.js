const express = require("express");
const router = express.Router();
const { DashboardInfo } = require("../controllers/adminController.js");
const { getAllOrder } = require("../controllers/orderController.js");
const { getAllUser, deleteUser } = require("../controllers/userController.js");
const {
  addProduct,
  editProductInfo,
  deleteProduct,
  getAllProduct
} = require("../controllers/productController.js");
const wrapAsync = require("../utils/WrapAsync.js");
const upload = require("../middleware/multerMiddleware.js");
const csrfProtection = require("../config/csrfConfig.js");

// ALL THE ROUTES

router.get("/users", wrapAsync(getAllUser));
router.get("/orders", wrapAsync(getAllOrder));
router.get("/products", wrapAsync(getAllProduct));
router.get("/dashboard", wrapAsync(DashboardInfo)); // SORTED
router.post("/products", csrfProtection,upload.single("productImage"), wrapAsync(addProduct)); // SORTED
router.patch(
  "/products/:productId",
  csrfProtection,
  upload.single("productImage"),
  wrapAsync(editProductInfo),
); // SORTED
router.delete("/users/:userId",csrfProtection, wrapAsync(deleteUser)); // SORTED
router.delete("/products/:productId",csrfProtection, wrapAsync(deleteProduct)); // SORTED

module.exports = router;
