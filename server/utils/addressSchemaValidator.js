const Joi = require("joi");

const addressSchema = Joi.object({
  firstName: Joi.string().trim().required().min(3).max(30).messages({
    "string.empty": "FirstName is required",
    "string.min": "First Name at least have 3 characters",
    "string.max": "First name must not exceed 30 characters",
  }),
  lastName: Joi.string().trim().min(3).max(30).allow("").optional().messages({
    "string.min": "Last Name at least have 3 characters",
    "string.max": "Last name must not exceed 30 characters",
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  street: Joi.string().trim().min(5).allow("").optional().messages({
    "string.min": "Street must be at least 5 characters",
  }),
  city: Joi.string().trim().min(3).required().messages({
    "string.empty": "City is required",
    "string.min": "City at least have 3 characters",
  }),
  state: Joi.string().trim().min(3).required().messages({
    "string.empty": "State is required",
    "string.min": "State at least have 3 characters",
  }),
  zipcode: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{6}$/)
    .messages({
      "string.empty": "Zipcode is required",
      "string.pattern.base": "Zipcode must be 6 digit number",
    }),
  country: Joi.string().trim().min(3).required().messages({
    "string.empty": "Country is required",
    "string.min": "Country at least have 3 characters",
  }),
  phone: Joi.string()
    .trim()
    .required()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number is not valid",
    }),
});

module.exports = { addressSchema };
