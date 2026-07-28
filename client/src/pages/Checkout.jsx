import {
  CartTotal,
  DeliveryForm,
  Heading,
} from "../components/checkout/Index.jsx";
import { useState, useEffect } from "react";
import { getCartItems } from "../api/cartApi.js";
import { toast } from "react-toastify";
import Loader from "../components/Loaders/Loader.jsx";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getUserCartItems() {
    try {
      const res = await getCartItems();
      setCartItems(res?.data?.data?.cart);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  useEffect(() => {
    getUserCartItems();
  }, []);

  const subTotal = cartItems.reduce((acc, val) => {
    const quantity = val?.quantity || 1;
    const price = val?.product?.price || 0;

    return acc + quantity * price;
  }, 0);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen mb-20 flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
      <div className="w-full lg:w-[35%] pt-8">
        <Heading
          textGray="DELIVERY"
          textBlack="INFORMATION"
          fontSize="text-2xl sm:text-3xl"
        />

        <DeliveryForm
          paymentMethod={paymentMethod}
          amount={subTotal + 100}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <div className="w-full lg:w-[50%]">
        <CartTotal
          subTotal={subTotal}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
    </section>
  );
}

export default Checkout;