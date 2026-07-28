import { FiBell, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi.js";
import { UserContext } from "../../context/Index.jsx";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import Loader from "../loaders/Loader.jsx";

function AdminNavbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      await logoutUser();
      getUser();
      toast.success("You have been logged out successfully");
      navigate("/trendora");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <header className="fixed top-0 left-0 w-full h-[10vh] bg-white border-b border-gray-200 z-50">
      <nav className="h-full flex justify-between items-center px-4 sm:px-6 lg:px-10">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <FiMenu size={26} />
          </button>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 tracking-wide">
            Trendora
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">

          <div className="relative pt-1">
            <button>
              <FiBell className="text-gray-700" size={22} />
            </button>

            <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] rounded-full px-1.5">
              3
            </span>
          </div>

          <NavLink to="/trendora/admin">
            <FiSettings className="text-gray-700" size={22} />
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-red-400 text-red-500 rounded-md px-2 sm:px-3 py-2 hover:bg-red-50 transition"
          >
            <FiLogOut size={18} />
            <span className="hidden sm:block">Logout</span>
          </button>

        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;