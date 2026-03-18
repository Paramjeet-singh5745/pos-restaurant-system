const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1d";

/**
 * Generate JWT token (FIXED)
 */
const generateToken = (payload) => {
  if (!payload) throw new Error("Payload is required for token generation");

  let finalPayload = {};

  // Restaurant/Admin login
  if (payload.restaurant_id && payload.role === "ADMIN") {
    finalPayload = {
      restaurant_id: payload.restaurant_id,
      role: "ADMIN",
    };
  }
  // Employee login
  else if (payload.user_id && payload.role) {
    finalPayload = {
      user_id: payload.user_id,      // ✅ include user_id
      restaurant_id: payload.restaurant_id, // ✅ include restaurant_id
      role: payload.role.toUpperCase(),
    };
  } else {
    throw new Error("Invalid payload for token");
  }

  return jwt.sign(finalPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token missing");
  }

  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};