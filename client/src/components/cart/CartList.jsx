import CartItem from "./CartItem.jsx";
import { Link } from "react-router-dom";

function PriceTotal({ text, price }) {
  return (
    <p className="flex justify-between border-b border-gray-300 py-2">
      <span>{text}</span>
      <span>₹{price.toFixed(2)}</span>
    </p>
  );
}

function CartItemsList({
  cartItems,
  fetchCartItems,
  subtotal,
  shippingFee,
  total,
}) {
  const isCartEmpty = cartItems?.length === 0;

  return (
    <main className="min-h-screen pt-10 sm:pt-16 mb-20 sm:mb-32">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 flex items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;CART&nbsp;
        <hr className="w-10 sm:w-[5%] border-t-2 border-black" />
      </h2>

      <div className="flex flex-col border-t-2 border-gray-200">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            cartItem={item}
            getUserCartItems={fetchCartItems}
          />
        ))}
      </div>

      {isCartEmpty && (
        <h2 className="text-center mt-10 text-gray-500 text-lg">
          No items added yet
        </h2>
      )}

      {!isCartEmpty && (
        <div className="flex flex-col lg:flex-row mt-8">
          <div className="hidden lg:block flex-1" />

          <div className="w-full lg:flex-1 lg:text-right">
            <h2 className="my-8 flex items-center justify-start lg:justify-end font-semibold text-xl sm:text-2xl">
              <span className="text-gray-500">CART</span>&nbsp;TOTALS
              <hr className="w-16 sm:w-[20%] border-t-2 border-black ml-2" />
            </h2>

            <PriceTotal text="Subtotal" price={subtotal} />
            <PriceTotal text="Shipping Fee" price={shippingFee} />

            <p className="flex justify-between py-2 text-base font-semibold">
              <span>Total</span>
              <span>₹{total?.toFixed(2)}</span>
            </p>

            <Link
              to="/trendora/checkout"
              className="inline-block w-full sm:w-auto text-center mt-6 px-8 py-3 bg-black text-gray-100 hover:bg-gray-800 transition"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartItemsList;