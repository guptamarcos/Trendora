const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { userSchemaValidator } = require("../utils/schemaValidator.js");

async function register(req, res) {
  const { username, email, password } = req.body;

  //   const { error, value } = userSchemaValidator.validate(req.body);

  //   if (error) {
  //    return res.status(400).json({
  //       success: false,
  //       message: error.details[0].message
  //    });
  //   }

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!!",
    });
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already exist!!",
    });
  }

  const createUser = await User.create({ username, email, password });
   
  return res.status(201).json({
    success: true,
    message: "User created successfully !!",
    user: createUser,
  });

}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!!",
    });
  }
  
  const emailNormalized = email.trim().toLowerCase();
  const findUser = await User.findOne({ email : emailNormalized }).select("+password");

  if (!findUser) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const checkPassword = await bcrypt.compare(password, findUser.password);

  if (!checkPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid Password",
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
    message: "User logIn successfully",
  });

}

async function logout(req, res) {
  res.clearCookie("token",{
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })

  return res.status(200).json({
    success: true,
    message: "User logout successfully"
  });

}

async function getUser(req, res, next) {
  const { token } = req.signedCookies;

  if(!token){
    return res.status(400).json({
      success: false,
      message: "Token is missing",
    })
  }; 

  const { userId } = jwt.verify(token,process.env.TOKEN_SECRET)
  console.log(userId);

  const user = await User.findById(userId);
  
  if(!user){
    return res.status(400).json({
      success: false,
      message: "User not found "
    })
  }

  return res.status(200).json({
    success: true,
    user
  })
};


module.exports = { register, login, getUser, logout };
