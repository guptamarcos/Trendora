import { NavLink } from "react-router-dom";
import { FaUser, FaBox, FaSignOutAlt } from "react-icons/fa";
import { forwardRef} from "react";

const UserDropDown = forwardRef((props, ref) => {
  return (
    <div className="absolute right-2 top-14 w-56 p-4 flex flex-col bg-white rounded-xl border border-gray-200 shadow-lg z-50"
      ref={ref}>
      {/* User Info */}
      <div className="border-b pb-3 mb-3">
        <p className="font-semibold text-gray-800">Demo</p>
        <p className="text-sm text-gray-500 truncate">Demo@email.com</p>
      </div>

      {/* Links */}
      <NavLink
        to="/trendora/profile" className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-md text-base transition ${
            isActive
              ? "bg-gray-100 text-black"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }`
        }
      >
        <FaUser />
        Profile
      </NavLink>

      <NavLink
        to="/trendora/allorders"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-md text-base transition ${
            isActive
              ? "bg-gray-100 text-black"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }`
        }
      >
        <FaBox />
        My Orders
      </NavLink>

      {/* Logout */}
      <button className="flex items-center gap-2 p-2 rounded-md text-base text-red-500 hover:bg-red-100 transition">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
});

export default UserDropDown;
