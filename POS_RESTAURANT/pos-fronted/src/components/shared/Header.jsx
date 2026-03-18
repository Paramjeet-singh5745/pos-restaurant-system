import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {
  clearAuth,
  isRestaurantLoggedIn,
  isEmployeeLoggedIn,
  getEmployeeName,
  getEmployeeRole,
} from "../../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [restaurantName, setRestaurantName] = useState("Restaurant");
  const [ownerName, setOwnerName] = useState("Owner"); // ✅ NEW

  /* ================= LOGIN TYPE ================= */
  const isEmployee = isEmployeeLoggedIn();
  const isRestaurant = !isEmployee && isRestaurantLoggedIn();

  /* ================= USER INFO ================= */
  const employeeName = getEmployeeName();
  const employeeRole = getEmployeeRole();

  /* ================= DISPLAY FIX ================= */
  const displayName = isEmployee
    ? employeeName || "Employee"
    : ownerName || "Owner";

  const displayRole = isEmployee
    ? employeeRole || "Staff"
    : "Owner";

  /* ================= FETCH RESTAURANT ================= */
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await api.get("/restaurant/details");

        setRestaurantName(res.data.restaurant_name);
        setOwnerName(res.data.owner_name); // ✅ IMPORTANT
      } catch (err) {
        console.error(err);
      }
    };

    if (isEmployee || isRestaurant) {
      fetchRestaurant();
    }
  }, [isEmployee, isRestaurant]);

  /* ================= NAVIGATION ================= */
  const handleClickLogoOrName = () => {
    if (isEmployee) {
      switch (employeeRole) {
        case "ADMIN":
          navigate("/home");
          break;
        case "CASHIER":
          navigate("/payments");
          break;
        case "WAITER":
          navigate("/tables");
          break;
        case "KITCHEN_CHEF":
          navigate("/kitchen");
          break;
        default:
          navigate("/home");
      }
    } else {
      navigate("/home");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    clearAuth();
    if (isEmployee) {
      navigate("/employee-login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111] border-b border-[#2a2a2a] shadow-md">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">

        {/* LEFT SIDE */}
        <div
          onClick={handleClickLogoOrName}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          
          {/* Always show restaurant name on left */}
          <h1 className="text-lg sm:text-xl font-semibold text-white">
            {restaurantName}
          </h1>
        </div>

        {/* DESKTOP PROFILE */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <FaUserCircle className="text-white text-3xl" />

              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-white truncate max-w-[150px]">
                  {displayName}
                </h2>

                <span className="text-xs px-2 py-1 rounded bg-[#2a2a2a] text-gray-300">
                  {displayRole}
                </span>
              </div>
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-red-600 rounded-lg transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-[#2a2a2a] px-4 py-4 space-y-4">

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-white text-3xl" />

            <div className="min-w-0">
                <h2 className="text-sm font-semibold text-white">{displayName}</h2>

              <p className="text-xs text-gray-400">
                {displayRole}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;