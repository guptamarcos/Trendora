const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");
const isValidDocumentId = require("../utils/Validator.js");
const ExpressError = require("../utils/ExpressError.js");
const cartSchemaValidator = require("../validations/cartSchemaValidator.js");

async function getCartItems(userId) {
  const cartItems = await User.findById(userId).select("cart").populate({
    path: "cart.product",
    select: "productImage name price",
  });

  return {
    success: true,
    data: cartItems,
  };
}

async function addToCart(body, userId) {
  const { productId, size, quantity } = body;

  if (!isValidDocumentId(productId)) {
    throw new ExpressError(400, "Invalid Product id");
  }

  const { value, error } = cartSchemaValidator.validate(
    { size, quantity },
    {
      abortEarly: false,
    },
  );

  if (error) {
    const errMsg = error.details.map((err) => err.message);
    throw new ExpressError(422, errMsg);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ExpressError(404, "Product not found");
  }

  const productSizes = product.sizes;
  if (!productSizes.includes(size)) {
    throw new ExpressError(400, "Invalid product size");
  }

  if (product.stock === 0) {
    throw new ExpressError(400, "Product is out of stock");
  }

  if (quantity > product.stock) {
    throw new ExpressError(
      400,
      `Only ${product.stock} items are left in the stock`,
    );
  }

  const cartItemExist = await User.exists({
    _id: userId,
    cart: {
      $elemMatch: {
        product: productId,
        size,
      },
    },
  });

  if (cartItemExist) {
    await User.updateOne(
      {
        _id: userId,
        "cart.product": productId,
        "cart.size": size,
      },
      {
        $inc: {
          "cart.$.quantity": quantity,
        },
      },
    );
  } else {
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          cart: {
            product: productId,
            size,
            quantity: 1,
          },
        },
      },
    );
  }

  return {
    success: true,
    message: "Product added to cart",
  };
}

async function removeCartItem(userId, itemId) {
  if (!isValidDocumentId(itemId)) {
    throw new ExpressError(400, "Invalid Item Id");
  }

  const cartItems = await User.updateOne(
    { _id: userId },
    {
      $pull: {
        cart: { _id: itemId },
      },
    },
  );

  return {
    success: true,
    message: "Items removed successfully",
  };
}

module.exports = {
  getCartItems,
  addToCart,
  removeCartItem,
};
