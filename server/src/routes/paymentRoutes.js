const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController.js");
const wrapAsync = require("../utils/WrapAsync.js");
const csrfProtection = require("../config/csrfConfig.js");


router.post("/create-order",csrfProtection, wrapAsync(createOrder))

router.post("/verify-payment",csrfProtection, wrapAsync(verifyPayment));


module.exports = router;