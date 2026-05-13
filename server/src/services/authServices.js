const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const {
  signupSchemaValidator,
  loginSchemaValidator,
} = require("../validations/userSchemaValidator.js");
const { loginEmail } = require("./emailServices.js");
const { loginSms } = require("./smsServices.js");
const ExpressError = require("../utils/ExpressError.js");

async function registerUser(body) {
  // VALIDATING REQUEST BODY
  const { error, value } = signupSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  const { username, email, password } = value;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ExpressError(400, "Email is already exist!!");
  }

  const createdUser = await User.create({ username, email, password });

  return {
    success: true,
    message: "User created successfully!!",
  };
}

async function loginUser(body) {
  const { error, value } = loginSchemaValidator.validate(body, {
    abortEarly: false,
  });
  
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }
  
  const { email, password } = value;
  const findUser = await User.findOne({ email }).select("+password");
  
  if (!findUser) {
    throw new ExpressError(404, "Invalid email or password");
  }
  
  const checkPassword = await bcrypt.compare(password, findUser.password);
  
  if (!checkPassword) {
    throw new ExpressError(401, "Invalid email or password");
  }
  
  const emailSent = await loginEmail(email);
  
  if (!emailSent) {
    console.log("Login email could not be sent");
  }

  const smsSent = await loginSms();
  
  if (!smsSent) {
    console.log("Login Sms could not be sent");
  }
  
  await User.findByIdAndUpdate(findUser._id, { $set: { status: "Active" } });
  
  const token = findUser.generateToken();
  
  return {
    token,
    success: true,
    message: "User logged in successfully",
  };
}

async function logoutUser(userId) {

  await User.findByIdAndUpdate(userId, { $set: { status: "Inactive" } });

  return {
    success: true,
    message: "User logout successfully",
  };
}

module.exports = { registerUser, loginUser, logoutUser };
