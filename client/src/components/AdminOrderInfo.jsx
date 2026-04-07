function DropDown() {
  return (
    <select className="border border-gray-200 px-3 py-2 rounded-md text-gray-700 bg-white cursor-pointer">
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
    <thead className="bg-gray-50 text-gray-600 text-lg">
      <tr>
        <th className="px-4 py-3">Order ID</th>
        <th className="px-4 py-3">Customer</th>
        <th className="px-4 py-3">Amount</th>
        <th className="px-4 py-3">Payment</th>
        <th className="px-6 py-3">Status</th>
        <th className="px-4 py-3">Order Date</th>
        <th className="px-6 py-3 text-right">Action</th>
      </tr>
    </thead>
  );
}

function TableRow() {
  return (
    <tr className="border-t border-gray-200">
      {/* ORDER ID */}
      <td className="px-4 py-3 font-medium text-gray-800">#124545dsf</td>

      {/* CUSTOMER */}
      <td className="px-4 py-5 flex items-center">John Doe</td>

      {/* AMOUNT */}
      <td className="px-4 py-3">₹2,499</td>

      {/* PAYMENT */}
      <td className="px-4 py-3">
        <span className="text-green-600 text-sm">Paid</span>
      </td>

      {/* STATUS */}
      <td className="px-4 py-3">
        <DropDown />
      </td>

      {/* DATE */}
      <td className="px-4 py-3 text-gray-500 text-sm">12 Apr 2026</td>

      {/* ACTION */}
      <td className="px-4 py-3 text-right space-x-2">
        <button className="cursor-pointer text-sm px-3 py-1 border border-gray-200 rounded-md">
          Edit
        </button>
      </td>
    </tr>
  );
}

function AdminOrderInfo() {
  return (
    <div className="w-full p-8 bg-gray-100 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Orders</h1>
        <p className="text-gray-500 text-base">
          Track and manage all customer orders
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex justify-between items-center gap-4">
        <div className="h-12 flex items-center gap-1">
          <input
            type="text"
            placeholder="Search users..."
            className="h-full w-full max-w-sm border px-4 border-gray-200 rounded-md focus:outline-none bg-white"
          />
          <button className="h-full flex justify-center cursor-pointer items-center px-6 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-100">
            Search
          </button>
        </div>

        <select className="border border-gray-200 px-3 py-2 rounded-md text-gray-700 bg-white cursor-pointer">
          <option>All Status</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          {/* HEAD */}
          <TableHead />

          {/* BODY */}
          <tbody className="text-gray-700">
            <TableRow />
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-sm text-gray-600">
        <p>
          Showing <span className="font-medium text-gray-800">1–10</span> of{" "}
          <span className="font-medium text-gray-800">120</span> orders
        </p>

        <button className="cursor-pointer px-4 py-1.5 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100">
          Show more
        </button>
      </div>
    </div>
  );
}

export default AdminOrderInfo;
