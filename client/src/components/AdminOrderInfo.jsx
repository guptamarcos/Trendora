function DropDown() {
  return (
    <select className="border border-gray-200 px-3 py-2 rounded-md text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-black">
      <option>All Status</option>
      <option>Pending</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>
  );
}

function TableHead() {
  return (
    <thead className="bg-gray-50 text-gray-600 text-sm">
      <tr>
        <th className="py-3 px-10 text-lg font-semibold">Order ID</th>
        <th className="py-3 px-10 text-lg font-semibold">Customer</th>
        <th className="py-3 px-10 text-lg font-semibold">Amount</th>
        <th className="py-3 px-10 text-lg font-semibold">Payment</th>
        <th className="py-3 px-10 text-lg font-semibold">Order Date</th>
        <th className="py-3 px-10 text-lg font-semibold">Status</th>
      </tr>
    </thead>
  );
}

function TableRow() {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      {/* ORDER ID */}
      <td className="px-10 py-3 font-medium text-gray-800">
        #124545dsf
      </td>

      {/* CUSTOMER */}
      <td className="px-10 py-5 flex items-center">
        John Doe
      </td>

      {/* AMOUNT */}
      <td className="px-10 py-3">₹2,499</td>

      {/* PAYMENT */}
      <td className="px-10 py-3">
        <span className="text-green-600 text-sm font-medium">
          Paid
        </span>
      </td>

      {/* DATE */}
      <td className="px-10 py-3 text-gray-500 text-sm">
        12 Apr 2026
      </td>

      {/* STATUS */}
      <td className="px-10 py-3">
        <DropDown />
      </td>
    </tr>
  );
}

function AdminOrderInfo() {
  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Orders
          </h1>
          <p className="text-gray-500 text-base">
            Track and manage all customer orders
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search users..."
              className="h-11 w-full md:w-72 border border-gray-200 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
            <button className="h-11 px-6 rounded-md border border-gray-200 text-gray-700 bg-white hover:bg-gray-100 transition">
              Search
            </button>
          </div>

          <select className="h-11 border border-gray-200 px-4 rounded-md text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-black">
            <option>All Status</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <TableHead />

            <tbody className="text-gray-700">
              <TableRow />
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            Showing{" "}
            <span className="font-medium text-gray-800">1–10</span> of{" "}
            <span className="font-medium text-gray-800">120</span> orders
          </p>

          <button className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition">
            Show more
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminOrderInfo;