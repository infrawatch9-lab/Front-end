import React, { useState, useEffect } from "react";
import {
  exportSlaCsvAll,
  exportSlaCsvByType,
  exportSlaCsvByService,
} from "../../api/sla/exportSlaCsv";

const serviceTypes = [
  { label: "Todos", value: "all" },
  { label: "PING", value: "PING" },
  { label: "HTTP", value: "HTTP" },
  { label: "SNMP", value: "SNMP" },
  { label: "WEBHOOK", value: "WEBHOOK" },
];

export default function ExportCsvReport() {
  const [period, setPeriod] = useState("week");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [type, setType] = useState("all");
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulação: buscar lista de serviços (substitua pelo fetch real se necessário)
  useEffect(() => {
    setServices([
      { id: "1", name: "Servidor 1" },
      { id: "2", name: "Servidor 2" },
      { id: "3", name: "Servidor 3" },
    ]);
  }, []);

  const handleExport = async () => {
    setLoading(true);
    try {
      let blob;
      if (serviceId) {
        blob = await exportSlaCsvByService(serviceId);
      } else if (type !== "all") {
        blob = await exportSlaCsvByType(type, {
          period,
          startDate: period === "custom" ? customStart : undefined,
          endDate: period === "custom" ? customEnd : undefined,
        });
      } else {
        blob = await exportSlaCsvAll({
          period,
          startDate: period === "custom" ? customStart : undefined,
          endDate: period === "custom" ? customEnd : undefined,
        });
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sla_relatorio.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Erro ao exportar CSV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-lg font-bold mb-2">Exportar Relatório CSV</h2>
      <div>
        <label className="block font-medium mb-1">Período:</label>
        <div className="flex flex-col gap-1">
          <label>
            <input
              type="radio"
              name="period"
              value="week"
              checked={period === "week"}
              onChange={() => setPeriod("week")}
            />{" "}
            Últimos 7 dias
          </label>
          <label>
            <input
              type="radio"
              name="period"
              value="month"
              checked={period === "month"}
              onChange={() => setPeriod("month")}
            />{" "}
            Último mês
          </label>
          <label>
            <input
              type="radio"
              name="period"
              value="year"
              checked={period === "year"}
              onChange={() => setPeriod("year")}
            />{" "}
            Último ano
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="period"
              value="custom"
              checked={period === "custom"}
              onChange={() => setPeriod("custom")}
            />
            Personalizado:
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              disabled={period !== "custom"}
              className="border rounded px-2 py-1"
            />
            até
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              disabled={period !== "custom"}
              className="border rounded px-2 py-1"
            />
          </label>
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Tipo de Serviço:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          {serviceTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Serviço Específico:</label>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Todos</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleExport}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold mt-2 flex items-center justify-center"
      >
        {loading ? (
          <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full mr-2"></span>
        ) : null}
        Exportar CSV
      </button>
    </div>
  );
}
