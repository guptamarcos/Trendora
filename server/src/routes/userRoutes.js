const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const {
  getUser,
  updateProfileInfo,
  updateProfilePassword,
  uploadProfileImage,
} = require("../controllers/userController.js");
const upload = require("../middleware/multerMiddleware.js");
const csrfProtection = require("../config/csrfConfig.js");

router.get("/me", wrapAsync(getUser));
router.patch("/me", csrfProtection, wrapAsync(updateProfileInfo));
router.patch("/me/password",csrfProtection, wrapAsync(updateProfilePassword));
router.patch(
  "/me/avatar",
  csrfProtection,
  upload.single("profileImage"),
  wrapAsync(uploadProfileImage),
);

module.exports = router;
