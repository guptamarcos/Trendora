const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  signupSchemaValidator,
  loginSchemaValidator,
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
  const { token } = req.signedCookies;
  const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
}


module.exports = { register, login, getUser, logout };
