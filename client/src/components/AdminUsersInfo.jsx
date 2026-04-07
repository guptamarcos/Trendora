function TableHead() {
  return (
    <thead className="bg-gray-50 text-gray-600 text-lg">
      <tr>
        <th className="px-6 py-3">User</th>
        <th className="px-4 py-3">Email</th>
        <th className="px-4 py-3">Role</th>
        <th className="px-6 py-3">Status</th>
        <th className="px-8 py-3 text-right">Action</th>
      </tr>
    </thead>
  );
}

function TableRow({username,email,role,status}) {
  return (
    <tr className="border-t border-gray-200">
      <td className="px-4 py-3 flex items-center gap-3">
        <img className="w-8 h-8 bg-gray-200 rounded-full"></img>
        {username}
      </td>

      <td className="px-4 py-3">{email}</td>

      <td className="px-3 py-3">{role}</td>

      <td className="px-7 py-3">
        <span className="text-green-600 text-base">{status}</span>
      </td>

      <td className="px-6 py-3 text-right">
        <button className="text-sm px-3 py-1 border cursor-pointer border-red-200 text-red-600 rounded-md">
          Delete
        </button>
      </td>
    </tr>
  );
}

function AllUsersInfo() {
  return (
    <div className="w-full p-8 bg-gray-100 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Users</h1>
        <p className="text-gray-500 text-base">
          Manage and monitor all registered users
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
          <option>All</option>
          <option>Admin</option>
          <option>User</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <TableHead />

          {/* BODY */}
          <tbody className="text-gray-700">
            <TableRow username="John doe" email="john@gmail.com" role="Admin" status="Active"/>
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-sm text-gray-600">
        {/* INFO */}
        <p>
          Showing <span className="font-medium text-gray-800">1–10</span> of{" "}
          <span className="font-medium text-gray-800">50</span> users
        </p>

        {/* BUTTON */}
        <button className="px-4 py-1.5 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100">
          Show more
        </button>

      </div>
    </div>
  );
}

export default AllUsersInfo;
