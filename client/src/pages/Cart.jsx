import { getCartItems } from "../api/cartApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/loaders/Loader.jsx";
import CartList from "../components/cart/CartList.jsx";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await getCartItems();
      setCartItems(res?.data?.data?.cart || []);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item?.product?.price || 0;
    const qty = item?.quantity || 1;
    return acc + price * qty;
  }, 0);

  const shippingFee = subtotal > 0 ? 100 : 0;
  const total = subtotal + shippingFee;

  if (loading) {
    return <Loader />;
  }

  return (
    <CartList cartItems={cartItems} fetchCartItems={fetchCartItems}/>
  );
}

export default Cart;
