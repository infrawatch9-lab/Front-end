import { api } from "../confg";

export async function apiRegister(data: { name: string; email: string; number?: string; role: string; }) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post<any>("/users/register", data);
    return response.data.message || "Registro feito com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao fazer registro";
    throw new Error(errorMessage);
  }
}