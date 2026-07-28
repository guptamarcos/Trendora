import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "./adminLayout/AdminNavbar.jsx";
import AdminSidebar from "./adminLayout/AdminSidebar.jsx";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-gray-100">
      <AdminNavbar setSidebarOpen={setSidebarOpen} />

      <div className="pt-[10vh]">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="lg:pl-64 p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;