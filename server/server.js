require("dotenv").config();
if (!process.env.PORT || !process.env.CLIENT_URL) {
  console.log("Environmental Variables are not defined");
  process.exit(1);
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const connectDb = require("./src/config/dbConfig.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const {
  verifyAndCheckUserToken,
  verifyAndCheckAdminToken,
} = require("./src/middleware/authMiddleware.js");
const errorMiddleware = require("./src/middleware/errorMiddleware.js");

const authRoutes = require("./src/routes/authRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const adminRoutes = require("./src/routes/adminRoutes.js");
const productRoutes = require("./src/routes/productRoutes.js");
const cartRoutes = require("./src/routes/cartRoutes.js");
const wishlistRoutes = require("./src/routes/wishlistRoutes.js");
const orderRoutes = require("./src/routes/orderRoutes.js");
const securityRoutes = require("./src/routes/securityRoutes.js");

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

  
app.use("/api/admin", verifyAndCheckAdminToken, adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyAndCheckUserToken, userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart/items", verifyAndCheckUserToken, cartRoutes);
app.use("/api/wishlist/items", verifyAndCheckUserToken, wishlistRoutes);
app.use("/api/orders", verifyAndCheckUserToken, orderRoutes);
app.use("/api/security", securityRoutes);

// WHEN API ENDPOINT NOT EXIST
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Api endpoint not exist!!",
  });
});

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);
