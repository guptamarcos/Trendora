const User = require("../models/userSchema.js");
const Order = require("../models/orderSchema.js");
const {
  signupSchemaValidator,
  loginSchemaValidator,
  ProfileInfoSchemaValidator,
  PasswordSchemaValidator,
} = require("../validations/userSchemaValidator.js");
const path = require("path");
const fs = require("fs");
const Product = require("../models/productSchema.js");
const cloudinary = require("cloudinary").v2;

async function getUser(req, res) {
  const { password, ...user } = req.user;

  return res.status(200).json({
    success: true,
    user,
  });
}

async function getAllUser(req, res) {
  const allUser = await User.find({}).select(
    "username email role profileImage status",
  );

  return res.status(200).json({
    success: false,
    data: allUser,
  });
}

async function updateProfileInfo(req, res) {
  const { error, value } = ProfileInfoSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { username, email, bio } = value;

  const user = req.user;

  if (user.email !== email) {
    return res.status(400).json({
      success: false,
      message: "Email not exist",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { username: username, bio: bio } },
    { returnDocument: "after", runValidators: true },
  );

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
}

async function updateProfilePassword(req, res) {
  const { error, value } = PasswordSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { oldPassword, newPassword } = value;
  const user = req.user;

  const checkPassword = await bcrypt.compare(oldPassword, user.password);

  if (!checkPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
}

async function uploadProfileImage(req, res) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded or invalid file type",
    });
  }

  const user = req.user;

  // FOR REMOVING PREVIOUS IMAGE FORM THE LOCAL FOLDER

  // if (user.profileImage) {
  //   const oldPath = path.join(
  //     process.cwd(),
  //     user.profileImage.replace(/^\/+/, ""),
  //   );

  //   if (fs.existsSync(oldPath)) {
  //     fs.unlinkSync(oldPath);
  //   }
  // }

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        profileImage: {
          path: req.file.path,
          filename: req.file.filename,
        },
      },
    },
    {
      runValidators: true,
    },
  );

  // REMOVING THE OLDER FILE FOR THE CLOUDINARY
  if (user.profileImage.path) {
    await cloudinary.uploader.destroy(user.profileImage.filename);
  }

  return res.status(200).json({
    success: true,
    message: "File is upload successfully",
  });
}

async function deleteUser(req, res) {
  const { userId } = req.params;

  const checkUser = await User.findById(userId);

  if (!checkUser) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const deletedUser = await User.deleteOne({ _id: userId });

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
}

module.exports = {
  getUser,
  updateProfileInfo,
  updateProfilePassword,
  uploadProfileImage,
  deleteUser,
  getAllUser,
};
