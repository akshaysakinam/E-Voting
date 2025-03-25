import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CreateElection from "./pages/CreateElection";
import ElectionDetails from "./pages/ElectionDetails";
import StudentDashboard from "./pages/StudentDashboard";
import VotePage from "./pages/VotePage";
import { Toaster } from "react-hot-toast";
import ElectionResults from "./pages/ElectionResults";
import LandingPage from "./pages/LandingPage";
import StudentElectionResults from "./pages/StudentElectionResults";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-election" element={<CreateElection />} />
          <Route path="/admin/elections/:id" element={<ElectionDetails />} />
          <Route path="/admin/election-results/:id" element={<ElectionResults />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/vote/:id" element={<VotePage />} />
          <Route path="/student/election-results/:id" element={<StudentElectionResults />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
