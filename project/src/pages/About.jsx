import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">About MRU E-Voting System</h1>
          
          <div className="space-y-8">
            <section className="bg-white/5 backdrop-blur-md p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300">
                MallaReddy University&apos;s E-Voting System is designed to streamline the election process, 
                making it more efficient, secure, and accessible for all students. Our platform ensures 
                transparent and fair elections while maintaining the highest standards of security and privacy.
              </p>
            </section>

            <section className="bg-white/5 backdrop-blur-md p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-4 text-gray-300">
                <li>• Secure and encrypted voting process</li>
                <li>• Real-time vote counting and results</li>
                <li>• User-friendly interface for easy voting</li>
                <li>• Transparent election process</li>
                <li>• Accessible from any device</li>
              </ul>
            </section>

            <section className="bg-white/5 backdrop-blur-md p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="space-y-4 text-gray-300">
                <p>1. Students register with their university credentials</p>
                <p>2. During election periods, eligible students receive notifications</p>
                <p>3. Students can cast their votes securely through our platform</p>
                <p>4. Results are calculated and displayed in real-time</p>
                <p>5. Winners are announced immediately after the election closes</p>
              </div>
            </section>

            <div className="text-center mt-8">
              <Link
                to="/"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 