import { removeWishlistItem } from "../api/wishlistApi.js";
import { addToCart } from "../api/cartApi.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/Index.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function WishlistItem({ wishlistItem, getUserWishListItems }) {
  const { product, size, quantity } = wishlistItem || {};
  const { name, price, productImage } = product || {};
  const navigate = useNavigate();

  const { getUser } = useContext(UserContext);

  async function deleteWishlistItem() {
    try {
      const res = await removeWishlistItem(wishlistItem._id);
      toast.success("Product removed from wishlist");
      getUserWishListItems();
      getUser();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  async function addWishlistItemToCart() {
    try {
      const productId = product._id;
      await addToCart({ productId, size, quantity });
      await removeWishlistItem(wishlistItem._id);
      toast.success("Product added to cart");
      getUserWishListItems();
      getUser();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b border-gray-200 py-4">
      {/* LEFT: Product Info */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div
          className="w-20 h-20 flex-shrink"
          onClick={() => navigate(`/trendora/products/${product?._id}`)}
        >
          <img
            src={productImage?.url || "/placeholder.png"}
            alt={name || "product"}
            className="cursor-pointer w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6 cursor-pointer">
          <h6
            className="font-semibold text-gray-800 text-lg"
            onClick={() => navigate(`/trendora/products/${product?._id}`)}
          >
            {name || "No Name"}
          </h6>

          <div className="flex items-center gap-6 text-gray-600">
            <span className="font-medium text-black">₹{price || 0}</span>
            <span className="text-base">Size: {size || "N/A"}</span>
            <span className="text-base">Qty: {quantity || 1}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={addWishlistItemToCart}
          className="cursor-pointer px-4 py-1.5 text-sm border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          Add to Cart
        </button>

        <button
          onClick={deleteWishlistItem}
          className="cursor-pointer text-sm text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;
