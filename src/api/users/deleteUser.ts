import {api} from "../confg";

export async function apiDeleteUser(userId: number) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.delete<any>(`/users/${userId}`);
    return response.data.message || "Usuário deletado com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Não foi possível deletar o usuário";
    throw new Error(errorMessage);
  }
}