import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiShoppingCart,
  FiPlusSquare,
  FiUser,
  FiX,
} from "react-icons/fi";

function SidebarLink({ path, text, Icon }) {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md text-base lg:text-lg transition ${
          isActive
            ? "text-purple-500 bg-gray-100"
            : "hover:bg-gray-100 text-gray-800"
        }`
      }
    >
      <Icon size={20} />
      {text}
    </NavLink>
  );
}

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-[10vh] left-0 h-[90vh] w-64 bg-white border-r border-gray-200 px-5 py-6 z-50 transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 font-medium">
          <SidebarLink path="/trendora/admin" text="Dashboard" Icon={FiHome} />
          <SidebarLink
            path="/trendora/admin/users"
            text="Users"
            Icon={FiUsers}
          />
          <SidebarLink
            path="/trendora/admin/products"
            text="Products"
            Icon={FiBox}
          />
          <SidebarLink
            path="/trendora/admin/orders"
            text="Orders"
            Icon={FiShoppingCart}
          />
          <SidebarLink
            path="/trendora/admin/products/new"
            text="Add Product"
            Icon={FiPlusSquare}
          />
          <SidebarLink
            path="/trendora/admin/profile"
            text="Profile"
            Icon={FiUser}
          />
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;
