import "./App.css";
import {
  Home, AllOrders, Cart, Layout, About, Collection, Contact, Login, Signup, ProductInfo, Profile,
  DeliveryDetail, Wishlist, AdminPageLayout, AdminDashboard, AllUsersInfo, AdminProductInfo, AdminOrderInfo,
  AdminAddProduct, AdminProductInfoEditForm, AdminEditProduct
} from "./components/Index.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* SETTING UP HOME ROUTE TO THE "/trendora" INSTEAD OF "/" */}
        <Route path="/" element={<Navigate to="/trendora" replace />} />

        <Route path="/trendora" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products/:productId" element={<ProductInfo />} />
          <Route path="deliveryDetail" element={<DeliveryDetail />} />
          <Route path="allOrders" element={<AllOrders />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route path="/trendora" element={<AdminPageLayout />}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="allUsers" element={<AllUsersInfo />} />
          <Route path="allProducts" element={<AdminProductInfo />} />
          <Route path="allOrdersInfo" element={<AdminOrderInfo />} />
          <Route path="addProduct" element={<AdminAddProduct/>} />
          <Route path="editProductInfo" element={<AdminProductInfoEditForm/>} />
          <Route path="admin/profile" element={<Profile/>} />
          <Route path="admin/:productId/edit" element={<AdminEditProduct/>} />

        </Route>

        <Route path="/trendora/signup" element={<Signup />} />
        <Route path="/trendora/login" element={<Login />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
