import { api } from "../confg";

export async function exportSlaCsv(params?: {
  startDate?: string;
  endDate?: string;
}) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post("/sla/reports/export/csv", params, {
      responseType: "blob",
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao exportar CSV geral";
    throw new Error(errorMessage);
  }
}
