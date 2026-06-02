const Joi = require("joi");

const allowedSizes = ["XXL", "XL", "L", "S", "M"];

const cartSchemaValidator = Joi.object({
  size: Joi.string()
    .valid(...allowedSizes)
    .required()
    .messages({
      "any.required": "Product sizes are required",
    }),
  quantity: Joi.number().required().min(1).messages({
    "number.base": "Quantity must be number",
    "number.min": "Quantity can't be less than 1",
    "any.required": "Product Quantity is required",
  }),
});

module.exports = cartSchemaValidator;
