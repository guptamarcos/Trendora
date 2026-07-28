import { getAllUser, deleteUser } from "../../api/adminApi.js";
import { useState, useEffect } from "react";
import { defaultProfileImage } from "../../assets/Index.jsx";
import { toast } from "react-toastify";
import { AdminSectionSkeleton } from "../../components/skeletons/Index.jsx";

function TableHead() {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
          User
        </th>

        <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
          Email
        </th>

        <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
          Role
        </th>

        <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
          Status
        </th>

        <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-gray-700 whitespace-nowrap">
          Action
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ user, fetchUsers }) {
  async function handleDelete() {
    toast.warning(
      "Delete functionality is disabled in this demo to prevent accidental data loss.",
    );
    return;

    try {
      await deleteUser(user._id);

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Inactive":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition duration-200">
      {/* USER */}
      <td className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={user?.profileImage?.path || defaultProfileImage}
            alt={user.username}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
          />

          <div>
            <p className="font-medium text-sm sm:text-base text-gray-800">
              {user.username}
            </p>

            <p className="text-xs sm:text-sm text-gray-500">
              ID: {user._id.slice(-6)}
            </p>
          </div>
        </div>
      </td>

      
      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-700 whitespace-nowrap">
        {user.email}
      </td>

      
      <td className="px-4 sm:px-6 py-4">
        <span className="capitalize font-medium text-sm sm:text-base text-gray-700 whitespace-nowrap">
          {user.role}
        </span>
      </td>

      
      <td className="px-4 sm:px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ${getStatusStyles(
            user.status,
          )}`}
        >
          {user.status}
        </span>
      </td>

      
      {user.role !== "admin" && (
        <td className="px-4 sm:px-6 py-4 text-right">
          <button
            onClick={handleDelete}
            className="cursor-pointer rounded-lg border border-red-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition whitespace-nowrap"
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}

function AllUsersInfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [matchedUsersCount, setMatchedUsersCount] = useState(0);

  async function fetchUsers() {
    try {
      setLoading(true);

      const res = await getAllUser(search, status, limit);

      const userData = res?.data?.data || [];

      setUsers(userData);
      setMatchedUsersCount(res?.data?.matchedUsersCount);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [limit, status]);

  if (loading) {
    return <AdminSectionSkeleton />;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Users
          </h1>

          <p className="text-sm sm:text-base text-gray-500">
            Manage and monitor all registered users
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full lg:w-72 border border-gray-200 px-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={() => {
                setLimit(10);
                fetchUsers();
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
            className="h-11 w-full sm:w-52 lg:w-44 border border-gray-200 px-4 rounded-md bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* USER COUNT */}
        <div>
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-800">{users?.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {matchedUsersCount}
            </span>{" "}
            users
          </p>
        </div>

                {/* TABLE */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <TableHead />

              <tbody>
                {users?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users?.map((user) => (
                    <TableRow
                      key={user._id}
                      user={user}
                      fetchUsers={fetchUsers}
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
              users?.length > 10 ? "" : "invisible"
            }`}
          >
            Show Less
          </button>

          <button
            onClick={() => {
              setLimit((prev) => prev + 10);
            }}
            className={`cursor-pointer w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-black text-white hover:opacity-90 transition ${
              users?.length < matchedUsersCount ? "" : "invisible"
            }`}
          >
            Show More
          </button>
        </div>
      </div>
    </main>
  );
}

export default AllUsersInfo;