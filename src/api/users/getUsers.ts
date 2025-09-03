import {api } from "../confg";

export async function apiGetUsers() {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("Role do usuário:", role);
    console.log("Token do usuário:", token);
    
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.get<any>("/users");
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && response.data.users) {
      return response.data.users;
    } else {
      return [];
    }
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error.response?.data?.message || error);
    const errorMessage = error.response?.data?.message || "Erro ao buscar usuários";
    throw new Error(errorMessage);
  }     
}