import {api} from "../confg";

export async function apiUpdateUser(data: any) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.put<any>(`/users/update-user`, data);
    return response.data.message || "Usuário atualizado com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao atualizar usuário";
    throw new Error(errorMessage);
  }
}
