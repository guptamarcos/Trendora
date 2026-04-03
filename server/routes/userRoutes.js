const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {register, login, getUser, logout} = require("../controllers/userController.js");

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.get("/logout", wrapAsync(logout));
router.get("/getUserDetails", wrapAsync(getUser));


module.exports = router;