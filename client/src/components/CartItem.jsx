import { FaTrash } from "react-icons/fa";
import { removeCartItem } from "../api/cartApi.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/Index.jsx";
import { useContext } from "react";

function CartItem({ cartItem, getUserCartItems }) {
  const { getUser } = useContext(UserContext);

  async function deleteCartItem(){
    try{
      const res = await removeCartItem(cartItem._id);
      toast.success("Product is removed from cart");
      getUserCartItems(); getUser();
    }catch(err){
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b border-gray-200 py-4">

      {/* LEFT: Product Info */}
      <div className="flex items-center gap-4">

        {/* Image */}
        <img
          src={cartItem?.product?.productImage?.url || ""}
          alt={cartItem?.product?.name || "product"}
          className="cursor-pointer h-20 w-20 object-cover rounded"
        />

        {/* Details */} 
        <div className="flex flex-col gap-6 cursor-pointer">
          <h6 className="font-semibold text-lg text-gray-700">
            {cartItem?.product?.name}
          </h6>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="font-medium text-gray-800">
              ₹{cartItem?.product?.price}
            </span>
            <span>Size: {cartItem?.size}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-6">

        {/* Quantity */}
        <input
          type="number"
          defaultValue={cartItem?.quantity}
          min="1"
          max="100"
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
        />

        {/* Delete */}
        <button onClick={deleteCartItem} className="cursor-pointer text-red-500 hover:text-red-600 transition">
          <FaTrash size={18} />
        </button>

      </div>
    </div>
  );
}

export default CartItem;