const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const {
  signupSchemaValidator,
  loginSchemaValidator,
} = require("../validations/userSchemaValidator.js");

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

  const { username, email, password } = value;
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
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  await User.findByIdAndUpdate(findUser._id, { $set: { status: "Active" } });

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
  const user = req.user;

  await User.findByIdAndUpdate(user._id, { $set: { status: "Inactive" } });

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

module.exports = {
  register,
  login,
  logout,
};
