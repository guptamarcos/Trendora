const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
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
      trim: true,
      maxLength: [200, "Bio cannot exceed 200 characters"],
    },

    profileImage: {
      path: {
        type: String,
        default: "",
      },
      filename: {
        type: String,
        default: "",
      },
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },

    wishlist: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        size: {
          type: String,
          required: true,
          enum: ["XXL", "XL", "L", "M", "S"],
        },

        quantity: {
          type: Number,
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        size: {
          type: String,
          required: true,
          enum: ["XXL", "XL", "L", "M", "S"],
        },

        quantity: {
          type: Number,
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
      },
    ],

    addresses: [
      {
        firstName: {
          type: String,
          required: true,
          trim: true,
          minlength: [3, "First name must be at least 3 characters"],
          maxLength: [30, "First name must not exceed 30 characters"],
        },
        lastName: {
          type: String,
          trim: true,
          default: "",
          validate: {
            validator: function (val) {
              return val === "" || val.length >= 3;
            },
            message: "Last name must be at least 3 characters",
          },
          maxLength: [30, "Last name is too long"],
        },
        email: {
          type: String,
          required: [true, "Email is required"],
          trim: true,
          lowercase: true,
          validate: {
            validator: validator.isEmail,
            message: "Invalid email address",
          },
        },
        street: {
          type: String,
          trim: true,
          default: "",
          validate: {
            validator: function (val) {
              return val === "" || val.length >= 5;
            },
            message: "Street address too short",
          },
        },
        city: {
          type: String,
          required: true,
          trim: true,
          minlength: [3, "City at least have 3 characters"],
        },
        state: {
          type: String,
          required: true,
          trim: true,
          minlength: [3, "State at least have 3 characters"],
        },
        zipcode: {
          type: String,
          required: true,
          trim: true,
          match: [/^\d{6}$/, "Zip code must be 6 digits"],
        },
        country: {
          type: String,
          required: true,
          trim: true,
          minlength: [3, "Country at least have 3 characters"],
        },
        phone: {
          type: String,
          required: true,
          trim: true,
          match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
        },
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
  return jwt.sign({ userId: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// CREATING THE USER MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
