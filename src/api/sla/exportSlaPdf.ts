// Exporta PDF geral (panorama de todos os serviços)
import { api } from "../confg";

// Permite passar period, startDate, endDate igual ao CSV
export async function exportSlaPdfAll({
  period = "week",
  startDate,
  endDate,
}: { period?: string; startDate?: string; endDate?: string } = {}) {
  const params =
    period === "custom" && startDate && endDate
      ? { period, startDate, endDate }
      : { period };
  const response = await api.get("/sla/reports/export/pdf", {
    params,
    responseType: "blob",
  });
  return response.data;
}

// Permite passar period, startDate, endDate igual ao CSV
export async function exportSlaPdfByType(
  type: string,
  {
    period = "week",
    startDate,
    endDate,
  }: { period?: string; startDate?: string; endDate?: string } = {}
) {
  const params =
    period === "custom" && startDate && endDate
      ? { period, startDate, endDate }
      : { period };
  const response = await api.get(`/sla/reports/export/pdf/type/${type}`, {
    params,
    responseType: "blob",
  });
  return response.data;
}

// Serviço individual: sempre completo, sem filtro de período
export async function exportSlaPdfByService(serviceId: string) {
  const response = await api.get(
    `/sla/reports/export/pdf/service/${serviceId}`,
    { responseType: "blob" }
  );
  return response.data;
}
