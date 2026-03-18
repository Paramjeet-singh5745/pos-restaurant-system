
import React, { useEffect, useState, useCallback } from "react";
import api from "../utils/api";  // ✅ YOUR INTERCEPTOR FILE
import BottomNav from "../components/shared/BottomNav";
import Greeting from "../components/home/Greeting";

/* ✅ NEW AUTH (SUPPORT BOTH) */
import {
  getEmployeeAuth,
  getRestaurantAuth,
} from "../utils/auth";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { FaBoxOpen, FaLayerGroup } from "react-icons/fa";

/* ===============================
   STAT CARD COMPONENT
=================================*/
const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="bg-[#242424] p-5 rounded-2xl shadow-md border border-gray-700 hover:scale-[1.02] transition-all duration-300">
    <div className="flex justify-between items-center">
      <h3 className="text-xs sm:text-sm text-gray-400">{title}</h3>
      <div className="text-lg text-gray-300">{icon}</div>
    </div>
    <h2 className="text-xl sm:text-2xl font-bold mt-3">{value}</h2>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

/* ===============================
   MAIN HOME COMPONENT
=================================*/
const Home = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ✅ GET TOKEN (EMPLOYEE OR RESTAURANT) */
  const token = getEmployeeAuth() || getRestaurantAuth();

  /* ===============================
     FETCH DASHBOARD
  =================================*/
const fetchDashboard = async () => {
  try {
    const res = await api.get("/home");

    setDashboard(res.data); // ✅ FIXED
    setLoading(false);
  } catch (err) {
    console.error("Dashboard error:", err);

    if (err.response?.status === 401) {
      setError("Session expired. Please login again.");
    } else {
      setError("Failed to load dashboard");
    }

    setLoading(false);
  }
};

useEffect(() => {
  fetchDashboard();

  const interval = setInterval(fetchDashboard, 5000);

  return () => clearInterval(interval);
}, []);


  if (loading) {
    return (
      <div className="text-white p-10 text-center">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-10 text-center">
        {error}
      </div>
    );
  }

  /* ===============================
     PIE COLOR LOGIC
  =================================*/
  const getStatusColor = (name) => {
    switch (name) {
      case "PENDING":
        return "#facc15";
      case "PREPARING":
        return "#8b5cf6";
      case "COMPLETED":
      case "READY":
        return "#22c55e";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

return (
  <section className="bg-gradient-to-br from-[#1a1a1a] to-[#111] min-h-screen pb-20 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

      <Greeting />

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
        <StatCard
          title="Earnings Today"
          value={`₹ ${dashboard?.earningsToday}`}
          subtitle="Today's Revenue"
          icon={<BsCashCoin />}
        />
        <StatCard
          title="Total Earnings"
          value={`₹ ${dashboard?.earningsAll}`}
          subtitle="Overall Revenue"
          icon={<BsCashCoin />}
        />
        <StatCard
          title="Orders In Progress"
          value={dashboard?.inProgress}
          subtitle="Active Orders"
          icon={<GrInProgress />}
        />
        <StatCard
          title="Orders Today"
          value={dashboard?.ordersToday}
          subtitle="Today's Orders"
          icon={<FaBoxOpen />}
        />
      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-6">
        <StatCard
          title="Total Orders"
          value={dashboard?.ordersAll}
          subtitle="All Time Orders"
          icon={<FaBoxOpen />}
        />
        <StatCard
          title="Categories"
          value={dashboard?.totalCategories}
          subtitle="Menu Categories"
          icon={<FaLayerGroup />}
        />
        <StatCard
          title="Menu Items"
          value={dashboard?.totalItems}
          subtitle="Available Items"
          icon={<FaLayerGroup />}
        />
      </div>

      {/* ================= REVENUE ================= */}
      <div className="bg-[#202020] p-6 rounded-3xl mt-10 shadow-lg border border-gray-800">
        <h3 className="text-xl font-semibold mb-5">
          📊 Last 7 Days Revenue
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboard?.revenueChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ background: "#222", border: "none" }} />
            <Bar dataKey="total" fill="#22c55e" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PIE + LINE ================= */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* PIE */}
        <div className="bg-[#202020] p-6 rounded-3xl shadow-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-5">
            🍕 Order Status Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboard?.orderStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {dashboard?.orderStatus?.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={getStatusColor(entry.name)}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div className="bg-[#202020] p-6 rounded-3xl shadow-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-5">
            📈 Orders By Hour
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboard?.ordersByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="hour" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= TOP ITEMS ================= */}
      <div className="bg-[#202020] p-6 rounded-3xl mt-10 shadow-lg border border-gray-800">
        <h3 className="text-xl font-semibold mb-5">
          🔥 Top Selling Items
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboard?.topItems} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis type="number" stroke="#aaa" />
            <YAxis dataKey="name" type="category" stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="total" fill="#8b5cf6" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
    <BottomNav/>
  </section>
);
};

export default Home;