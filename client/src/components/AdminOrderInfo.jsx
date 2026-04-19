import { useEffect, useState } from "react";
import { getAllOrder } from "../api/orderApi.js";
import { toast } from "react-toastify";

function StatusDropdown({ value, onChange }) {
  const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

  return (
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-200 px-3 py-2 rounded-md text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
    >
      {statuses.map((status) => (
        <option key={status}>{status}</option>
      ))}
    </select>
  );
}

function TableHead() {
  const headings = [
    "Order ID",
    "Customer",
    "Amount",
    "Payment",
    "Order Date",
    "Status",
  ];

  return (
    <thead className="bg-gray-50 text-gray-600 text-sm">
      <tr>
        {headings.map((head) => (
          <th key={head} className="py-3 px-6 font-semibold">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow({ order }) {
  if (!order) return null;

  const {
    _id,
    user,
    totalAmount,
    createdAt,
    orderStatus,
    paymentStatus,
  } = order;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const getPaymentColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-orange-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-3 font-medium text-gray-800">{_id}</td>

      <td className="px-6 py-3">{user?.username}</td>

      <td className="px-6 py-3">₹ {totalAmount}</td>

      <td className={`px-6 py-3 text-sm font-medium ${getPaymentColor(paymentStatus)}`}>
        {paymentStatus}
      </td>

      <td className="px-6 py-3 text-sm text-gray-500">
        {formattedDate}
      </td>

      <td className="px-6 py-3">
        <StatusDropdown value={orderStatus} />
      </td>
    </tr>
  );
}

function AdminOrderInfo() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrder();
      setOrders(res?.data?.allOrders || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          <p className="text-gray-500">Manage customer orders</p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search users..."
            className="h-10 w-full md:w-72 border border-gray-200 px-4 rounded-md focus:ring-2 focus:ring-black"
          />

          <StatusDropdown />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <TableHead />

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id} order={order} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Showing <span className="font-medium">1–10</span> of{" "}
            <span className="font-medium">{orders.length}</span>
          </p>

          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderInfo;
