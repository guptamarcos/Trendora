const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { register, login, logout, oauthLogin, otpVerify, resendOtp } = require("../controllers/authController.js");
const { verifyAndCheckUserToken } = require("../middleware/authMiddleware.js");
const csrfProtection = require("../config/csrfConfig.js");

router.post("/register",csrfProtection, wrapAsync(register));
router.post("/login", csrfProtection, wrapAsync(login));
router.post("/logout", csrfProtection,verifyAndCheckUserToken, wrapAsync(logout));
router.post("/google", csrfProtection, wrapAsync(oauthLogin));
router.post("/otp/verify", csrfProtection, wrapAsync(otpVerify));
router.post("/otp/resend", csrfProtection, wrapAsync(resendOtp));

module.exports = router;
