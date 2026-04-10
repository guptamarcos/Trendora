import { FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi.js";
import { UserContext } from "../context/Index.jsx";
import { toast } from "react-toastify";
import { useContext } from "react";


function AdminNavbar() {

  const navigate = useNavigate();

  const { getUser } = useContext(UserContext);
  async function logout() {
    try {
      const res = await logoutUser();
      getUser();
      toast.success("You have been logged out successfully");
      navigate("/trendora");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className="fixed h-[10vh] min-w-full bg-white border-b border-gray-200">
      <nav className="h-full flex justify-between items-center px-16">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
          Trendora
        </h1>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="pt-2 relative">
            <button>
              <FiBell size={24} className="text-gray-700 cursor-pointer" />
            </button>
            <span className="absolute top-0 -right-2 bg-black text-white text-[10px] rounded-full px-1.5 py-[1px]">
              3
            </span>
          </div>

          {/* Settings */}
          <NavLink to="/trendora/admin">
            <FiSettings size={24} className="text-gray-700" />
          </NavLink>

          {/* 🔥 Logout UI (no logic) */}
          <button onClick={logout} className="flex items-center gap-2 cursor-pointer text-red-500 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50">
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;
