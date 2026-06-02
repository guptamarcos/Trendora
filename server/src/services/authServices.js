const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const {
  signupSchemaValidator,
  loginSchemaValidator,
  GoogleAuthSchemaValidator,
  emailSchemaValidator
} = require("../validations/userSchemaValidator.js");
const otpSchemaValidator = require("../validations/otpSchemaValidator.js");
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
    const errMsg = error.details.map((err) => err.message);
    throw new ExpressError(422, errMsg);
  }

  const { username, email, password } = value;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ExpressError(409, "Email is already exist!!");
  }

  const otp = otpGenerator();
  const otpEmail = await sendOtpEmail(email, otp);

  if (!otpEmail) {
    console.log("Signup Otp is not sent for email: ", email);
    throw new ExpressError(
      503,
      "OTP service temporarily unavailable. Please try again later",
    );
  }

  const hashedOtp = await bcrypt.hash(otp, 10);

  const generateOtp = await OTP.create({
    email,
    expiresAt: Date.now() + 1000 * 60 * 5,
    otp: hashedOtp,
  });

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
    const errMsg = error.details.map((err) => err.message);
    throw new ExpressError(422, errMsg);
  }

  const { email, password } = value;
  const findUser = await User.findOne({ email }).select("+password");

  if (!findUser) {
    throw new ExpressError(404, "User not found");
  }

  if (findUser.googleId && !findUser.password) {
    throw new ExpressError(409, "Try with google login");
  }

  const checkPassword = await bcrypt.compare(password, findUser.password);
  if (!checkPassword) {
    throw new ExpressError(401, "Invalid Credentials");
  }

  // CHECK ADMIN OR NOT
  if (findUser.role === "admin") {
    await User.findByIdAndUpdate(findUser._id, { $set: { status: "Active" } });
    const token = findUser.generateToken();

    return {
      success: true,
      message: "Credentials verified",
      token,
    };
  }

  await OTP.deleteMany({ email });
  const otp = otpGenerator();
  const otpEmail = await sendOtpEmail(email, otp);

  if (!otpEmail) {
    console.log("Login Otp is not sent for email: ", email);
    throw new ExpressError(
      503,
      "OTP service temporarily unavailable. Please try again later",
    );
  }

  const hashedOtp = await bcrypt.hash(otp, 10);

  const createdOtp = await OTP.create({
    email,
    expiresAt: Date.now() + 1000 * 60 * 5,
    otp: hashedOtp,
  });

  return {
    token: null,
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
  const { error, value } = GoogleAuthSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const errMsg = error.details.map((err) => err.message);
    throw new ExpressError(422, errMsg);
  }
  
  const { token } = value;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.OAUTH_CLIENT_ID,
  });
  
  const { email, sub, name, email_verified } = ticket.getPayload();
  if (!email_verified) {
    throw new ExpressError(401, "Google email not verified");
  }

  const otp = otpGenerator();
  
  await OTP.deleteMany({ email });
  const hashedOtp = await bcrypt.hash(otp, 10);
  
  await OTP.create({
    email,
    expiresAt: Date.now() + 1000 * 60 * 5,
    otp: hashedOtp,
  });
  
  const otpEmail = await sendOtpEmail(email, otp);
  if (!otpEmail) {
    console.log("Google login or signup otp email not sent for email: ", email);
    throw new ExpressError(503, "Internal server error");
  }

  // CHECK 1 ---> IF USER IS ALREADY EXIST GOOGLE ID IS ALREADY PRESENT
  const existingUser1 = await User.findOne({ googleId: sub });
  if (existingUser1) {
    return {
      email,
      success: true,
      message: "Credentials Verified",
    };
  }

  // CHECK 2 ---> IF EMAIL IS ALREADY EXIST THAN LINK THE ACCOUNT WITH GOOGLE
  const existingUser2 = await User.findOne({ email });
  if (existingUser2) {
    existingUser2.googleId = sub;
    await existingUser2.save();
    return {
      email,
      success: true,
      message: "Credentials verified",
    };
  }

  // CHECK 3 ---> IF USER NOT EXIST THAN CREATE IT AND LINK THE ACCOUNT WITH GOOGLE
  await User.create({
    username: name,
    email,
    googleId: sub,
    authProvider: "google",
  });

  return {
    email,
    success: true,
    message: "Credentials Verified",
  };
}

async function verifyOtp(body) {
  const { error, value } = otpSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const errMsg = error.details.map((err) => err.message);
    throw new ExpressError(422, "Invalid otp or email");
  }

  const { otp, email } = value;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new ExpressError(404, "User not found");
  }

  const findOtp = await OTP.findOne({ email });
  if (!findOtp) {
    throw new ExpressError(404, "Please login or signup first");
  }

  // check otp expires or not
  if (findOtp.expiresAt <= Date.now()) {
    await OTP.deleteOne({ email });
    throw new ExpressError(400, "Otp expires");
  }

  const checkOtp = await bcrypt.compare(otp, findOtp?.otp);
  if (!checkOtp) {
    throw new ExpressError(400, "Invalid otp");
  }

  const emailSent = await loginEmail(email);
  if (!emailSent) {
    console.log("Login Email is not sent for email", email);
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

async function resendOtp(body) {
  const { error, value } = emailSchemaValidator.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const errMsg = error.details.map((err) => err.message);
    throw new ExpressError(422, errMsg);
  }

  const { email } = value;

  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    throw new ExpressError(404, "User not found");
  }

  const existingOtp = await OTP.findOne({ email });

  if(existingOtp){
    const diff = existingOtp.expiresAt-Date.now();
    if (diff < 30000) {
      throw new ExpressError(429,"Please wait 30 seconds before requesting OTP again");
    }
    
    await OTP.deleteOne({ email });
  }
  
  const otp = otpGenerator();
  const otpEmail = await sendOtpEmail(email, otp);

  if (!otpEmail) {
    console.log("Resend Otp is not sent for email: ", email);
    throw new ExpressError(503, "Otp service is unavailable");
  }

  const hashedOtp = await bcrypt.hash(otp, 10);

  await OTP.create({
    email,
    expiresAt: Date.now() + 1000 * 60 * 5,
    otp: hashedOtp,
  });

  return {
    success: true,
    message: "Resend otp is sent",
  };
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  oauthLoginUser,
  verifyOtp,
  resendOtp,
};
