import "./App.css";
import {
  Home,
  Layout,
  Login,
  Signup,
  AdminDashboard,
} from "./components/Index.jsx";
import {
  Cart,
  AllOrders,
  About,
  Collection,
  Contact,
  ProductInfo,
  Profile,
  Checkout,
  Wishlist,
  AdminPageLayout,
  AdminUsersInfo,
  AdminProductInfo,
  AdminOrderInfo,
  AdminAddProduct,
  AdminEditProduct,
} from "./routes/LazyRoutes.jsx";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  UserProtectedRoutes,
  AdminProtectedRoutes,
  CheckUserAuth,
} from "./routes/ProtectedRoutes.jsx";
import { HomeSkeleton } from "./components/skeletons/Index.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* SETTING UP HOME ROUTE TO THE "/trendora" INSTEAD OF "/" */}
        <Route path="/" element={<Navigate to="/trendora" replace />} />

        <Route path="/trendora" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collections" element={<Collection />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products/:productId" element={<ProductInfo />} />

          <Route element={<UserProtectedRoutes />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Route>

        <Route path="/trendora/admin" element={<AdminPageLayout />}>
          <Route element={<AdminProtectedRoutes />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersInfo />} />
            <Route path="products" element={<AdminProductInfo />} />
            <Route path="products/new" element={<AdminAddProduct />} />
            <Route path="orders" element={<AdminOrderInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path=":productId/edit" element={<AdminEditProduct />} />
          </Route>
        </Route>

        <Route element={<CheckUserAuth />}>
          <Route path="/trendora/signup" element={<Signup />} />
          <Route path="/trendora/login" element={<Login />} />
        </Route>

        {/* <Route path="/skeleton" element={<ProductDetailsSkeleton />} /> */}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
