import { api } from "../confg";

// Gera e salva um relatório PDF de um serviço específico
export async function generateSlaPdf(serviceId: string, period?: string) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post(
      `/sla/reports/generate/${serviceId}`,
      period ? { period } : {}
    );
    return response.data; // deve retornar metadados do relatório gerado
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao gerar relatório PDF";
    throw new Error(errorMessage);
  }
}

// Lista todos os relatórios PDF salvos
export async function listSlaReports() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.get(`/sla/reports/list`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao listar relatórios PDF";
    throw new Error(errorMessage);
  }
}

// Faz download de um relatório PDF salvo
export async function downloadSlaReport(filename: string) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.get(`/sla/reports/download/${filename}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao baixar relatório PDF";
    throw new Error(errorMessage);
  }
}
