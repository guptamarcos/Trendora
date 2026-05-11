const Joi = require("joi");

const productSchemaValidator = Joi.object({
  name: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .required()
    .messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must have at least 5 characters",
    "string.max": "Product name must not exceed 100 characters",
  }),
  category: Joi.string()
    .trim()
    .lowercase()
    .valid("men", "boy", "girl", "women")
    .required()
    .messages({
      "string.empty": "Category is required",
      "any.only": "Category must be one of men, boy, girl, women",
    }),

  description: Joi.string().
    trim().
    max(500).
    required().
    messages({
    "string.empty": "Product description is required",
    "string.max": "Description must not exceed 500 characters",
  }),

  sizes: Joi.array()
    .items(Joi.string().valid("XXL", "XL", "L", "S", "M"))
    .min(1)
    .unique()
    .required()
    .messages({
      "any.required": "Product sizes are required",
      "array.min": "At least one size must be selected",
      "any.only": "Invalid size selected",
    }),

  price: Joi.number().required().min(0).messages({
    "number.base": "Price must be number",
    "number.min": "Price can't be negative",
    "any.required": "Product price is required",
  }),
  stock: Joi.number().required().min(0).messages({
    "number.base": "Stock must be a number",
    "number.min": "Product stock can't be negative",
    "any.required": "Product stock is required",
  }),
});

module.exports = { productSchemaValidator };
