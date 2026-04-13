require("dotenv").config();
if (!process.env.PORT || !process.env.CLIENT_URL) {
  console.log("Environmental Variables are not defined");
  process.exit(1);
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const connectDb = require("./Db/connect.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js");
const wishlistRoutes = require("./routes/wishlistRoutes.js")
const MongooseErrorHandler = require("./utils/MongooseErrorHandler.js");
const path = require("path");
const MulterErrorHandler = require("./utils/MulterErrorHandler.js");

// MIDDLEWARE SETUP
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));

// WE ONLY NEED IT WHEN WE LOCALLY UPLOADING THE IMAGES
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CONNECT THE DATABASE AND START THE SERVER
connectDb()
  .then(() => {
    // CREATE AND START THE SERVER
    app.listen(port, () => {
      console.log(`Server is listening on the port ${port}`);
    });

    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Database connection failed \n", err);
    process.exit(1);
  });

app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user/cart", cartRoutes);
app.use("/api/user/wishlist", wishlistRoutes);

// WHEN API ENDPOINT NOT EXIST
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Api endpoint not exist!!",
  });
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const mongooseError = MongooseErrorHandler(err);

  if (mongooseError) {
    const { statusCode, message } = mongooseError;
    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }

  console.log("Error is occur \n", err);

  if (err.name === "TypeError") {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
  
  const { statusCode = 500, message = "Internal Server Error" } = err;
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
});
