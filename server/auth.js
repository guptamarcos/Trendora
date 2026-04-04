const ExpressError = require("./utils/ExpressError");

function verifyAndCheckToken(req, res, next) {
  try {
    const { token } = req.signedCookies;

    // WHEN BOTH NAME AND VALUE OR NAME IS TEMPERED
    if (token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // WHEN TOKEN VALUE IS TEMPERED
    if (token === false) {
      return res.status(401).json({
        success: false,
        message: "Invalid or tampered token",
      });
    }
   
    return next();

  } catch (err) {
    throw new ExpressError(err);
  }
}

module.exports = { verifyAndCheckToken };
