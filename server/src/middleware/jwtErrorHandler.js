function jwtErrorHandler(err) {
  if (err.name === "TokenExpiredError") {
    return {
      statusCode: 401,
      message: "Token expired. Please login again.",
    };
  }

  if (err.name === "JsonWebTokenError") {
    return {
      statusCode: 401,
      message: "Invalid token",
    };
  }

  return null;
}

module.exports = jwtErrorHandler;
