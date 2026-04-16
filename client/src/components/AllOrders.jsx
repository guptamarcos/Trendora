import { OrderCard } from "./Index.jsx";
import { useEffect, useState } from "react";
import { getUserOrder } from "../api/orderApi.js";
import { toast } from "react-toastify";

function AllOrders() {
  async function getUserOrderInfo(){
    try{
      const res = await getUserOrder();
      console.log(res?.data?.userOrders);
    }catch(err){
      const message = err?.response?.data?.message;
      toast.error(message);
    }
  }

  useEffect(()=>{
    getUserOrderInfo();
  },[])

  return (
    <section className="min-h-screen pt-16">
        {/* MY ORDERS HEADING  */}
      <h2 className="text-3xl font-semibold mb-8 flex  items-center">
        <span className="text-gray-600">MY</span>&nbsp;ORDERS &nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>
        
        {/* ALL PRODUCTS INFORMATION */}
      <div className="flex flex-col justify-between items-center border-t-2 border-gray-200">
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
      </div>
    </section>
  );
}

export default AllOrders;
