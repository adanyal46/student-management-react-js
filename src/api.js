// src/api.js
import axios from "axios";
import useAuthStore from "./stores/authStore";

// Create an Axios instance with a base URL from environment variables
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Ensure this environment variable is defined
});

api.interceptors.request.use(
  (config) => {
    // Access the token from Zustand store
    const { token } = useAuthStore.getState();

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
