import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const RestaurantForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      setLoading(true);
      await api.post("/forgot-password", { email: email.trim().toLowerCase() });
      setMessage("Password reset link sent to your email!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Enter your email to receive a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Restaurant Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        <p className="text-center text-gray-400 text-sm mt-5">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </section>
  );
};

export default RestaurantForgotPassword;