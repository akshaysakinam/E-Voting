const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userandadminauth = (requiredRole = null) => {
  return async (req, res, next) => {
    try {
      // Read token from cookies
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({ 
          msg: "Please login to access this resource",
          error: "No token provided"
        });
      }

      // Validate token
      const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decodedObj;

      // Find user by ID
      const user = await User.findById(_id);
      if (!user) {
        return res.status(401).json({ 
          msg: "User not found",
          error: "Invalid token"
        });
      }

      // Attach user details to request
      req.user = user;

      // Role-based access control
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ 
          msg: `Access Denied. ${requiredRole} role required`,
          error: "Insufficient permissions"
        });
      }

      next();
    } catch (err) {
      console.error("Auth Error:", err);
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ 
          msg: "Invalid token",
          error: err.message
        });
      }
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ 
          msg: "Token expired",
          error: "Please login again"
        });
      }
      res.status(500).json({ 
        msg: "Authentication error",
        error: err.message
      });
    }
  };
};

module.exports = userandadminauth;
