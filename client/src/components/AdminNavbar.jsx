import { FiBell, FiUser, FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
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
          <NavLink to="/admin/settings">
            <FiSettings size={24} className="text-gray-700" />
          </NavLink>

          {/* Admin Profile */}
          <button className="p-2 rounded-full border border-gray-200">
            <FiUser size={18} className="text-gray-700 cursor-pointer" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;
