const Joi = require("joi");

const otpSchemaValidator = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  otp: Joi.string()
    .trim()
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      "string.empty": "OTP is required",

      "string.pattern.base": "OTP must be 6 digits",
    }),
});

module.exports = otpSchemaValidator;
