// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to fetch the current user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
