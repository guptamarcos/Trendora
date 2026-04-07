import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiShoppingCart,FiPlusSquare } from "react-icons/fi";

function AdminSidebar() {
  return (
    <aside className="fixed w-64 min-h-[90vh] bg-white border-r border-gray-200 px-5 py-6">
      <nav className="flex flex-col gap-2 text-gray-800 font-medium">
        <NavLink
          to="/trendora/admin"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
              : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
          }
          end="/trendora"
        >
          <FiHome size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/trendora/allUsers"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
              : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
          }
        >
          <FiUsers size={20} />
          Users
        </NavLink>

        <NavLink
          to="/trendora/allProducts"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
              : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
          }
        >
          <FiBox size={20} />
          Products
        </NavLink>

        <NavLink
          to="/trendora/allOrdersInfo"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
              : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
          }
        >
          <FiShoppingCart size={20} />
          Orders
        </NavLink>

        <NavLink
          to="/trendora/addProduct"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
              : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
          }
        >
          <FiPlusSquare size={20} />
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
