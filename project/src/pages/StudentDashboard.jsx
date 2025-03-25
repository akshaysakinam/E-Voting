import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function StudentDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [elections, setElections] = useState({ activeElections: [], closedElections: [] });

  useEffect(() => {
    if (!loading && (!user || user.role !== "student")) {
      navigate("/login");
    } else if (user) {
      fetchElections();
    }
  }, [user, loading, navigate]);

  const fetchElections = async () => {
    try {
      const response = await axios.get(`/elections/${user.section}/${user.year}`);
      setElections({
        activeElections: response.data.activeElections || [],
        closedElections: response.data.closedElections || []
      });
    } catch (error) {
      toast.error("Failed to fetch elections");
    }
  };

  const handleVote = (electionId) => {
    navigate(`/student/vote/${electionId}`);
  };

  const handleViewResults = (electionId) => {
    navigate(`/student/election-results/${electionId}`);
  };

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
      <div className="container mx-auto p-6">
        {/* Active Elections Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6 text-white text-center"
          >
            Active Elections
          </motion.h2>
          {elections.activeElections.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-300 text-center"
            >
              No active elections available at the moment.
            </motion.p>
          ) : (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <AnimatePresence>
                {elections.activeElections.map((election) => (
                  <motion.li
                    key={election._id}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                    className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 flex justify-between items-center"
                  >
                    <div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-xl font-bold text-white"
                      >
                        {election.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-gray-300"
                      >
                        Section: {election.section} | Year: {election.year}
                      </motion.p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote(election._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Vote Now
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </motion.div>

        {/* Closed Elections Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6 text-white text-center"
          >
            Past Elections
          </motion.h2>
          {elections.closedElections.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-300 text-center"
            >
              No past elections available.
            </motion.p>
          ) : (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <AnimatePresence>
                {elections.closedElections.map((election) => (
                  <motion.li
                    key={election._id}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                    className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-xl font-bold text-white"
                        >
                          {election.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="text-gray-300"
                        >
                          Section: {election.section} | Year: {election.year}
                        </motion.p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewResults(election._id)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        View Results
                      </motion.button>
                    </div>
                    
                    {/* Winner Display */}
                    {election.participants && election.participants.length > 0 && (
                      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-2">Winner</h4>
                        <p className="text-gray-300">
                          {election.participants.reduce((max, current) => 
                            (current.votes > max.votes ? current : max)
                          ).name} - {election.participants.reduce((max, current) => 
                            (current.votes > max.votes ? current : max)
                          ).votes} votes
                        </p>
                      </div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default StudentDashboard;
