import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState('general');

  const faqs = {
    general: [
      {
        question: "How do I register for the E-Voting system?",
        answer: "To register, click the 'Register' button on the homepage and fill in your student details including your registration number, section, and year. Make sure to use your university email address."
      },
      {
        question: "What should I do if I forget my password?",
        answer: "Click on the 'Forgot Password' link on the login page. You'll receive a password reset link at your registered email address."
      },
      {
        question: "How do I know if I'm eligible to vote?",
        answer: "You are eligible to vote if you are a registered student of MallaReddy University. The system will automatically show you the elections you're eligible for based on your section and year."
      }
    ],
    voting: [
      {
        question: "How do I cast my vote?",
        answer: "Log in to your account, go to the 'Active Elections' section, and click 'Vote Now' on the election you want to participate in. Follow the prompts to select your candidate and submit your vote."
      },
      {
        question: "Can I change my vote after submitting?",
        answer: "No, once you submit your vote, it cannot be changed. This ensures the integrity of the voting process."
      },
      {
        question: "What happens if I don't vote?",
        answer: "While voting is not mandatory, it's encouraged to participate in the democratic process. You can view the results of elections you didn't vote in once they're closed."
      }
    ],
    results: [
      {
        question: "When are election results announced?",
        answer: "Results are announced immediately after the election period ends. You can view them in the 'Past Elections' section of your dashboard."
      },
      {
        question: "How are the results calculated?",
        answer: "The system automatically counts all valid votes and determines the winner based on the highest number of votes received."
      },
      {
        question: "Can I view past election results?",
        answer: "Yes, you can view results of all past elections in the 'Past Elections' section of your dashboard."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>

          {/* Support Contact */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold mb-4">Need Immediate Help?</h2>
            <p className="text-gray-300 mb-4">
              Our support team is here to help you. Contact us through:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold">Email:</span> evotingsupport@gmail.com
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Phone:</span> +91 9674851425
              </p>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {['general', 'voting', 'results'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveSection(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeSection === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} FAQs
              </button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {faqs[activeSection].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter; 