import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "../axiosConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email domain
    if (!email.endsWith('@mallareddyuniversity.ac.in')) {
      toast.error("Please use your MallaReddy University email address");
      return;
    }

    try {
      console.log("Attempting login with:", { email });
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      
      // Check if user data exists and has required fields
      if (!response.data.user) {
        console.error("No user data in response");
        toast.error("Invalid response from server");
        return;
      }

      // Log user role and data
      console.log("User role:", response.data.user.role);
      console.log("User data:", response.data.user);

      setUser(response.data.user);
      toast.success("Login successful!");
      
      // Add a small delay before navigation to ensure state is updated
      setTimeout(() => {
        navigate(response.data.user.role === "admin" ? "/admin" : "/student");
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === 'ECONNREFUSED') {
        toast.error("Cannot connect to server. Please check if the server is running.");
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server response error:", error.response.data);
        toast.error(error.response.data?.msg || `Login failed: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        toast.error("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error);
        toast.error("An error occurred while trying to log in.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.h2
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-white"
            >
              Welcome Back
            </motion.h2>
            <p className="text-gray-300 mt-2">
              Please sign in to your account
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="Enter your email"
                required
              />
              <p className="text-sm text-gray-400">
                Please use your MallaReddy University email address
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-200"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
