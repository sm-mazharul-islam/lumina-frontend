import axios, { AxiosInstance } from "axios";

const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
