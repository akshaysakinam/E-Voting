import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function VotePage() {
  const { id } = useParams(); // election id
  const { user } = useAuth();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/elections/${id}`);
        setElection(response.data.election);
      } catch (error) {
        toast.error("Failed to fetch election details");
      } finally {
        setLoading(false);
      }
    };
    fetchElection();
  }, [id]);

  const castVote = async (participantId) => {
    try {
      await axios.post("/vote", { electionId: id, participantId });
      toast.success("Vote cast successfully!");
      navigate("/student");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to cast vote");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl font-medium"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Animation variants for container and list items
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto max-w-3xl bg-white/5 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20"
      >
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </motion.button>

        <motion.h2
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-white text-center"
        >
          {election.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center gap-4 mb-8"
        >
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <p className="text-gray-300">Section</p>
            <p className="text-white font-semibold">{election.section}</p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <p className="text-gray-300">Year</p>
            <p className="text-white font-semibold">{election.year}</p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-6 text-white text-center"
          >
            Select Your Candidate
          </motion.h3>
          <AnimatePresence>
            <ul className="space-y-4">
              {election.participants.map((p) => (
                <motion.li
                  key={p._id}
                  variants={itemVariants}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex justify-between items-center border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl font-bold text-white"
                    >
                      {p.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-300"
                    >
                      Roll No: {p.rollno}
                    </motion.p>
                  </div>
                  {user && user.role === "student" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => castVote(p._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Cast Vote
                    </motion.button>
                  )}
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default VotePage;
