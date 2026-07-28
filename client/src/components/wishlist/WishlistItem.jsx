import { removeWishlistItem } from "../../api/wishlistApi.js";
import { addToCart } from "../../api/cartApi.js";
import { toast } from "react-toastify";
import { UserContext } from "../../context/Index.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function WishlistItem({ wishlistItem, getUserWishListItems }) {
  const { product, size, quantity } = wishlistItem || {};
  const { name, price, productImage } = product || {};
  const navigate = useNavigate();

  const { getUser } = useContext(UserContext);

  async function deleteWishlistItem() {
    try {
      await removeWishlistItem(wishlistItem._id);
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
      const productId = product?._id;
      await addToCart({ productId, size, quantity });
      await removeWishlistItem(wishlistItem?._id);
      toast.success("Product added to cart");
      getUserWishListItems();
      getUser();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-200 py-4 gap-4">
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
          onClick={() => navigate(`/trendora/products/${product?._id}`)}
        >
          <img
            src={productImage?.url || "/placeholder.png"}
            alt={name || "product"}
            className="cursor-pointer w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col gap-3 sm:gap-6 cursor-pointer">
          <h6
            className="font-semibold text-gray-800 text-base sm:text-lg"
            onClick={() => navigate(`/trendora/products/${product?._id}`)}
          >
            {name || "No Name"}
          </h6>

          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-gray-600 text-sm sm:text-base">
            <span className="font-medium text-black">₹{price || 0}</span>
            <span>Size: {size || "N/A"}</span>
            <span>Qty: {quantity || 1}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <button
          onClick={addWishlistItemToCart}
          className="cursor-pointer w-full sm:w-auto px-4 py-2 text-sm border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          Add to Cart
        </button>

        <button
          onClick={deleteWishlistItem}
          className="cursor-pointer w-full sm:w-auto text-sm text-red-500 hover:underline text-center"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;