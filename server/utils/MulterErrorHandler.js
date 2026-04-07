const multer = require("multer");

function multerErrorHandler(err) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return {
        statusCode: 400,
        message: "File size should not exceed 2MB",
      };
    }

    return {
      statusCode: 400,
      message: err.message,
    };
  }
}

module.exports = multerErrorHandler;
