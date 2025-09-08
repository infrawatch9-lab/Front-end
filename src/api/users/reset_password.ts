import { api } from "../confg"; 

export async function apiResetPassword(data: { currentPassword: string; newPassword: string }) {
  try {
    const response = await api.post<any>("/users/reset_password", data);
    const { message } = response.data;
    console.log("Resposta da API:", response.data);

    // Retorna a mensagem da API se existir, senão retorna uma mensagem padrão
    return message || "Senha alterada com sucesso";
  } catch (error: any) {
    console.log("Erro ao resetar senha:", error.response.data.message || error);
    const errorMessage = error.response.data.message || "Erro ao resetar senha";
    throw new Error(errorMessage);
  }
}