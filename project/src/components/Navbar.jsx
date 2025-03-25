import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import axios from "../axiosConfig";
import toast from "react-hot-toast";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const handleLogoClick = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "student") {
        navigate("/student");
      }
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Logout failed");
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${
      isLandingPage ? 'bg-white/10 backdrop-blur-md' : 'bg-blue-900'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold cursor-pointer text-white"
          >
            MRU E-Voting
          </motion.div>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-white">Hi, {user.name}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all transform"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-2 rounded-full transition-all transform"
                >
                  Register
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
