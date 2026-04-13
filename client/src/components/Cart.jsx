import { CartItem } from "./Index.jsx";
import { Link } from "react-router-dom";
import { getCartItems } from "../api/cartApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function PriceTotal({ text, price }) {
  return (
    <p className="flex justify-between border-b border-gray-300 py-2">
      <span>{text}</span>
      <span>${price}</span>
    </p>
  );
}

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const res = await getCartItems();
      setCartItems(res?.data?.data?.cart || []);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const isCartEmpty = cartItems?.length === 0;

  return (
    <section className="min-h-screen pt-16 mb-32">
      {/* HEADER */}
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;CART&nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      {/* CART ITEMS */}
      <div className="flex flex-col border-t-2 border-gray-200">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            cartItem={item}
            getUserCartItems={fetchCartItems}
          />
        ))}
      </div>

      {/* EMPTY STATE */}
      {isCartEmpty && (
        <h2 className="text-center mt-10 text-gray-500">
          No items added yet
        </h2>
      )}

      {/* CART TOTAL */}
      {!isCartEmpty && (
        <div className="flex mt-8">
          <div className="flex-1" />

          <div className="flex-1 text-right">
            <h2 className="my-8 flex items-center font-semibold text-2xl justify-end">
              <span className="text-gray-500">CART</span>&nbsp;TOTALS
              <hr className="w-[20%] border-t-2 border-black ml-2" />
            </h2>

            <PriceTotal text="Subtotal" price={60.0} />
            <PriceTotal text="Shipping Fee" price={10.0} />

            <p className="flex justify-between py-2 text-base font-semibold">
              <span>Total</span>
              <span>$70.00</span>
            </p>

            <Link
              to="/trendora/deliveryDetail"
              className="inline-block mt-6 px-8 py-2 bg-black text-gray-100"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;