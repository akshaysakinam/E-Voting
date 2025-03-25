const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userandadminauth = (requiredRole = null) => {
  return async (req, res, next) => {
    try {
      // Read token from cookies
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).send("Please login to access this resource");
      }

      // Validate token
      const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decodedObj)
      const { _id } = decodedObj;

      // Find user by ID
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }

      // Attach user details to request
      req.user = user;

      // Role-based access control
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).send(`Access Denied to students`);
      }

      next();
    } catch (err) {
        console.log(err)
      res.status(400).send("Error: " + err.message);
    }
  };
};

module.exports = userandadminauth;
