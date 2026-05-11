const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { addOrder, getUserOrder } = require("../controllers/orderController.js");

router.get("/", wrapAsync(getUserOrder));
router.post("/", wrapAsync(addOrder));

module.exports = router;
