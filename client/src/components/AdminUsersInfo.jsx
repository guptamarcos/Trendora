import { getAllUserInfo } from "../api/authApi.js";
import { useState, useEffect } from "react";
import {defaultProfileImage} from "../assets/Index.jsx";

function TableHead() {
  return (
    <thead className="bg-gray-50 text-gray-600 text-sm">
      <tr>
        <th className="px-4 py-3 text-lg font-semibold">User</th>
        <th className="px-4 py-3 text-lg font-semibold">Email</th>
        <th className="px-4 py-3 text-lg font-semibold">Role</th>
        <th className="px-4 py-3 text-lg font-semibold">Status</th>
        <th className="px-6 py-3 text-right text-lg font-semibold">Action</th>
      </tr>
    </thead>
  );
}

function TableRow({ user }) {
  console.log(user);
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      
      {/* USER */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={user?.profileImage?.path || defaultProfileImage} className="w-8 h-8 bg-gray-200 rounded-sm object-cover" />
          <span className="font-medium text-gray-800">{user.username}</span>
        </div>
      </td>

      {/* EMAIL */}
      <td className="px-4 py-3 text-gray-700">{user.email}</td>

      {/* ROLE */}
      <td className="px-4 py-3">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>

      {/* STATUS */}
      <td className="px-4 py-3">
        <span className="text-green-600 text-sm font-medium">
          Active
        </span>
      </td>

      {/* ACTION */}
      <td className="px-4 py-3 text-right">
        <button className="text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition">
          Delete
        </button>
      </td>
    </tr>
  );
}

function AllUsersInfo() {
 
  const [allUser, setAllUser] = useState();
  
  async function getAllUser(){
    let res = await getAllUserInfo();
    setAllUser(res?.data?.data);
  }
  useEffect(()=>{
    getAllUser();
  },[])

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Users</h1>
          <p className="text-gray-500 text-base">
            Manage and monitor all registered users
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
            <option>All</option>
            <option>Admin</option>
            <option>User</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <TableHead />

            <tbody className="text-gray-700">

              {allUser?.map((user,idx) =>{
                return <TableRow user={user} key={idx} />
              })}

            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            Showing{" "}
            <span className="font-medium text-gray-800">1–10</span> of{" "}
            <span className="font-medium text-gray-800">50</span> users
          </p>

          <button className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition">
            Show more
          </button>
        </div>

      </div>
    </div>
  );
}

export default AllUsersInfo;