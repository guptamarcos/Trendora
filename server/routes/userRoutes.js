const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {register, login, getUser, logout} = require("../controllers/userController.js");
const { verifyAndCheckToken } = require("../auth.js");

router.get("/me",verifyAndCheckToken,wrapAsync(getUser));
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.post("/logout",verifyAndCheckToken, wrapAsync(logout));


module.exports = router;