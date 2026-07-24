const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { addOrder, getUserOrder , cancelOrder} = require("../controllers/orderController.js");
const csrfProtection = require("../config/csrfConfig.js");

router.get("/", wrapAsync(getUserOrder));
router.post("/", csrfProtection, wrapAsync(addOrder));
router.patch("/:orderId/cancel", csrfProtection, wrapAsync(cancelOrder))


module.exports = router;
