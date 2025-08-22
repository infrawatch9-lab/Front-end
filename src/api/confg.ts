import axios from "axios";
const url = "https://infra42luanda.duckdns.org/api";

export const api = axios.create({
  baseURL: url,
  timeout: 30000, // 30 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

