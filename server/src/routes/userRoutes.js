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

router.get("/me", wrapAsync(getUser));
router.patch("/me", wrapAsync(updateProfileInfo));
router.patch("/me/password", wrapAsync(updateProfilePassword));
router.patch(
  "/me/avatar",
  upload.single("profileImage"),
  wrapAsync(uploadProfileImage),
);

module.exports = router;
