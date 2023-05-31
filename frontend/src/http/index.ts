// axios config and interceptors
import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { AccessToken } from "../models/authModels";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// adds auth header when requesting from server
api.interceptors.request.use( async (config) => {
  const token = localStorage.getItem("access");
    if (token) {
      // Access Token was expired
      const decoder = jwt_decode<JwtPayload>(token);
      if (decoder.exp) {

        if (Date.now() >= decoder.exp * 1000 - 10000) {
          localStorage.setItem("access", "");
          const response = await axios.post<AccessToken>(
            `${import.meta.env.VITE_API_URL}/auth/refresh/`,
            { refresh: localStorage.getItem("refresh") }
          );

          localStorage.setItem("access", response.data.access);

          if (config.headers) {
            config.headers.Authorization = "Bearer " + response.data.access;
          }
        } else if (config.headers) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
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
      localStorage.setItem("access", "");
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
