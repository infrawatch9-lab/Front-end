import axios from "axios";

const url = "https://infra42luanda.duckdns.org/api";
console.log("API URL:", url);

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AuthResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  message: string;
}

export async function apiLogin(data: { email: string; password: string }) {
  try {
    const response = await api.post<any>("/users/login", data);
    const { tokens } = response.data;
    //console.log("Received data:", tokens);
    if (tokens?.accessToken) {
      localStorage.setItem("token", tokens.accessToken);
      console.log("Stored token:", tokens.accessToken);
    }
    return tokens?.accessToken || "Login feito com sucesso";
  } catch (error) {
    console.log("Erro ao fazer login:", error);
    throw new Error("Erro ao fazer login");
  }
}
