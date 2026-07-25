import { Heading } from "./Index.jsx";
import { stripe_logo, razorpay_logo } from "../../assets/Index.jsx";

function CartTotal({subTotal,paymentMethod,setPaymentMethod}) {
  return (
    <div className="w-[50%] pt-24">
      <Heading textGray="CART" textBlack="TOTALS" fontSize="text-2xl" />

      <p className="flex justify-between border-b border-gray-300 py-2">
        <span>Subtotal</span>
        <span>₹{subTotal.toFixed(2)}</span>
      </p>

      <p className="flex justify-between border-b border-gray-300 py-2">
        <span>Shipping Fee</span>
        <span>₹100.00</span>
      </p>

      <p className="flex justify-between py-2 text-base">
        <span>
          <b>Total</b>
        </span>
        <span>
          <b>₹{(subTotal + 100).toFixed(2)}</b>
        </span>
      </p>

      <Heading textGray="PAYMENT" textBlack="METHODS" fontSize="text-2xl" />

      <div className="h-[6vh] mb-8 w-full flex gap-4">
        {/* Stripe */}
        <div className="flex-1 flex items-center gap-2 border border-gray-500 px-4">
          <input
            id="stripe"
            type="radio"
            value="stripe"
            checked={paymentMethod === "stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="cursor-pointer"
          />

          <label htmlFor="stripe">
            <img
              src={stripe_logo}
              alt="Stripe"
              className="h-[4vh] cursor-pointer"
            />
          </label>
        </div>

        {/* Razorpay */}
        <div className="flex-1 flex items-center gap-2 border border-gray-500 px-4">
          <input
            id="razorpay"
            type="radio"
            value="razorpay"
            checked={paymentMethod === "razorpay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="cursor-pointer"
          />

          <label htmlFor="razorpay">
            <img
              src={razorpay_logo}
              alt="Razorpay"
              className="h-[4vh] cursor-pointer"
            />
          </label>
        </div>

        {/* COD */}
        <div className="flex-1 flex items-center gap-2 border border-gray-500 px-4">
          <input
            id="cashondelivery"
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="cursor-pointer"
          />

          <label htmlFor="cashondelivery" className="cursor-pointer">
            CASH ON DELIVERY
          </label>
        </div>
      </div>

      <div className="w-full text-right">
        <button
          type="submit"
          form="deliveryAddressForm"
          className="cursor-pointer px-8 py-2 bg-black text-white"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default CartTotal;
