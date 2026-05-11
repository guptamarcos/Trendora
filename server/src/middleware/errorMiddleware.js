const MongooseErrorHandler = require("./mongooseErrorHandler");
const MulterErrorHandler = require("./multerErrorHandler");

const errorMiddleware = (err, req, res, next) => {
  const mongooseError = MongooseErrorHandler(err);

  if (mongooseError) {
    const { statusCode, message } = mongooseError;
    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }

  // Multer error
 const multerError = MulterErrorHandler(err);

  if (multerError) {
    const { statusCode, message } = multerError;
    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }

  console.log("Error is occur \n", err);

  const { statusCode = 500, message = "Internal Server Error" } = err;
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
}

module.exports = errorMiddleware;