// src/pages/ElectionResults.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function ElectionResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElectionResults = async () => {
      try {
        const response = await axios.get(`/admin/elections/${id}`);
        setElection(response.data.election);
      } catch (error) {
        toast.error("Failed to fetch election details");
      } finally {
        setLoading(false);
      }
    };
    fetchElectionResults();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl font-medium text-white"
        >
          Loading analytics...
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

  // Compute winner
  const sortedParticipants = [...election.participants].sort((a, b) => b.votes - a.votes);
  const winner = sortedParticipants[0];

  // Prepare data for Bar Chart (Vote Counts)
  const barData = {
    labels: election.participants.map((p) => p.name),
    datasets: [
      {
        label: "Votes",
        data: election.participants.map((p) => p.votes),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Calculate total votes to compute percentages for the Pie Chart
  const totalVotes = election.participants.reduce((sum, p) => sum + p.votes, 0);
  const pieData = {
    labels: election.participants.map((p) => p.name),
    datasets: [
      {
        label: "Vote Distribution (%)",
        data: election.participants.map((p) =>
          totalVotes > 0 ? ((p.votes / totalVotes) * 100).toFixed(1) : 0
        ),
        backgroundColor: election.participants.map(
          (_, index) => `hsl(${(index * 360) / election.participants.length}, 70%, 60%)`
        ),
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  // Options for Bar Chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: "top",
        labels: { color: "white" }
      },
      title: { 
        display: true, 
        text: `Vote Counts for ${election.title}`,
        color: "white",
        font: { size: 16 }
      },
      tooltip: { 
        callbacks: { label: (context) => `Votes: ${context.parsed.y}` },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white"
      },
    },
    scales: {
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" }
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" }
      }
    }
  };

  // Options for Pie Chart
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: "bottom",
        labels: { color: "white" }
      },
      title: { 
        display: true, 
        text: `Vote Distribution (%)`,
        color: "white",
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.parsed}% (${
              election.participants.find((p) => p.name === context.label).votes
            } votes)`,
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white"
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 pt-20">
      <div className="container mx-auto p-6 max-w-6xl">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          className="mb-4 text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          <span>&larr;</span> Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold mb-6 text-white text-center"
          >
            Election Results
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Winner</h3>
            <p className="text-lg text-gray-200">
              Name: <span className="font-semibold text-white">{winner.name}</span>
            </p>
            <p className="text-lg text-gray-200">
              Votes: <span className="font-semibold text-white">{winner.votes}</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <Bar data={barData} options={barOptions} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <Pie data={pieData} options={pieOptions} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ElectionResults;
