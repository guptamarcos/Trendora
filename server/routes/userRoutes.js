const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {register, login, getUser, logout , updateProfileInfo, updateProfilePassword, 
uploadProfileImage, getAllUser, deleteUser, DashboardInfo} = require("../controllers/userController.js");
const { verifyAndCheckUserToken, verifyAndCheckAdminToken } = require("../auth.js");
const upload = require("../utils/multer.js");

router.get("/me",verifyAndCheckUserToken,wrapAsync(getUser));
router.get("/getAllUser",verifyAndCheckAdminToken,wrapAsync(getAllUser));
router.get("/dashboard",verifyAndCheckAdminToken, wrapAsync(DashboardInfo));
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.post("/logout",verifyAndCheckUserToken, wrapAsync(logout));
router.patch("/updateProfileInfo", verifyAndCheckUserToken, wrapAsync(updateProfileInfo));
router.patch("/updateProfilePassword", verifyAndCheckUserToken, wrapAsync(updateProfilePassword));
router.patch("/uploadProfileImage", verifyAndCheckUserToken, upload.single("profileImage"),wrapAsync(uploadProfileImage));
router.delete("/:id",verifyAndCheckAdminToken, wrapAsync(deleteUser));


module.exports = router;