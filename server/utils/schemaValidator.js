const Joi = require("joi");

//  USER SCHEMA
const userBaseSchema = Joi.object({
  username: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 50 characters",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, special character and be at least 5 characters long",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 5 characters",
    }),

  bio: Joi.string()
    .trim()
    .allow("")
    .max(200)
    .messages({
    "string.max": "Bio must be less than 200 characters",
  }),
});

// SIGNUP SCHEMA VALIDATION
const signupSchemaValidator = Joi.object({
  username: userBaseSchema.extract("username"),
  email: userBaseSchema.extract("email"),
  password: userBaseSchema.extract("password"),
});

// LOGIN SCHEMA VALIDATION
const loginSchemaValidator = Joi.object({
  email: userBaseSchema.extract("email"),
  password: userBaseSchema.extract("password") ,
});

// PROFILE VALIDATION SCHEMA 
const ProfileInfoSchemaValidator = Joi.object({
  username: userBaseSchema.extract("username"),
  email: userBaseSchema.extract("email"),
  bio: userBaseSchema.extract("bio"),
});

// PASSWORD VALIDATION SCHEMA
const PasswordSchemaValidator = Joi.object({
  oldPassword: userBaseSchema.extract("password"),
  newPassword: userBaseSchema.extract("password")
  .invalid(Joi.ref("oldPassword"))
  .messages({
    "any.invalid": "New password must be different from old password",
  }),
})


module.exports = { signupSchemaValidator, loginSchemaValidator, 
  ProfileInfoSchemaValidator , PasswordSchemaValidator};
