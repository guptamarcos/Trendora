const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const {
  signupSchemaValidator,
  loginSchemaValidator,
  GoogleAuthSchemaValidator,
} = require("../validations/userSchemaValidator.js");
const { loginEmail } = require("./emailServices.js");
const { loginSms } = require("./smsServices.js");
const ExpressError = require("../utils/ExpressError.js");
const client = require("../config/oauthConfig.js");

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

  // const emailSent = await loginEmail(email);

  // if (!emailSent) {
  //   console.log("Login email could not be sent");
  // }

  // const smsSent = await loginSms();

  // if (!smsSent) {
  //   console.log("Login Sms could not be sent");
  // }

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

async function oauthLoginUser(body) {
  const { token } = body;
  
  const { error, value } = GoogleAuthSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    throw new ExpressError(400, "Invalid Google Id");
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.OAUTH_CLIENT_ID,
  });

  const { email, sub, name } = ticket.getPayload();

  const existingUser1 = await User.findOne({ googleId: sub });
  

  // IF USER IS ALREADY EXIST
  if (existingUser1) {
    const token1 = existingUser1.generateToken();
    return { token : token1, success: true, message: "User logged in successfully" };
  }

  const existingUser2 = await User.findOne({ email });
  
  if (existingUser2) {
    existingUser2.googleId = sub;
    await existingUser2.save();
    const token2 = existingUser2.generateToken();
    return {token: token2, success: true, message: "User logged in successfully" };
  }

  const newUser = await User.create({
    email,
    googleId: sub,
    authProvider: "google",
    status: "Active",
  });
 
  const token3 = newUser.generateToken();
  return { token: token3, success: true, message: "User logged in successfully" };
}

module.exports = { registerUser, loginUser, logoutUser, oauthLoginUser };
