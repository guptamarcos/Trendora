import { useState, useEffect } from "react";
import { getDashboardInfo } from "../api/authApi.js";
import { toast } from "react-toastify";


function InformationTabs({ text, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-base text-gray-500">{text}</p>
      <h2 className="text-2xl font-semibold text-gray-800 mt-1">{value}</h2>
    </div>
  );
}

function RecentActivity({ text, value }) {
  return (
    <div className="flex justify-between">
      <p className="text-base">{text}</p>
      <span className="text-gray-500 text-base">{value}</span>
    </div>
  );
}


function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  async function dashboardInfo(){
    try{
      const res = await getDashboardInfo();
      console.log(res?.data?.DashboardInfo);
      setDashboard(res?.data?.DashboardInfo);
    }catch(err){
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  useEffect(()=>{
    dashboardInfo();
  },[]);

  return (
    <main className="max-w-6xl mx-auto flex-1 min-h-[90vh] p-8 bg-gray-100 space-y-6">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-base">Overview of your platform</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InformationTabs text="Total Users" value={dashboard?.totalUsers} />
        <InformationTabs text="Total Products" value={dashboard?.totalProducts} />
        <InformationTabs text="Orders" value={dashboard?.totalOrders} />
        <InformationTabs text="Revenue" value= {`₹ ${dashboard?.revenue}`} />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4 text-sm text-gray-700">
          <RecentActivity text="New user registered" value={`${dashboard?.latestUser} ago`} />
          <RecentActivity text={`Order #${dashboard?.id.slice(10,16)} placed`} value={`${dashboard?.latestOrder} ago`} />
          <RecentActivity text="Product added" value={`${dashboard?.latestProduct} ago`} />
         
        </div>
      </div>

      {/* QUICK SUMMARY */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>

        <p className="text-gray-600 text-base">
          Your platform is running smoothly. Monitor users, manage products, and
          track orders from this dashboard.
        </p>
      </div>
    </main>
  );
}

export default AdminDashboard;
