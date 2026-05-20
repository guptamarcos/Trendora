import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./Index.jsx";

function Layout() {
  return (
    <main className="min-h-screen w-full px-[7.5vw] pt-[10vh]">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default Layout;
