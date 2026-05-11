const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { register, login, logout } = require("../controllers/authController.js");
const { verifyAndCheckUserToken } = require("../middleware/authMiddleware.js");

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.post("/logout", verifyAndCheckUserToken, wrapAsync(logout));

module.exports = router;
