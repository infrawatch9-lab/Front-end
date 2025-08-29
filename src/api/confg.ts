import axios from "axios";
const url = "https://infra42luanda.duckdns.org/api";

export const apiUrl = url;

export const api = axios.create({
  baseURL: url,
  timeout: 30000, // 30 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar Authorization automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
