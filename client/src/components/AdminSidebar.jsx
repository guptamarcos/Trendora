import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiPlusSquare, FiUser } from "react-icons/fi";

function SidebarLink({ path, text, Icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
          : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
      }
    >
      <Icon size={20} />
      {text}
    </NavLink>
  );
}

function AdminSidebar() {
  return (
    <aside className="fixed w-64 min-h-[90vh] bg-white border-r border-gray-200 px-5 py-6">
      <nav className="flex flex-col gap-2 text-gray-800 font-medium">
        <NavLink
          to="/trendora/admin" end
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-lg gap-3 px-4 py-2 rounded-md text-purple-500 hover:bg-gray-100 "
              : "flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100"
          }>
          <FiHome size={20} />
          Dashboard
        </NavLink>

        <SidebarLink path="/trendora/allUsers" text="Users" Icon={FiUsers} />
        <SidebarLink path="/trendora/allProducts" text="Products" Icon={FiBox} />
        <SidebarLink path="/trendora/allOrdersInfo" text="Orders" Icon={FiShoppingCart} />
        <SidebarLink path="/trendora/addProduct" text="Add Product" Icon={FiPlusSquare}/>
        <SidebarLink path="/trendora/admin/profile" text="Profile" Icon={FiUser} />
      </nav>
    </aside>
  );
}

export default AdminSidebar;
