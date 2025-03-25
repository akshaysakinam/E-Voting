import axios from "axios";

const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api" 
  : "https://e-voting-deqp.onrender.com/api";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  credentials: 'include', // Include credentials in requests
});

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    // Ensure credentials are included in every request
    config.withCredentials = true;
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
        headers: error.response.headers
      });
      // Handle 401 errors specifically
      if (error.response.status === 401) {
        // You might want to redirect to login or refresh token here
        console.error("Authentication failed. Please log in again.");
      }
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
 