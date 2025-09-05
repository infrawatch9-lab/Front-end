// Exporta CSV geral (panorama de todos os serviços)
import { api } from "../confg";

export async function exportSlaCsvAll({ period = "week", startDate, endDate }) {
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
  const response = await api.get(
    `/sla/reports/export/csv/service/${serviceId}`,
    { responseType: "blob" }
  );
  return response.data;
}
