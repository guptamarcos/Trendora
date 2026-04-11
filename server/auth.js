const ExpressError = require("./utils/ExpressError");
const User = require("./models/userSchema.js");
const jwt = require("jsonwebtoken");

async function verifyAndCheckUserToken(req, res, next) {
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
    
    const { userId } = jwt.verify(token , process.env.TOKEN_SECRET);
    const user = await User.findById(userId).select("+password");

    if(!user){
      return res.status(404).json({
        success: false, 
        message: "User not exist"
      })
    }
    
    req.user = user;
   
    return next();

  } catch (err) {
    throw new ExpressError(err);
  }
}

async function verifyAndCheckAdminToken(req, res, next) {
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
    
    const { userId } = jwt.verify(token , process.env.TOKEN_SECRET);
    const user = await User.findById(userId).select("+password");

    if(!user){
      return res.status(404).json({
        success: false, 
        message: "User not exist"
      })
    }
    
    if(user.role !== "admin"){
      return res.status(401).json({
        success: false,
        message: "You are not authorized person to perform this activity",
      })
    }
    
    req.user = user;
   
    return next();

  } catch (err) {
    throw new ExpressError(err);
  }
}

module.exports = { verifyAndCheckUserToken,verifyAndCheckAdminToken };
