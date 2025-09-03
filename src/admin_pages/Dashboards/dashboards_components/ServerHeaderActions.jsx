import React from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { exportSlaPdfByType } from "../../../api/sla/exportSlaPdf";

export default function HeaderActions({ onNew, onShowAll, onExplorer }) {
  const { t } = useTranslation();
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
      const blob = await exportSlaPdfByType("SERVER", params);
      downloadBlob(
        blob,
        `sla_SERVER_${params.startDate || "inicio"}_${
          params.endDate || "fim"
        }.pdf`
      );
    } catch {
      alert("Erro ao exportar PDF");
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <select
          className="bg-[#010E37] border border-[#3B5B75] rounded px-3 py-1 text-sm text-gray-300"
          value={t("server.all_api_services")}
          onChange={() => {}}
        >
          <option>{t("server.all_api_services")}</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onNew}
          className="px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm hover:bg-[#162050] transition-colors"
        >
          {t("server.new")}
        </button>
        <button
          onClick={onShowAll}
          className="px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm hover:bg-[#162050] transition-colors"
        >
          {t("server.show_all")}
        </button>
        <button
          onClick={onExplorer}
          className="px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm hover:bg-[#162050] transition-colors"
        >
          {t("server.explorer")}
        </button>
        <select
          className="bg-[#0B1440] text-gray-300 border border-[#3B5B75] rounded px-3 py-1 text-sm"
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
          className="px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm hover:bg-[#162050] transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF
        </button>
      </div>
    </div>
  );
}
