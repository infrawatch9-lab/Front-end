import { api } from "../confg";

export async function exportSlaCsvByService(
  serviceId: string,
  params?: { startDate?: string; endDate?: string }
) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.post(
      `/sla/reports/export/csv/service/${serviceId}`,
      params,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao exportar CSV por serviço";
    throw new Error(errorMessage);
  }
}
