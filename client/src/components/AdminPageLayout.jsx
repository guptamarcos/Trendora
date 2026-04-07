import { Outlet } from "react-router-dom";
import { AdminNavbar, AdminSidebar } from "./Index.jsx";

function AdminPageLayout() {
  return (
    <main className="min-h-screen w-full bg-gray-100">
      {/* HEADER */}
      <AdminNavbar />

      {/* BODY */}
      <div className="pt-[10vh]">
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <div className="pl-64 ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminPageLayout;
