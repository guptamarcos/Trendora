import { useEffect, useState } from "react";
import { getUserOrder } from "../api/orderApi.js";
import { toast } from "react-toastify";
import Loader from "../components/loaders/Loader.jsx";
import OrderList from "../components/orders/OrderList.jsx";

function UserOrders() {
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
    <OrderList allOrders={allOrders}/>
  );
}

export default UserOrders;
