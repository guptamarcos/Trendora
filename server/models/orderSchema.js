const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "stripe"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    shippingAddress: {
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
