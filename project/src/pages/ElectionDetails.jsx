// src/pages/ElectionDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

function ElectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch election details from admin route
  const fetchElection = async () => {
    try {
      const response = await axios.get(`/admin/elections/${id}`);
      setElection(response.data.election);
    } catch (error) {
      toast.error("Failed to fetch election details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCloseElection = async () => {
    try {
      await axios.post(`/admin/elections/${id}/close`);
      toast.success("Election closed successfully");
      fetchElection();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to close election");
    }
  };

  const handleDeleteElection = async () => {
    try {
      await axios.delete(`/admin/elections/${id}`);
      toast.success("Election deleted successfully");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete election");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl font-medium text-white"
        >
          Loading...
        </motion.p>
      </div>
    );
  if (!election)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl font-medium text-white"
        >
          Election not found
        </motion.p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-6 max-w-4xl"
      >
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          className="mb-4 text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          <span>&larr;</span> Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <motion.h2
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2 text-white"
          >
            {election.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 text-lg text-gray-200"
          >
            Section: <span className="font-semibold text-white">{election.section}</span> |
            Year: <span className="font-semibold text-white">{election.year}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-lg text-gray-200"
          >
            Status:{" "}
            <span className={`font-semibold ${election.isActive ? "text-green-400" : "text-red-400"}`}>
              {election.isActive ? "Active" : "Closed"}
            </span>
          </motion.p>

          {/* Admin Controls */}
          {user && user.role === "admin" && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mt-4 space-y-4"
            >
              {election.isActive ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseElection}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                >
                  Close Election
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/admin/election-results/${id}`)}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                >
                  View Results
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteElection}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
              >
                Delete Election
              </motion.button>
            </motion.div>
          )}

          {/* Participants List */}
          <motion.div initial="hidden" animate="visible" className="mt-8">
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-4 text-white"
            >
              Participants
            </motion.h3>
            <ul className="space-y-4">
              <AnimatePresence>
                {election.participants.map((p) => (
                  <motion.li
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                    className="p-4 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg flex justify-between items-center border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div>
                      <p className="font-bold text-lg text-white">{p.name}</p>
                      <p className="text-sm text-gray-300">Votes: {p.votes}</p>
                    </div>
                    {user && user.role === "student" && election.isActive && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toast("Vote functionality coming soon!")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                      >
                        Vote
                      </motion.button>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ElectionDetails;
