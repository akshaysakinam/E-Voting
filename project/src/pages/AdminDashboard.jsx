import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/login");
    } else if (user) {
      fetchElections();
    }
  }, [user, loading, navigate]);

  const fetchElections = async () => {
    try {
      const response = await axios.get("/elections");
      setElections(response.data.elections);
    } catch (error) {
      toast.error("Failed to fetch elections");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto p-6"
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-white"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Elections
        </motion.h2>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/admin/create-election"
            className="inline-block mb-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
          >
            Create New Election
          </Link>
        </motion.div>
        {elections.length === 0 ? (
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No elections created yet.
          </motion.p>
        ) : (
          <motion.ul className="space-y-4">
            <AnimatePresence>
              {elections.map((election) => (
                <motion.li
                  key={election._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20"
                >
                  <motion.h3
                    className="text-xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {election.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    Section: {election.section} | Year: {election.year}
                  </motion.p>
                  <motion.p
                    className="text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    Status:{" "}
                    <span className={`font-semibold ${
                      election.isActive ? "text-green-400" : "text-red-400"
                    }`}>
                      {election.isActive ? "Active" : "Closed"}
                    </span>
                  </motion.p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4"
                  >
                    <Link
                      to={`/admin/elections/${election._id}`}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
