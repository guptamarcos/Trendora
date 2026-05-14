const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { register, login, logout } = require("../controllers/authController.js");
const { verifyAndCheckUserToken } = require("../middleware/authMiddleware.js");
const csrfProtection = require("../config/csrfConfig.js");

router.post("/register",wrapAsync(register));
router.post("/login", csrfProtection, wrapAsync(login));
router.post("/logout", csrfProtection,verifyAndCheckUserToken, wrapAsync(logout));

module.exports = router;
