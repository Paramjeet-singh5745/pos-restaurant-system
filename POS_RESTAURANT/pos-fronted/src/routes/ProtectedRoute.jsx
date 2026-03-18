import { Navigate } from "react-router-dom";
import { isRestaurantLoggedIn, isEmployeeLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isRestaurantLoggedIn() && !isEmployeeLoggedIn()) {
    // Neither restaurant nor employee logged in
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;