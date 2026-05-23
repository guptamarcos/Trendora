const User = require("../models/userSchema.js");
const {
  signupSchemaValidator,
  loginSchemaValidator,
  ProfileInfoSchemaValidator,
  PasswordSchemaValidator,
} = require("../validations/userSchemaValidator.js");
const cloudinary = require("cloudinary").v2;
const ExpressError = require("../utils/ExpressError.js");
const bcrypt = require("bcrypt");

function getUser(userInfo) {
  const user = userInfo.toObject();

  delete user.password;

  return {
    success: true,
    user,
  };
}

async function getAllUser(search, status, limit) {

  const query = {};
  
  if(search){
    query.username = { $regex: search, $options: "i"};
  }

  if(status){
    query.status = status[0].toUpperCase() + status.slice(1, status.length);
  }
  
  const matchedUsersCount = await User.countDocuments(query);
  const allUser = await User.find(query).limit(Number(limit)).select(
    "username email role profileImage status",
  );

  return {
    success: true,
    data: allUser,
    matchedUsersCount,
  };
}

async function updateProfileInfo(body, userId) {
  const { error, value } = ProfileInfoSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  const { username, bio } = value;

  await User.findByIdAndUpdate(
    userId,
    { $set: { username: username, bio: bio } },
    { returnDocument: "after", runValidators: true },
  );

  return {
    success: true,
    message: "Profile updated successfully",
  };
}

async function updateProfilePassword(body, user) {
  const { error, value } = PasswordSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  const { oldPassword, newPassword } = value;

  const checkPassword = await bcrypt.compare(oldPassword, user.password);

  if (!checkPassword) {
    throw new ExpressError(401, "Invalid Credentials");
  }

  user.password = newPassword;
  await user.save();

  return {
    success: true,
    message: "Password updated successfully",
  };
}

async function uploadProfileImage(user, file) {
  if (!file) {
    throw new ExpressError(400, "No file uploaded or invalid file type");
  }
  console.log("This is the file", file);

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
  // REMOVING THE OLDER FILE FOR THE CLOUDINARY
  if (user?.profileImage?.path) {
    await cloudinary.uploader.destroy(user.profileImage.filename);
  }

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        profileImage: {
          path: file.path,
          filename: file.filename,
        },
      },
    },
    {
      runValidators: true,
    },
  );

  return {
    success: true,
    message: "File uploaded successfully",
  };
}

async function deleteUser(userId) {
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new ExpressError(404, "User not found");
  }
  return {
    success: true,
    message: "User deleted successfully",
  };
}

module.exports = {
  getUser,
  updateProfileInfo,
  updateProfilePassword,
  uploadProfileImage,
  deleteUser,
  getAllUser,
};
