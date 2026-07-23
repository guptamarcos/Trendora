import { getAllUser, deleteUser } from "../../api/adminApi.js";
import { useState, useEffect } from "react";
import { defaultProfileImage } from "../../assets/Index.jsx";
import { toast } from "react-toastify";
import { AdminSectionSkeleton } from "../../components/skeletons/Index.jsx";

function TableHead() {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
          User
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
          Email
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
          Role
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
          Status
        </th>

        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
          Action
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ user, fetchUsers }) {
  async function handleDelete() {
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
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.profileImage?.path || defaultProfileImage}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover border border-gray-200 bg-gray-100"
          />

          <div>
            <p className="font-medium text-gray-800">{user.username}</p>

            <p className="text-sm text-gray-500">ID: {user._id.slice(-6)}</p>
          </div>
        </div>
      </td>

      {/* EMAIL */}
      <td className="px-6 py-4 text-gray-700">{user.email}</td>

      {/* ROLE */}
      <td className="px-6 py-4">
        <span className="capitalize font-medium text-gray-700">
          {user.role}
        </span>
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(
            user.status,
          )}`}
        >
          {user.status}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </td>
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
    <main className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>

          <p className="text-gray-500">
            Manage and monitor all registered users
          </p>
        </div>

        {/* KEEPING SAME SEARCH + DROPDOWN */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full md:w-72 border border-gray-200 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />

            <button
              onClick={() => {
                setLimit(10);
                fetchUsers();
              }}
              className="cursor-pointer h-11 px-6 rounded-md border border-gray-200 text-gray-700 bg-white hover:bg-gray-100 transition"
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
            className="h-11 border border-gray-200 px-4 rounded-md text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
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
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
              <TableHead />

              <tbody>
                {users?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users?.map((user) => <TableRow key={user._id} user={user} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-5">
          <button
            onClick={() => setLimit((prev) => prev - 10)}
            className={`cursor-pointer w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition ${users?.length > 10 ? "" : "invisible"}`}
          >
            Show Less
          </button>

          <button
            onClick={() => {
              setLimit((prev) => prev + 10);
            }}
            className={`cursor-pointer w-full sm:w-auto px-5 py-3 rounded-xl bg-black text-white hover:opacity-90 transition ${users?.length < matchedUsersCount ? "" : "invisible"}`}
          >
            Show More
          </button>
        </div>
      </div>
    </main>
  );
}

export default AllUsersInfo;
