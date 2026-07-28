import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminSectionSkeleton } from "../../components/skeletons/Index.jsx";
import { getAllOrders, updateOrderStatus } from "../../api/adminApi.js";

function TableHead() {
  const headings = [
    "Order ID",
    "Customer",
    "Amount",
    "Payment",
    "Order Date",
    "Order Status",
  ];

  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headings.map((head) => (
          <th
            key={head}
            className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow({
  order,
  setOrders,
  fetchOrders,
  loading,
  setLoading,
}) {
  if (!order) return null;

  const {
    _id,
    user,
    totalAmount,
    createdAt,
    paymentStatus,
    orderStatus,
  } = order;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const getPaymentStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      case "Refunded":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const orderStatusVal = [
    "Completed",
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  async function handleOrderStatusChange(e) {
    const newStatus = e.target.value;

    try {
      setLoading(true);

      await updateOrderStatus(newStatus, _id);

      await fetchOrders();

      toast.success("Order status updated successfully");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition duration-200">

      {/* ORDER ID */}
      <td className="px-4 sm:px-6 py-4">
        <div>
          <p className="font-medium text-sm sm:text-base text-gray-800">
            #{_id.slice(-8)}
          </p>

          <p className="text-xs text-gray-500 whitespace-nowrap">
            {_id}
          </p>
        </div>
      </td>

      {/* CUSTOMER */}
      <td className="px-4 sm:px-6 py-4">
        <div className="flex flex-col">
          <p className="font-medium text-sm sm:text-base text-gray-800 whitespace-nowrap">
            {user?.username || "Unknown User"}
          </p>

          <p className="text-xs sm:text-sm text-gray-500">
            Customer
          </p>
        </div>
      </td>

      {/* AMOUNT */}
      <td className="px-4 sm:px-6 py-4 font-medium text-sm sm:text-base text-gray-800 whitespace-nowrap">
        ₹{totalAmount}
      </td>

      {/* PAYMENT */}
      <td className="px-4 sm:px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ${getPaymentStyles(
            paymentStatus
          )}`}
        >
          {paymentStatus}
        </span>
      </td>

      {/* DATE */}
      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
        {formattedDate}
      </td>

      {/* STATUS */}
      <td className="px-4 sm:px-6 py-4">
        {orderStatus === "Cancelled" ? (
          <span className="text-sm sm:text-base text-red-500 font-medium whitespace-nowrap">
            Cancelled
          </span>
        ) : (
          <select
            value={orderStatus}
            onChange={handleOrderStatusChange}
            className="h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 sm:px-4 text-xs sm:text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black whitespace-nowrap"
          >
            {orderStatusVal.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      </td>
    </tr>
  );
}

function AdminOrderInfo() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchedOrdersCount, setMatchedOrdersCount] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders(search, status, limit);

      const orderData = res?.data?.data || [];

      setOrders(orderData);

      setMatchedOrdersCount(res?.data?.matchedOrdersCount || 0);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, limit]);

  if (loading) {
    return <AdminSectionSkeleton />;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Orders
          </h1>

          <p className="text-sm sm:text-base text-gray-500">
            Manage customer orders
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">

            <input
              type="text"
              placeholder="Search Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full lg:w-72 border border-gray-200 px-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={() => {
                setLimit(10);
                fetchOrders();
              }}
              className="cursor-pointer h-11 w-full sm:w-auto px-6 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              Search
            </button>

          </div>

          <select
            value={status}
            onChange={(e) => {
              setLimit(10);
              setStatus(e.target.value);
            }}
            className="h-11 w-full sm:w-52 lg:w-48 border border-gray-200 px-4 rounded-md bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

        {/* COUNT */}
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {orders.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-800">
            {matchedOrdersCount}
          </span>{" "}
          orders
        </p>

                {/* TABLE */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse">
              <TableHead />

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-10 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <TableRow
                      key={order._id}
                      order={order}
                      setOrders={setOrders}
                      fetchOrders={fetchOrders}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-5">
          <button
            onClick={() => setLimit((prev) => prev - 10)}
            className={`cursor-pointer w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition ${
              orders.length > 10 ? "" : "invisible"
            }`}
          >
            Show Less
          </button>

          <button
            onClick={() => setLimit((prev) => prev + 10)}
            className={`cursor-pointer w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-black text-white hover:opacity-90 transition ${
              orders.length < matchedOrdersCount ? "" : "invisible"
            }`}
          >
            Show More
          </button>
        </div>
      </div>
    </main>
  );
}

export default AdminOrderInfo;
