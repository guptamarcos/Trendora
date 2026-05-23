const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const {
  signupSchemaValidator,
  loginSchemaValidator,
  GoogleAuthSchemaValidator,
} = require("../validations/userSchemaValidator.js");
const { loginEmail, sendOtpEmail } = require("./emailServices.js");
const { loginSms } = require("./smsServices.js");
const ExpressError = require("../utils/ExpressError.js");
const client = require("../config/oauthConfig.js");
const OTP = require("../models/otpSchema.js");
const { otpGenerator } = require("../utils/Helper.js");

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
    throw new ExpressError(404, "Invalid Credentials");
  }

  if (findUser.googleId) {
    throw new ExpressError(400, "Try with google login");
  }

  const checkPassword = await bcrypt.compare(password, findUser.password);

  if (!checkPassword) {
    throw new ExpressError(401, "Invalid Credentials");
  }

  const otp = otpGenerator();

  const otpEmail = await sendOtpEmail(email, otp);

  if (!otpEmail) {
    console.log("Otp is not sent");
    throw new ExpressError(500, "Internal server error");
  }

  await OTP.deleteMany({ email: email });

  const hashedOtp = await bcrypt.hash(otp, 10);

  await OTP.create({
    email,
    expiresAt: Date.now() + 1000 * 60 * 5,
    otp: hashedOtp,
  });

  return {
    success: true,
    message: "Credentials verified",
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

  const otp = otpGenerator();

  const otpEmail = await sendOtpEmail(email, otp);

  if (!otpEmail) {
    console.log("Otp is not sent");
    throw new ExpressError(500, "Internal server error");
  }

  await OTP.deleteMany({ email: email });

  const hashedOtp = await bcrypt.hash(otp, 10);

  await OTP.create({
    email,
    expiresAt: Date.now() + 1000 * 60 * 5,
    otp: hashedOtp,
  });

  const existingUser1 = await User.findOne({ googleId: sub });

  // IF USER IS ALREADY EXIST
  if (existingUser1) {
    await User.findByIdAndUpdate(
      { _id: existingUser1._id },
      { status: "Active" },
    );
    // const token1 = existingUser1.generateToken();
    return {
      // token: token1,
      email,
      success: true,
      message: "User logged in successfully",
    };
  }

  const existingUser2 = await User.findOne({ email });

  if (existingUser2) {
    existingUser2.googleId = sub;
    existingUser2.status = "Active";
    await existingUser2.save();
    // const token2 = existingUser2.generateToken();
    return {
      // token: token2,
      email,
      success: true,
      message: "User logged in successfully",
    };
  }

  const newUser = await User.create({
    username: "Not Available",
    email,
    googleId: sub,
    authProvider: "google",
    status: "Active",
  });

  // const token3 = newUser.generateToken();
  return {
    // token: token3,
    email,
    success: true,
    message: "User logged in successfully",
  };
}

async function verifyOtp(body) {
  const { otp, email } = body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new ExpressError(400, "User not found");
  }

  const findOtp = await OTP.findOne({ email: email });

  if (!findOtp) {
    throw new ExpressError(404, "Please login first");
  }

  if (findOtp.expiresAt <= Date.now()) {
    const deletePrevOtpDoc = await OTP.deleteOne({ email: email });
    throw new ExpressError(400, "Otp expires");
  }

  console.log(otp, findOtp.otp);
  const checkOtp = await bcrypt.compare(otp, findOtp?.otp);

  if (!checkOtp) {
    throw new ExpressError(400, "Invalid otp");
  }

  const emailSent = await loginEmail(email);

  if (!emailSent) {
    console.log("Email is not sent");
    throw new ExpressError(500, "Internal server error");
  }

  const smsSent = await loginSms();

  if (!smsSent) {
    console.log("Login Sms could not be sent");
  }

  await OTP.deleteOne({ email });

  await User.findByIdAndUpdate(findUser._id, { $set: { status: "Active" } });

  const token = findUser.generateToken();

  return {
    success: true,
    message: "User is successfully Logged in",
    token,
  };
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  oauthLoginUser,
  verifyOtp,
};
