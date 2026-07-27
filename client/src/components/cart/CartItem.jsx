import { FaTrash } from "react-icons/fa";
import { removeCartItem } from "../../api/cartApi.js";
import { toast } from "react-toastify";
import { UserContext } from "../../context/Index.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function CartItem({ cartItem, getUserCartItems }) {
  const { getUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function deleteCartItem() {
    try {
      await removeCartItem(cartItem._id);
      toast.success("Product is removed from cart");
      getUserCartItems();
      getUser();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-200 py-4 gap-4">
      <div
        className="flex items-center gap-4"
        onClick={() => navigate(`/trendora/products/${cartItem?.product?._id}`)}
      >
        <img
          src={cartItem?.product?.productImage?.url || ""}
          alt={cartItem?.product?.name || "product"}
          className="cursor-pointer h-20 w-20 sm:h-24 sm:w-24 object-cover rounded"
        />

        <div className="flex flex-col gap-3 sm:gap-6 cursor-pointer">
          <h6 className="font-semibold text-base sm:text-lg text-gray-700">
            {cartItem?.product?.name}
          </h6>

          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-sm text-gray-600">
            <span className="font-medium text-gray-800">
              ₹{cartItem?.product?.price}
            </span>

            <span>Size: {cartItem?.size}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
        <input
          type="number"
          defaultValue={cartItem?.quantity}
          min="1"
          max="100"
          className="w-14 sm:w-16 px-2 py-1 border border-gray-300 rounded text-center"
        />

        <button
          onClick={deleteCartItem}
          className="cursor-pointer text-red-500 hover:text-red-600 transition"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;