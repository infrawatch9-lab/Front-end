import { api } from "../confg";

export async function apiSaveMonitoringSettings(config: any) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post<any>("/settings/monitoring", config);
    return response.data.message || "Configurações de monitoramento salvas com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao salvar configurações de monitoramento";
    throw new Error(errorMessage);
  }
}

export async function apiGetMonitoringSettings() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.get<any>("/settings/monitoring");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao buscar configurações de monitoramento";
    throw new Error(errorMessage);
  }
}

export async function apiSaveThresholdSettings(config: any) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post<any>("/settings/thresholds", config);
    return response.data.message || "Configurações de threshold salvas com sucesso";
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao salvar configurações de threshold";
    throw new Error(errorMessage);
  }
}

export async function apiGetThresholdSettings() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.get<any>("/settings/thresholds");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao buscar configurações de threshold";
    throw new Error(errorMessage);
  }
}
