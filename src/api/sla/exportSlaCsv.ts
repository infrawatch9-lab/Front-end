// Exporta CSV geral (panorama de todos os serviços)
import { api } from "../confg";

// Exporta CSV geral filtrado por tipo e período
export async function exportSlaCsvAllByType(
  type: string,
  {
    period = "week",
    startDate,
    endDate,
  }: { period?: string; startDate?: string; endDate?: string } = {}
) {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  
  const params =
    period === "custom" && startDate && endDate
      ? { period, startDate, endDate }
      : { period };
  const response = await api.get(`/sla/reports/export/csv/type/${type}`, {
    params,
    responseType: "blob",
  });
  return response.data;
}

export async function exportSlaCsvAll({ period = "week", startDate, endDate }) {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  
  const params =
    period === "custom" && startDate && endDate
      ? { period, startDate, endDate }
      : { period };
  const response = await api.get("/sla/reports/export/csv", {
    params,
    responseType: "blob",
  });
  return response.data;
}

// Exporta CSV por tipo de serviço

export async function exportSlaCsvByType(
  type,
  { period = "week", startDate, endDate }
) {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  
  const params =
    period === "custom" && startDate && endDate
      ? { period, startDate, endDate }
      : { period };
  const response = await api.get(`/sla/reports/export/csv/type/${type}`, {
    params,
    responseType: "blob",
  });
  return response.data;
}

// Exporta CSV de serviço individual (sempre completo)
export async function exportSlaCsvByService(serviceId) {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  
  const response = await api.get(
    `/sla/reports/export/csv/service/${serviceId}`,
    { responseType: "blob" }
  );
  return response.data;
}
