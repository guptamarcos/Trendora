const authServices = require("../services/authServices.js");

async function register(req, res) {
  const result = await authServices.registerUser(req.body);

  return res.status(201).json(result);
}

async function login(req, res) {
  const result = await authServices.loginUser(req.body);
  
  res.cookie("token", result?.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
    signed: true,
  });

  return res.status(200).json({
    success: result?.success,
    message: result?.message,
  });
}

async function logout(req, res) {
  const userId = req.user._id;
  const result = await authServices.logoutUser(userId);

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  return res.status(200).json(result);
}

module.exports = {
  register,
  login,
  logout,
};
