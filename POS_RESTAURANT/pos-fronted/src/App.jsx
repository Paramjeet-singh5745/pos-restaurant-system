import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* ================= PAGES ================= */
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import Payemnt from "./pages/Payemnt";
import More from "./pages/More";

/* ============ ADMIN (MORE) ============ */
import UserDetails from "./components/more/UserDetails";
import MenuManagement from "./components/more/MenuManagement";
import Inventory from "./components/more/Inventory";

/* ================= SHARED ================= */
import Header from "./components/shared/Header";
import RestaurantRegister from "./pages/RestaurantRegister";
import RestaurantLogin from "./pages/RestaurantLogin";

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from "./routes/ProtectedRoute";

import { CartProvider } from "./components/context/CartContext";

/* ================= UTILS ================= */
import { isRestaurantLoggedIn,isEmployeeLoggedIn } from "./utils/auth";

import KitchenPage from "./pages/KitchenPage";
import Login from "./components/auth/Login";
import RestaurantForgotPassword from "./pages/RestaurantForgotPassword";
import RestaurantResetPassword from "./pages/RestaurantResetPassword";
import ForgotPasswordEmployee from "./components/auth/ForgotPasswordEmployee";
import ResetPasswordEmployee from "./components/auth/ResetPasswordEmployee";

/* ================= HEADER CONTROLLER ================= */
const HeaderController = () => {
  const location = useLocation();

    const hideHeaderRoutes = ["/", "/restaurant-register", "/employee-login","/restaurant-forgot-password","/reset-password","/forgot-password-employee","/reset-password-employee/:token"];
 const isLoggedIn = isRestaurantLoggedIn() || isEmployeeLoggedIn();
    
  if (!isLoggedIn || hideHeaderRoutes.includes(location.pathname)) {
    return null;
  }

  return <Header />;
};

/* ================= APP ================= */
function App() {
  return (
    <CartProvider>
      <Router>
        <HeaderController />

        <Routes>
          {/* ========== PUBLIC ========== */}
          <Route
            path="/"
            element={
              isRestaurantLoggedIn() ? (
                <Navigate to="/home" replace />
              ) : (
                <RestaurantLogin />
              )
            }
          />

           <Route
            path="/employee-login"
            element={
              <Login/>
            }
          />
           <Route
            path="/restaurant-forgot-password"
            element={
              <RestaurantForgotPassword/>
            }
          />
           <Route
            path="/reset-password"
            element={
              <RestaurantResetPassword/>
            }
          />
              <Route path="/forgot-password-employee" element={<ForgotPasswordEmployee />} />
        <Route path="/reset-password-employee/:token" element={<ResetPasswordEmployee />} />

          <Route path="/restaurant-register" element={<RestaurantRegister />} />

          {/* ========== HOME (MAIN ENTRY AFTER LOGIN) ========== */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ========== OTHER PAGES ========== */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tables"
            element={
              <ProtectedRoute>
                <Tables />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payemnt />
              </ProtectedRoute>
            }
          />

          <Route
            path="/menu/:tableId"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kitchen"
            element={
              <ProtectedRoute>
                <KitchenPage />
              </ProtectedRoute>
            }
          />

          {/* ========== MORE ========== */}
          <Route
            path="/more"
            element={
              <ProtectedRoute>
                <More />
              </ProtectedRoute>
            }
          />

          <Route
            path="/more/users"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/more/menu"
            element={
              <ProtectedRoute>
                <MenuManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/more/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          {/* ========== FALLBACK ========== */}
          <Route
            path="*"
            element={
              isRestaurantLoggedIn() ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;