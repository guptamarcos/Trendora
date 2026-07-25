import OrderCard from "./OrderCard.jsx";
import { useState } from "react";
import Loader from "../loaders/Loader.jsx";

function OrderList({allOrders, getUserOrderInfo}) {
  const [loading,setLoading] = useState(false);

  if(loading){
    return <Loader/>;
  }
  return (
    <main className="h-screen pt-12 mb-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold mb-8 flex  items-center">
        <span className="text-gray-600">MY</span>&nbsp;ORDERS &nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      {/* ALL PRODUCTS INFORMATION */}
      <div className="flex flex-col justify-between items-center border-t-2 border-gray-200">
        {allOrders?.length > 0 &&
          allOrders?.map((order, idx) => {
            return <OrderCard order={order} key={order._id} getUserOrderInfo={getUserOrderInfo} setLoading={setLoading}/>;
          })}
        {!allOrders?.length && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-sm">You haven’t placed any orders yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderList;
