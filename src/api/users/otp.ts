import { api } from "../confg"; 

export async function apiValidateOtp(data: { email: string; otp: string }) {
  try {
    const response = await api.post<any>("/users/validate-otp", data);
    const { message, success } = response.data;

    console.log("Response from validate-otp:", response);

    if (!success) {
        throw new Error(message || "Erro ao validar OTP");
    }
    
    return message || "OTP validado com sucesso";
  } catch (error: any) {
    console.log("Erro ao validar OTP:", error);
    
    // Se o erro tem response.data, usar a mensagem do servidor
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    
    // Se é um erro que nós lançamos (success: false)
    if (error.message) {
      throw new Error(error.message);
    }
    
    // Fallback para erro genérico
    throw new Error("Erro ao validar OTP");
  }
}

export async function apiSendOtp(data: { email: string }) {
  try {
    const response = await api.post<any>("/users/send-otp", data);
    console.log("Response from send-otp:", response);
    const { message, success } = response.data;

    if (!success) {
      throw new Error(message || "Erro ao enviar OTP");
    }
    else {
      console.log("OTP enviado com sucesso:", response);
    }
    return message || "OTP enviado com sucesso";
  } catch (error: any) {
    console.log("Erro ao enviar OTP:", error.response.data.message || error);
    const errorMessage = error.response.data.message || "Erro ao enviar OTP";
    throw new Error(errorMessage);
  }
}