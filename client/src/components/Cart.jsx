import { CartItem } from "./Index.jsx";
import { Link } from "react-router-dom";

function PriceTotal({text,price}){
  return (
    <p className="flex justify-between border-b border-gray-300 py-2">
      <span>{text}</span>
      <span>${price}</span>
    </p>
  )
};

function Cart() {
  return (
    <section className="min-h-screen pt-16 mb-32">
      
      {/* MY ORDERS HEADING  */}
      <h2 className="text-3xl font-semibold mb-8 flex  items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;CART&nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      {/* ALL PRODUCTS INFORMATION */}
      <div className="flex flex-col justify-between items-center border-t-2 border-gray-200">
        <CartItem />
        <CartItem />
       
      </div>

      {/* CART TOTALS */}
      <div className="flex mt-8">

        <span className="flex-1"></span>

        <div className="flex-1 text-right">

          <h2 className="my-8 flex items-center font-semibold text-2xl">
            <span className="text-gray-500">CART</span>&nbsp;<span>TOTALS</span>{" "}
            &nbsp;
            <hr className="w-[20%] border-t-2 border-black" />
          </h2>

          <PriceTotal text="Subtotal" price={60.00}/>
          <PriceTotal text="Shipping Fee" price={10.00}/>
          
          <p className="flex justify-between py-2 text-base">
            <span><b>Total</b></span>
            <span>$70.00</span>
          </p>

          <button className="text-right mt-6 ">
            <Link to="/trendora/deliveryDetail" className="px-8 py-2 bg-black text-gray-100">
              PROCEED TO CHECKOUT
            </Link>
          </button>

        </div>

      </div>

    </section>
  );
}

export default Cart;
