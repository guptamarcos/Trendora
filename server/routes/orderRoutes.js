const express = require("express");
const router = express.Router();
const { verifyAndCheckUserToken , verifyAndCheckAdminToken} = require("../auth.js");
const wrapAsync  = require("../utils/wrapAsync.js");
const { addOrder } = require("../controllers/orderController.js");


// GETTING ALL ORDER INFORMATION 
// router.get("/", verifyAndCheckUserToken, wrapAsync());

// ADD THE ORDER TO THE DB
router.post("/",verifyAndCheckUserToken, wrapAsync(addOrder));

// GET A USER ORDER 
// router.get("/")
module.exports = router;
