import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

function CreateElection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState([{ userId: "", name: "" }]);
  const [eligibleStudents, setEligibleStudents] = useState([]);

  // Fetch eligible students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/eligible-students");
        setEligibleStudents(response.data.students);
      } catch (error) {
        toast.error("Failed to fetch eligible students");
      }
    };
    fetchStudents();
  }, []);

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { userId: "", name: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        section,
        year,
        startTime,
        endTime,
        isActive: true,
        participants,
      };
      await axios.post("/createelection", payload);
      toast.success("Election created successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to create election");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
      >
        <motion.h2
          custom={1}
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="text-3xl font-extrabold mb-6 text-center text-white"
        >
          Create New Election
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={formVariants}>
            <label className="block text-sm font-medium text-gray-200">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200"
              placeholder="Election Title"
            />
          </motion.div>
          {/* Section and Year */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={formVariants} className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-200">Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                className="w-full mt-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200"
                placeholder="Section"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-200">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="w-full mt-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200"
                placeholder="Year"
              />
            </div>
          </motion.div>
          {/* Start and End Time */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={formVariants} className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-200">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full mt-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-200">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full mt-1 p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200"
              />
            </div>
          </motion.div>
          {/* Participants */}
          <motion.div custom={5} initial="hidden" animate="visible" variants={formVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Participants</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addParticipant}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Participant
              </motion.button>
            </div>
            <AnimatePresence>
              {participants.map((participant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  className="relative group mb-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Dropdown for eligible students */}
                    <div className="flex-1 relative">
                      <select
                        value={participant.userId}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedStudent = eligibleStudents.find(
                            (stu) => stu._id === selectedId
                          );
                          handleParticipantChange(index, "userId", selectedId);
                          handleParticipantChange(index, "name", selectedStudent ? selectedStudent.name : "");
                        }}
                        required
                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer pr-10"
                      >
                        <option value="" className="bg-gray-800">Select Candidate</option>
                        {eligibleStudents
                          .filter((stu) => stu._id !== user?._id)
                          .map((stu) => (
                            <option key={stu._id} value={stu._id} className="bg-gray-800">
                              {stu.name} ({stu.email})
                            </option>
                          ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {/* Readonly name field */}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={participant.name}
                        readOnly
                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                        placeholder="Candidate Name"
                      />
                    </div>
                    {/* Remove button */}
                    {participants.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          const newParticipants = participants.filter((_, i) => i !== index);
                          setParticipants(newParticipants);
                        }}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-200"
          >
            Create Election
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateElection;
