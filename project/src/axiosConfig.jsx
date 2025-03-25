import axios from "axios";

const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api" 
  : "https://e-voting-deqp.onrender.com/api";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
 