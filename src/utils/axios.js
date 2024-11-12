import axios from "axios";

// Axios instance with the base URL for your backend API
const axiosInstance = axios.create({
  baseURL: "http://localhost:3500/api",
});

export default axiosInstance;
