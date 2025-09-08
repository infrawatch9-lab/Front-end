import { api } from "../confg"; 

export async function apiResetPassword(data: { currentPassword: string; newPassword: string }) {
  try {
    const response = await api.put<any>("/users/reset-password", data);
    const { message } = response.data;

    return message || "Senha alterada com sucesso";
  } catch (error: any) {
    console.log("Erro ao resetar senha:", error.response.data.message || error);
    const errorMessage = error.response.data.message || "Erro ao resetar senha";
    throw new Error(errorMessage);
  }
}