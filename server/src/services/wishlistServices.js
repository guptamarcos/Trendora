const Product = require("../models/productSchema.js");
const User = require("../models/userSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const isValidDocumentId = require("../utils/Validator.js");
const cartSchemaValidator = require("../validations/cartSchemaValidator.js");

async function getWishlistItems(userId) {
  const wishlist = await User.findById(userId).select("wishlist").populate({
    path: "wishlist.product",
    select: "productImage name price",
  });

  return {
    success: true,
    data: wishlist,
  };
}

async function addToWishlist(body, userId) {
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

  const wishlistItemExist = await User.exists({
    _id: userId,
    wishlist: {
      $elemMatch: {
        product: productId,
        size,
      },
    },
  });

  if (wishlistItemExist) {
    await User.updateOne(
      {
        _id: userId,
        "wishlist.product": productId,
        "wishlist.size": size,
      },
      {
        $inc: {
          "wishlist.$.quantity": quantity,
        },
      },
    );
  } else {
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          wishlist: {
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
    message: "Product added to wishlist",
  };
}

async function removeWishlistItem(userId, itemId) {
  if (!isValidDocumentId(itemId)) {
    throw new ExpressError(400, "Invalid Item Id");
  }

  const item = await User.updateOne(
    { _id: userId },
    {
      $pull: {
        wishlist: { _id: itemId },
      },
    },
  );

  return {
    success: true,
    message: "Item removed successfully",
  };
}

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
};
