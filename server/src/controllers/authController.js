const authServices = require("../services/authServices.js");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  signed: true,
  maxAge: 24 * 60 * 60 * 1000, 
};

const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  signed: true,
};

async function register(req, res) {
  const result = await authServices.registerUser(req.body);

  return res.status(201).json(result);
}

async function login(req, res) {
  const { success, message, token } = await authServices.loginUser(req.body);

  if (token) {
    res.cookie("token", token, cookieOptions);
  }

  return res.status(200).json({
    success,
    message
  });
}

async function logout(req, res) {
  const userId = req.user._id;
  const result = await authServices.logoutUser(userId);

  res.clearCookie("token", clearCookieOptions);

  return res.status(200).json(result);
}

async function oauthLogin(req, res) {
  const result = await authServices.oauthLoginUser(req.body);

  return res.status(200).json(result);
}

async function otpVerify(req, res) {
  const result = await authServices.verifyOtp(req.body);

  res.cookie("token", result.token, cookieOptions);

  return res.status(200).json(result);
}

async function resendOtp(req, res) {
  const result = await authServices.resendOtp(req.body);

  return res.status(200).json(result);
}

module.exports = {
  register,
  login,
  logout,
  oauthLogin,
  otpVerify,
  resendOtp,
};
