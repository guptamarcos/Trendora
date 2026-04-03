const Joi = require("joi");

const userSchemaValidator = Joi.object({
  username: Joi.string().trim().min(3).max(50).required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username must be at most 50 characters"
    }),

  email: Joi.string().trim().lowercase().email().required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  password: Joi.string()
    .min(5)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, special character and be at least 5 characters long",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 5 characters",
    }),

  bio: Joi.string().max(200)
    .messages({
      "string.max": "Bio must be less than 200 characters"
    })
});

module.exports = { userSchemaValidator }