const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");

async function authenticateToken(token) {
  if (token === undefined) {
    return {
      user: null,
      message: "Token missing",
    };
  }

  // WHEN TOKEN VALUE IS TEMPERED
  if (token === false) {
    return {
      user: null,
      message: "Invalid or tampered token",
    };
  }

  const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findById(userId).select("+password");

  if (!user) {
    return {
      user: null,
      message: "Authentication failed",
    };
  }

  return {
    user,
    message: "Token is valid",
  };
}

async function verifyAndCheckUserToken(req, res, next) {
  try {
    const { token } = req.signedCookies;

    // WHEN BOTH NAME AND VALUE OR NAME IS TEMPERED
    const { user, message } = await authenticateToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
}

async function verifyAndCheckAdminToken(req, res, next) {
  try {
    const { token } = req.signedCookies;

    const { user, message } = await authenticateToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized person to perform this activity",
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
}

module.exports = { verifyAndCheckUserToken, verifyAndCheckAdminToken };
