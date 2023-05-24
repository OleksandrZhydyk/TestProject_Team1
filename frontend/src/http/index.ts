// axios config and interceptors
import axios from "axios";
import { AccessToken } from "../models/authModels";

export const API_URL = "http://ec2-52-90-252-13.compute-1.amazonaws.com/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

// adds auth header when requesting from server
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
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
          `${API_URL}/auth/refresh/`,
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
