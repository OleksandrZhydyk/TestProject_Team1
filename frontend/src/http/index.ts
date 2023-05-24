// axios config and interceptors
import axios from "axios";
import { AccessToken } from "../models/authModels";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// adds auth header when requesting from server
api.interceptors.request.use((config) => {
  if (localStorage.getItem("access")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
  }
  return config;
});

// interceptor that checks whether login response is 401, if true - sends refresh token to update access token
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config_isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<AccessToken>(
          `${import.meta.env.VITE_API_URL}/auth/refresh/`,
          { refresh: localStorage.getItem("refresh") }
        );
        localStorage.setItem("access", response.data.access);
        return api.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);

export default api;
