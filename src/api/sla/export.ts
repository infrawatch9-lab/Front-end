import axios from "axios";

// Exporta relatório geral em PDF
export async function exportSlaPdf(params?: {
  startDate?: string;
  endDate?: string;
}) {
  return axios.post("/sla/reports/export/pdf", params, {
    responseType: "blob",
  });
}

// Exporta relatório geral em CSV
export async function exportSlaCsv(params?: {
  startDate?: string;
  endDate?: string;
}) {
  return axios.post("/sla/reports/export/csv", params, {
    responseType: "blob",
  });
}

// Exporta relatório por tipo de serviço em PDF
export async function exportSlaPdfByType(
  type: string,
  params?: { startDate?: string; endDate?: string }
) {
  return axios.post(`/sla/reports/export/pdf/type/${type}`, params, {
    responseType: "blob",
  });
}

// Exporta relatório por tipo de serviço em CSV
export async function exportSlaCsvByType(
  type: string,
  params?: { startDate?: string; endDate?: string }
) {
  return axios.post(`/sla/reports/export/csv/type/${type}`, params, {
    responseType: "blob",
  });
}

// Exporta relatório por serviço específico em PDF
export async function exportSlaPdfByService(
  serviceId: string,
  params?: { startDate?: string; endDate?: string }
) {
  return axios.post(`/sla/reports/export/pdf/service/${serviceId}`, params, {
    responseType: "blob",
  });
}

// Exporta relatório por serviço específico em CSV
export async function exportSlaCsvByService(
  serviceId: string,
  params?: { startDate?: string; endDate?: string }
) {
  return axios.post(`/sla/reports/export/csv/service/${serviceId}`, params, {
    responseType: "blob",
  });
}
