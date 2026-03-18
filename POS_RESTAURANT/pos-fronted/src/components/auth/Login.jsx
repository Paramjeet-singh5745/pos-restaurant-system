import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setEmployeeAuth } from "../../utils/auth";
import { Eye, EyeOff } from "lucide-react"; // For password toggle

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trimStart(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowError(false);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://pos-restaurant-system.onrender.com/api/employees/login/`,
        formData
      );

      // Set auth safely
      try {
        setEmployeeAuth(
          res.data.token,
          res.data.user?.user_id,
          res.data.user?.full_name,
          res.data.user?.role
        );
      } catch (e) {
        console.error("setEmployeeAuth error:", e);
      }

      // Normalize role to uppercase
      const role = res.data?.user?.role?.toUpperCase();

      switch (role) {
        case "ADMIN":
          navigate("/home", { replace: true });
          break;
        case "WAITER":
          navigate("/tables", { replace: true });
          break;
        case "CASHIER":
          navigate("/payments", { replace: true });
          break;
        case "KITCHEN_CHEF":
          navigate("/kitchen", { replace: true });
          break;
        default:
          console.error("Unknown role:", role);
          setError("Your role is not recognized");
          setShowError(true);
          break;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
        <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Employee Login</h1>
            <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-yellow-400 transition pr-12"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <Link
                to="/forgot-password-employee"
                className="text-sm text-yellow-400 hover:text-yellow-500 transition"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <div className="bg-[#2a2a2a] p-6 rounded-2xl text-center w-full max-w-sm">
            <h2 className="text-red-400 text-lg mb-2 font-bold">❌ Login Failed</h2>
            <p className="text-gray-300 mb-4 text-sm">{error}</p>
            <button
              onClick={() => setShowError(false)}
              className="w-full py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-semibold text-gray-900 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;