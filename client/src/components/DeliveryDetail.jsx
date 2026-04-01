import { stripe_logo, razorpay_logo } from "../assets/Index.jsx";
import { DeliveryForm } from "./Index.jsx";
import { useState } from "react";

function Heading({ textGray, textBlack, fontSize }) {
  return (
    <h2 className={`my-8 flex items-center font-semibold ${fontSize}`}>
      <span className="text-gray-500">{textGray}</span>&nbsp;
      <span>{textBlack}</span> &nbsp;
      <hr className="w-[20%] border-t-2 border-black" />
    </h2>
  );
}

function DeliveryDetail() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <section className="min-h-screen flex justify-between gap-30">
      {/* DELIVERY ADDRESSING DETAIL */}
      <div className="w-[35%] pt-8">
        <Heading textGray="DELIVERY" textBlack="INFORMATION" fontSize="text-3xl"/>
        <DeliveryForm paymentMethod={paymentMethod} />
      </div>

      {/* SHOPPING CART TOTALS */}
      <div className="w-[50%] pt-24">
        <Heading textGray="CART" textBlack="TOTALS" fontSize="text-2xl" />
        <p className="flex justify-between border-b border-gray-300 py-2">
          <span>Subtotal</span>
          <span>$60.00</span>
        </p>
        <p className="flex justify-between border-b border-gray-300 py-2">
          <span>Shipping Fee</span>
          <span>$10.00</span>
        </p>
        <p className="flex justify-between py-2 text-base">
          <span>
            <b>Total</b>
          </span>
          <span>$70.00</span>
        </p>

        <Heading textGray="PAYMENT" textBlack="METHODS" fontSize="text-2xl" />

        <div className="h-[6vh] mb-8 w-full flex gap-4">
          <div className="flex-1 flex items-center gap-2 border border-gray-500 px-4">
            <input
              type="radio" id="stripe" value="stripe" 
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="cursor-pointer"
            ></input>
            <label htmlFor="stripe">
              <img src={stripe_logo} alt="Stripe Logo" className="h-[4vh] cursor-pointer"
              ></img>
            </label>
          </div>

          <div className="flex-1 flex items-center gap-2 border border-gray-500 px-4">
            <input
              type="radio" id="razorpay" value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="cursor-pointer"
            ></input>
            <label htmlFor="razorpay">
              <img src={razorpay_logo} alt="Razorpay Logo" className="h-[4vh] cursor-pointer"></img>
            </label>
          </div>

          <div className="flex-1 flex items-center gap-2 border border-gray-500 px-4">
            <input
              type="radio" id="cashondelivery"
              value="cod" checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="cursor-pointer"
            ></input>
            <label htmlFor="cashondelivery" className="cursor-pointer">
              CASH ON DELIVERY
            </label>
          </div>
        </div>

        <div className="w-full text-right">
          <button type="submit" form="deliveryAddressForm" className="px-8 py-2 bg-black text-gray-100">
            PLACE ORDER
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeliveryDetail;
