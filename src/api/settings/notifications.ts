import { api } from "../confg";

export async function apiSaveNotificationSettings(settingsType: string, config: any) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post<any>(`/settings/notifications/${settingsType}`, config);
    return response.data.message || "Configurações salvas com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao salvar configurações";
    throw new Error(errorMessage);
  }
}

export async function apiGetNotificationSettings(settingsType: string) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.get<any>(`/settings/notifications/${settingsType}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao buscar configurações";
    throw new Error(errorMessage);
  }
}

export async function apiTestNotificationSettings(settingsType: string, config: any) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post<any>(`/settings/notifications/${settingsType}/test`, config);
    return response.data.message || "Teste realizado com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao testar configurações";
    throw new Error(errorMessage);
  }
}
