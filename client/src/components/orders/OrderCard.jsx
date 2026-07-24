import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { cancelOrder } from "../../api/orderApi.js";
import { toast } from "react-toastify";

function OrderCard({ order }) {
  if (!order) return null;

  const navigate = useNavigate();
  const { product, totalAmount, quantity, size, createdAt, orderStatus } =
    order;

  const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = product?.productImage?.url || "/placeholder.png";

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Pending":
        return "orange";
      default:
        return "gray";
    }
  };

  async function handleCancelOrder() {
    try {
      await cancelOrder(order?._id);
      // await cancelOrder(orderId);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 border-b border-gray-200">
      {/* LEFT SECTION */}
      <div
        className="flex items-center gap-4 w-full md:w-auto"
        onClick={() => navigate(`/trendora/products/${product?._id}`)}
      >
        {/* IMAGE */}
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="cursor-pointer h-20 w-20 object-cover rounded-md"
        />

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <h6 className="cursor-pointer font-semibold text-lg text-gray-700">
            {product?.name || "Unknown Product"}
          </h6>

          <div className="my-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>₹{totalAmount}</span>
            <span>
              <b>Qty:</b> {quantity}
            </span>
            <span>
              <b>Size:</b> {size}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            <b>Date:</b> {formattedDate}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto">
        {/* STATUS */}
        <div className="flex items-center gap-2">
          {orderStatus !== "Cancelled" && (
            <FaCircle color={getStatusColor(orderStatus)} size={10} />
          )}

          {orderStatus === "Cancelled" ? (
            <span className="px-4 py-2 rounded-2xl bg-red-100 text-red-600 text-sm font-medium">
              Cancelled
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-700">
              {orderStatus}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        {orderStatus !== "Cancelled" && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancelOrder}
              className="text-red-500 text-sm font-medium hover:text-red-600 transition cursor-pointer"
            >
              Cancel Order
            </button>

            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition cursor-pointer">
              Track Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
