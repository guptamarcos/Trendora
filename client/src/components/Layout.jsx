import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./Index.jsx";

function Layout() {
  return (
    <main className="min-h-screen max-w-screen px-[7.5vw]">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default Layout;
