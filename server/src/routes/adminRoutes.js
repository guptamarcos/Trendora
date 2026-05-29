const express = require("express");
const router = express.Router();
const { DashboardInfo } = require("../controllers/adminController.js");
const { getOrders,updateOrderStatus} = require("../controllers/orderController.js");
const { getAllUser, deleteUser } = require("../controllers/userController.js");
const {
  addProduct,
  editProductInfo,
  deleteProduct,
  getProducts,
} = require("../controllers/productController.js");
const wrapAsync = require("../utils/WrapAsync.js");
const upload = require("../middleware/multerMiddleware.js");
const csrfProtection = require("../config/csrfConfig.js");

// ALL THE ROUTES

router.get("/users", wrapAsync(getAllUser));
router.get("/products", wrapAsync(getProducts));
router.get("/orders", wrapAsync(getOrders));
router.get("/dashboard", wrapAsync(DashboardInfo)); 
router.post("/products", csrfProtection,upload.single("productImage"), wrapAsync(addProduct)); 
router.patch(
  "/products/:productId",
  csrfProtection,
  upload.single("productImage"),
  wrapAsync(editProductInfo),
); 
router.patch("/orders/:orderId/status", csrfProtection, wrapAsync(updateOrderStatus));
router.delete("/users/:userId",csrfProtection, wrapAsync(deleteUser)); 
router.delete("/products/:productId",csrfProtection, wrapAsync(deleteProduct)); 

module.exports = router;
