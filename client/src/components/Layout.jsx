import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./Index.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
