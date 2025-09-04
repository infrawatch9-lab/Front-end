import React from "react";
import { ChevronDown, Download } from "lucide-react";
import { exportSlaPdfByType } from "../../../api/sla/exportSlaPdf";

export default function Header() {
  const [quickFilter, setQuickFilter] = React.useState("7d");

  function getQuickFilterParams(filter) {
    const now = new Date();
    if (filter === "7d") {
      const start = new Date(now);
      start.setDate(now.getDate() - 6);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: now.toISOString().slice(0, 10),
      };
    }
    if (filter === "month") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: now.toISOString().slice(0, 10),
      };
    }
    if (filter === "year") {
      const start = new Date(now.getFullYear(), 0, 1);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: now.toISOString().slice(0, 10),
      };
    }
    return {};
  }

  function downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  const handleExportPdf = async () => {
    try {
      const params = getQuickFilterParams(quickFilter);
      const blob = await exportSlaPdfByType("NETWORK", params);
      downloadBlob(
        blob,
        `sla_NETWORK_${params.startDate || "inicio"}_${
          params.endDate || "fim"
        }.pdf`
      );
    } catch {
      alert("Erro ao exportar PDF");
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          GOOGLE DNS
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <select
          className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm"
          value={quickFilter}
          onChange={(e) => setQuickFilter(e.target.value)}
          title="Período do relatório"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="month">Este mês</option>
          <option value="year">Este ano</option>
        </select>
        <button
          onClick={handleExportPdf}
          className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-500 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>
    </div>
  );
}
