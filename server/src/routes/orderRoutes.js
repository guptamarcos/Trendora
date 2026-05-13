const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { addOrder, getUserOrder } = require("../controllers/orderController.js");
const csrfProtection = require("../config/csrfConfig.js");

router.get("/", wrapAsync(getUserOrder));
router.post("/", csrfProtection, wrapAsync(addOrder));

module.exports = router;
