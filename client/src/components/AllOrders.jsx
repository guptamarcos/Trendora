import { OrderCard } from "./Index.jsx";
import { useEffect, useState } from "react";
import { getUserOrder } from "../api/orderApi.js";
import { toast } from "react-toastify";
import Loader from "./loaders/Loader.jsx";

function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getUserOrderInfo() {
    try {
      setLoading(true);
      const res = await getUserOrder();
      setAllOrders(res?.data?.orders);
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrderInfo();
  }, []);
  
  if(loading){
    return <Loader/>;
  }
  
  return (
    <main className="min-h-screen pt-16">
      <h2 className="text-3xl font-semibold mb-8 flex  items-center">
        <span className="text-gray-600">MY</span>&nbsp;ORDERS &nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      {/* ALL PRODUCTS INFORMATION */}
      <div className="flex flex-col justify-between items-center border-t-2 border-gray-200">
        {allOrders?.length > 0 &&
          allOrders?.map((order, idx) => {
            return <OrderCard order={order} key={order._id} />;
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

export default AllOrders;
