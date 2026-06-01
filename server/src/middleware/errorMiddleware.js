const MongooseErrorHandler = require("./mongooseErrorHandler");
const MulterErrorHandler = require("./multerErrorHandler");
const JwtErrorHandler = require("./jwtErrorHandler.js");

const errorMiddleware = (err, req, res, next) => {
  // Jwt Error
  const jwtError = JwtErrorHandler(err);

  if (jwtError){
    const { statusCode, message } = jwtError;
    return res.status(statusCode).json({
      success:false,
      message 
    })
  }
  
  // Mongoose Error
  const mongooseError = MongooseErrorHandler(err);

  if (mongooseError) {
    const { statusCode, message } = mongooseError;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // Multer error
 const multerError = MulterErrorHandler(err);

  if (multerError) {
    const { statusCode, message } = multerError;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  console.error("Error is occur \n", err);

  const { statusCode = 500, message = "Internal Server Error" } = err;
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
}

module.exports = errorMiddleware;