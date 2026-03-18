const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const restaurantId = decoded.restaurant_id || decoded.id;

    if (!restaurantId) {
      return res.status(401).json({
        message: "Invalid token or ID missing",
      });
    }

    // ✅ 🔥 ROLE FIX
    let role = decoded.role;

    if (role === "RESTAURANT") {
      role = "ADMIN";
    }

    if (!role && decoded.restaurant_id) {
      role = "ADMIN";
    }

req.user = {
  user_id: decoded.user_id,         // ✅ employee ID
  restaurant_id: decoded.restaurant_id,
  role: decoded.role?.toUpperCase(),
};


    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;