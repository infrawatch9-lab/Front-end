// Arquivo removido. Funções centralizadas em exportSlaPdf.ts
import { api } from "../confg";

export async function exportSlaPdfByType(
  type: string,
  params?: { startDate?: string; endDate?: string }
) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post(
      `/sla/reports/export/pdf/type/${type}`,
      params,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao exportar PDF por tipo";
    throw new Error(errorMessage);
  }
}
