const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const {
  signupSchemaValidator,
  loginSchemaValidator,
  ProfileInfoSchemaValidator,
  PasswordSchemaValidator,
} = require("../utils/schemaValidator.js");

// THIS IS REGISTER CONTROLLER
async function register(req, res) {
  // VALIDATING REQUEST BODY
  const { error, value } = signupSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already exist!!",
    });
  }

  const createdUser = await User.create({ username, email, password });

  return res.status(201).json({
    success: true,
    message: "User created successfully !!",
  });
}

async function login(req, res) {
  const { error, value } = loginSchemaValidator.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { email, password } = value;

  const findUser = await User.findOne({ email }).select("+password");

  if (!findUser) {
    return res.status(404).json({
      success: false,
      message: "Email not exist",
    });
  }

  const checkPassword = await bcrypt.compare(password, findUser.password);

  if (!checkPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = findUser.generateToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
    signed: true,
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });
}

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  return res.status(200).json({
    success: true,
    message: "User logout successfully",
  });
}

async function getUser(req, res) {

  const {password , ...user} = req.user;

  return res.status(200).json({
    success: true,
    user,
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
    message: "Password updated successfully"
  })

}


module.exports = {
  register,
  login,
  getUser,
  logout,
  updateProfileInfo,
  updateProfilePassword,
};
