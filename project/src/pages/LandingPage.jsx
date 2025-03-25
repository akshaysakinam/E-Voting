import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            MallaReddy University
            <span className="block text-blue-400">E-Voting System</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
          >
            Empowering Democracy Through Digital Innovation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex space-x-6"
          >
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <span>Login</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Secure Voting",
              description: "Advanced encryption ensures your vote remains private and secure"
            },
            {
              title: "Easy Access",
              description: "Vote from anywhere, anytime with our user-friendly interface"
            },
            {
              title: "Real-time Results",
              description: "Get instant access to election results and statistics"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl hover:bg-white/10 transition-all transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/login" className="block text-gray-300 hover:text-blue-300 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="block text-gray-300 hover:text-blue-300 transition-colors">
                  Register
                </Link>
                <Link to="/help" className="block text-gray-300 hover:text-blue-300 transition-colors">
                  Help Center
                </Link>
              </div>
            </div>

            {/* About Link */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">About</h3>
              <Link to="/about" className="block text-gray-300 hover:text-blue-300 transition-colors">
                Learn more about our E-Voting System
              </Link>
            </div>

            {/* Contact Link */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-300 transition-colors">
                Get in touch with us
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-400 border-t border-white/10 pt-8">
            <p>&copy; {new Date().getFullYear()} MallaReddy University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 