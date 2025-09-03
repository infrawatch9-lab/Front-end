import { api } from "../confg"; 

export async function apiLogin(data: { email: string; password: string }) {
  try {
    const response = await api.post<any>("/users/login", data);
    const { tokens, message, user } = response.data;
    console.log("Resposta da API:", user);

    if (tokens?.accessToken && user?.role) {
      localStorage.setItem("token", tokens.accessToken);
      localStorage.setItem("role", user.role);
    }
    
    // Retorna a mensagem da API se existir, senão retorna uma mensagem padrão
    return message || "Login feito com sucesso";
  } catch (error: any) {
    console.log("Erro ao fazer login:", error.response.data.message || error);
    const errorMessage = error.response.data.message || "Erro ao fazer login";
    throw new Error(errorMessage);
  }
}
