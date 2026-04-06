const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        "Password must contain uppercase, lowercase, number, special character and be at least 5 characters long",
      ],
      select: false,
    },
    bio: {
      type: String,
      default: "",
      trim : true,
      maxLength: [200, "Bio cannot exceed 200 characters"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true },
);


// HASHING THE PASSWORD BEFORE STORING IT IN THE DATABASE
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// MAKING A CUSTOM DOCUMENT LEVEL METHOD
userSchema.methods.generateToken = function () {
  return jwt.sign({ userId: this._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};


// CREATING THE USER MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
