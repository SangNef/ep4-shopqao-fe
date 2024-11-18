import React, { useEffect, useState } from "react";
import { getDashboard } from "../../../api/dashboard";
import { ShoppingCartOutlined, MoneyCollectOutlined, UnorderedListOutlined, FileDoneOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchDashboardData();

    document.title = "XShop - Admin Dashboard";
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Total Sold Products */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Total Sold Products</h2>
            <ShoppingCartOutlined className="text-blue-600 text-3xl" />
          </div>
          <p className="text-4xl font-bold text-blue-600">
            {dashboardData ? dashboardData.totalSoldProducts : "Loading..."}
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Total Revenue</h2>
            <MoneyCollectOutlined className="text-green-600 text-3xl" />
          </div>
          <p className="text-4xl font-bold text-green-600">
            {dashboardData
              ? `$${dashboardData.totalRevenue.toLocaleString()}`
              : "Loading..."}
          </p>
        </div>

        {/* Total Products */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Total Products</h2>
            <UnorderedListOutlined className="text-yellow-500 text-3xl" />
          </div>
          <p className="text-4xl font-bold text-yellow-500">
            {dashboardData ? dashboardData.totalProducts : "Loading..."}
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Total Orders</h2>
            <FileDoneOutlined className="text-purple-500 text-3xl" />
          </div>
          <p className="text-4xl font-bold text-purple-500">
            {dashboardData ? dashboardData.totalOrders : "Loading..."}
          </p>
        </div>

        {/* Minimum Sold Product */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Minimum Sold Product</h2>
            <ArrowDownOutlined className="text-red-500 text-3xl" />
          </div>
          <p className="text-3xl font-bold text-red-500">
            {dashboardData ? dashboardData.minSoldProduct : "Loading..."}
          </p>
        </div>

        {/* Maximum Sold Product */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Maximum Sold Product</h2>
            <ArrowUpOutlined className="text-green-600 text-3xl" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {dashboardData ? dashboardData.maxSoldProduct : "Loading..."}
          </p>
        </div>
      </div>

      {/* Additional Information Section */}
    </div>
  );
};

export default Dashboard;
