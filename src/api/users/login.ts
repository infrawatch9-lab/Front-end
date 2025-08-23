import { api } from "../confg"; 

export async function apiLogin(data: { email: string; password: string }) {
  try {
    const response = await api.post<any>("/users/login", data);
    const { tokens, message } = response.data;
    
    if (tokens?.accessToken) {
      localStorage.setItem("token", tokens.accessToken);
    }
    
    // Retorna a mensagem da API se existir, senão retorna uma mensagem padrão
    return message || "Login feito com sucesso";
  } catch (error: any) {
    console.log("Erro ao fazer login:", error.response.data.message || error);
    const errorMessage = error.response.data.message || "Erro ao fazer login";
    throw new Error(errorMessage);
  }
}
