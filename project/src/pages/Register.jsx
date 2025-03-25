import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import axios from "../axiosConfig";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.2, duration: 0.6, ease: "easeOut" },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email domain
    if (!email.endsWith('@mallareddyuniversity.ac.in')) {
      toast.error("Please use your MallaReddy University email address");
      return;
    }

    try {
      const payload = { name, email, password, role };
      if (role === "student") {
        payload.rollno = rollno;
        payload.section = section;
        payload.year = year;
      }
      await axios.post("/signup", payload);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 px-4 pt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          <motion.div variants={fieldVariants} className="text-center mb-8">
            <motion.h2
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-4xl font-extrabold text-white"
            >
              Create an Account
            </motion.h2>
            <p className="text-gray-300 mt-2">Register to get started</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">Name</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="your.name@mallareddyuniversity.ac.in"
                required
              />
              <p className="text-sm text-gray-400">
                Please use your MallaReddy University email address
              </p>
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 appearance-none cursor-pointer pr-10"
                >
                  <option value="student" className="bg-gray-800">Student</option>
                  <option value="admin" className="bg-gray-800">Admin</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {role === "student" && (
              <>
                <motion.div variants={fieldVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Roll Number</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                    type="text"
                    value={rollno}
                    onChange={(e) => setRollno(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Enter your roll number"
                    required
                  />
                </motion.div>
                <motion.div variants={fieldVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Section</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Enter your section"
                    required
                  />
                </motion.div>
                <motion.div variants={fieldVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Year</label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Enter your year"
                    required
                  />
                </motion.div>
              </>
            )}

            <motion.div variants={fieldVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.1)" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              variants={fieldVariants}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-200"
            >
              Register
            </motion.button>
          </form>

          <motion.div variants={fieldVariants} className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
