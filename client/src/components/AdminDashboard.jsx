import { useState, useEffect } from "react";
import { getDashboardInfo } from "../api/adminApi.js";
import { toast } from "react-toastify";
import { AdminDashboardSkeleton } from "./skeletons/Index.jsx";

function InformationTabs({ text, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {text}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-gray-800">
        {value ?? 0}
      </h2>
    </div>
  );
}

function RecentActivity({ text, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
      <p className="text-sm font-medium text-gray-700">
        {text}
      </p>

      <span className="text-sm font-medium text-gray-500">
        {value}
      </span>
    </div>
  );
}

function AdminDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  async function fetchDashboardInfo() {
    try {
      setLoading(true);

      const res =
        await getDashboardInfo();

      setDashboard(
        res?.data?.DashboardInfo
      );
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Overview of your platform
          </p>
        </div>

        {/* STATS */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <InformationTabs
            text="Total Users"
            value={
              dashboard?.totalUsers
            }
          />

          <InformationTabs
            text="Total Products"
            value={
              dashboard?.totalProducts
            }
          />

          <InformationTabs
            text="Orders"
            value={
              dashboard?.totalOrders
            }
          />

          <InformationTabs
            text="Revenue"
            value={`₹ ${
              dashboard?.revenue || 0
            }`}
          />
        </section>

        {/* MIDDLE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Activity
              </h2>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                Live Updates
              </span>
            </div>

            <div className="space-y-4">
              <RecentActivity
                text="New user registered"
                value={
                  dashboard?.totalUsers ===
                  0
                    ? dashboard?.latestUser
                    : `${dashboard?.latestUser} ago`
                }
              />

              <RecentActivity
                text="Last order placed"
                value={
                  dashboard?.totalOrders ===
                  0
                    ? dashboard?.latestOrder
                    : `${dashboard?.latestOrder} ago`
                }
              />

              <RecentActivity
                text="Product added"
                value={
                  dashboard?.totalProducts ===
                  0
                    ? dashboard?.latestProduct
                    : `${dashboard?.latestProduct} ago`
                }
              />
            </div>
          </div>

          {/* QUICK SUMMARY */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Summary
            </h2>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span>Total Users</span>

                <span className="font-semibold text-gray-800">
                  {
                    dashboard?.totalUsers
                  }
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span>Total Products</span>

                <span className="font-semibold text-gray-800">
                  {
                    dashboard?.totalProducts
                  }
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span>Total Orders</span>

                <span className="font-semibold text-gray-800">
                  {
                    dashboard?.totalOrders
                  }
                </span>
              </div>

              <div className="flex justify-between">
                <span>Revenue</span>

                <span className="font-semibold text-gray-800">
                  ₹
                  {dashboard?.revenue ||
                    0}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;