import { Heading } from "./Index.jsx";
import { stripe_logo, razorpay_logo } from "../../assets/Index.jsx";

function CartTotal({
  subTotal,
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="w-full pt-10 lg:pt-24">
      <Heading
        textGray="CART"
        textBlack="TOTALS"
        fontSize="text-xl sm:text-2xl"
      />

      <p className="flex justify-between border-b border-gray-300 py-2 text-sm sm:text-base">
        <span>Subtotal</span>
        <span>₹{subTotal.toFixed(2)}</span>
      </p>

      <p className="flex justify-between border-b border-gray-300 py-2 text-sm sm:text-base">
        <span>Shipping Fee</span>
        <span>₹100.00</span>
      </p>

      <p className="flex justify-between py-2 text-base sm:text-lg">
        <span>
          <b>Total</b>
        </span>
        <span>
          <b>₹{(subTotal + 100).toFixed(2)}</b>
        </span>
      </p>

      <Heading
        textGray="PAYMENT"
        textBlack="METHODS"
        fontSize="text-xl sm:text-2xl"
      />

      <div className="w-full flex flex-col sm:flex-row gap-4 mb-8">
        {/* Stripe */}
        <div className="flex-1 flex items-center gap-3 border border-gray-500 px-4 py-3">
          <input
            id="stripe"
            type="radio"
            value="stripe"
            checked={paymentMethod === "stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="cursor-pointer"
          />

          <label htmlFor="stripe" className="cursor-pointer">
            <img
              src={stripe_logo}
              alt="Stripe"
              className="h-6 sm:h-8 object-contain"
            />
          </label>
        </div>

        {/* Razorpay */}
        <div className="flex-1 flex items-center gap-3 border border-gray-500 px-4 py-3">
          <input
            id="razorpay"
            type="radio"
            value="razorpay"
            checked={paymentMethod === "razorpay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="cursor-pointer"
          />

          <label htmlFor="razorpay" className="cursor-pointer">
            <img
              src={razorpay_logo}
              alt="Razorpay"
              className="h-6 sm:h-8 object-contain"
            />
          </label>
        </div>

        {/* COD */}
        <div className="flex-1 flex items-center gap-3 border border-gray-500 px-4 py-3">
          <input
            id="cashondelivery"
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="cursor-pointer"
          />

          <label
            htmlFor="cashondelivery"
            className="cursor-pointer text-sm sm:text-base"
          >
            CASH ON DELIVERY
          </label>
        </div>
      </div>

      <div className="w-full text-center sm:text-right">
        <button
          type="submit"
          form="deliveryAddressForm"
          className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-black text-white"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default CartTotal;