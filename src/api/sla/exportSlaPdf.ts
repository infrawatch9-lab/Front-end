// Exporta PDF geral (panorama de todos os serviços)
import { api } from "../confg";

export async function exportSlaPdfAll(params?: {
  year?: number;
  month?: number;
  day?: number;
}) {
  const token = localStorage.getItem("token");
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await api.get("/sla/reports/export/pdf", {
    params,
    responseType: "blob",
  });
  return response.data;
}

// Exporta PDF por tipo de serviço
export async function exportSlaPdfByType(
  type: string,
  params?: { year?: number; month?: number; day?: number }
) {
  const token = localStorage.getItem("token");
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await api.get(`/sla/reports/export/pdf/type/${type}`, {
    params,
    responseType: "blob",
  });
  return response.data;
}

// Exporta PDF detalhado de um serviço específico
export async function exportSlaPdfByService(
  serviceId: string,
  params?: { year?: number; month?: number; day?: number }
) {
  const token = localStorage.getItem("token");
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await api.get(
    `/sla/reports/export/pdf/service/${serviceId}`,
    { params, responseType: "blob" }
  );
  return response.data;
}
