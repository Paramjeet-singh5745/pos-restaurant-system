import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordEmployee = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // 👈 NEW

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/employees/reset-password-employee/${token}`,
        { newPassword }
      );

      // 👇 SHOW MODAL INSTEAD OF ALERT
      setSuccessModal(true);

      // Auto redirect after 2 sec
      setTimeout(() => {
        navigate("/employee-login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      
      {/* ================= CARD ================= */}
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your new password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PASSWORD */}
          <div className="relative">
            <label className="block text-gray-400 mb-2 text-sm font-medium">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value.trimStart(),
                })
              }
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
            />

            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value.trimStart(),
                })
              }
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {/* ERROR */}
          {error && (
            <p className="mt-4 text-red-400 text-center">{error}</p>
          )}
        </form>
      </div>

      {/* ================= SUCCESS MODAL ================= */}
      {successModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 w-[90%] max-w-sm text-center shadow-2xl animate-fadeIn">
            
            <div className="text-green-400 text-5xl mb-4">✔</div>

            <h2 className="text-xl font-bold text-white mb-2">
              Password Reset Successful
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Your password has been updated successfully.
            </p>

            <button
              onClick={() => navigate("/employee-login")}
              className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResetPasswordEmployee;