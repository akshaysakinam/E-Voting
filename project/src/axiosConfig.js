import axios from "axios";
import { BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle errors
instance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error:", error.request);
      return Promise.reject({ msg: "No response received from server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      return Promise.reject({ msg: "Error setting up the request" });
    }
  }
);

export default instance; 