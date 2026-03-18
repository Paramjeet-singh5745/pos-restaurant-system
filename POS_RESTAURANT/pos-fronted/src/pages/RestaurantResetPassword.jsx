import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../utils/api";

const RestaurantResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // get JWT from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/reset-password", { token, newPassword: password });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid or missing token.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default RestaurantResetPassword;