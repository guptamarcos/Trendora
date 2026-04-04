function MongooseErrorHandler(err) {

  // Validation Error
  if (err.name === "ValidationError") {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return {
      statusCode: 400,
      message: errors,
    };
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return {
      statusCode: 400,
      message: `${field} already exists`,
    };
  }

  // Cast Error
  if (err.name === "CastError") {
    return {
      statusCode: 400,
      message: "Invalid ID format",
    };
  }

  // Mongo Server Error
  if (err.name === "MongoServerError") {
    return {
      statusCode: 500,
      message: "Database error",
    };
  }


  return null;
}

module.exports = MongooseErrorHandler;