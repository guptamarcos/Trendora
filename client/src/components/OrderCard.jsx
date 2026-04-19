import { FaCircle } from "react-icons/fa";

function OrderCard({ order }) {
  if (!order) return null;

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
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 border-b border-gray-200">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 w-full md:w-auto">
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
      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
        {/* STATUS */}
        <span className="flex items-center gap-2 text-sm">
          <FaCircle color={getStatusColor(orderStatus)} size={10} />
          {orderStatus}
        </span>

        {/* BUTTON */}
        <button className="cursor-pointer border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
          Track Order
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
