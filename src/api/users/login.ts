import { api } from "../confg"; 

export async function apiLogin(data: { email: string; password: string }) {
  try {
    const response = await api.post<any>("/users/login", data);
    const { tokens, message, user } = response.data;

    if (tokens?.accessToken && user?.role) {
      localStorage.setItem("token", tokens.accessToken);
      localStorage.setItem("role", user.role);
      
      // Armazenar dados completos do usuário incluindo isTemporaryPassword
      localStorage.setItem("user", JSON.stringify(user));
      
      // Verificar se é senha temporária
      if (user.isTemporaryPassword === true) {
        localStorage.setItem("needsPasswordReset", "true");
      } else {
        localStorage.removeItem("needsPasswordReset");
      }
    }
    
    // Retornar dados completos para o componente de login
    return {
      message: message || "Login feito com sucesso",
      user: user,
      isTemporaryPassword: user?.isTemporaryPassword === true
    };
  } catch (error: any) {
    console.log("Erro ao fazer login:", error.response.data.message || error);
    const errorMessage = error.response.data.message || "Erro ao fazer login";
    throw new Error(errorMessage);
  }
}
