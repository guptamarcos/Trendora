import "./App.css";
import { Home, AllOrders, Cart, Layout,About,Collection,Contact,Login,Signup,ProductInfo,Profile,DeliveryDetail, Wishlist } from "./components/Index.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        // SETTING UP HOME ROUTE TO THE /trendora INSTEAD OF /
        <Route path="/" element={<Navigate to="/trendora" replace />} />

        <Route path="/trendora" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="collection" element={<Collection/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="productInfo" element={<ProductInfo/>}/>
          <Route path="deliveryDetail" element={<DeliveryDetail/>}/>
          <Route path="allOrders" element={<AllOrders/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="wishlist" element={<Wishlist/>} />
        </Route>
        
        <Route path="/trendora/signup" element={<Signup/>}/>
        <Route path="/trendora/login" element={<Login/>}/>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
