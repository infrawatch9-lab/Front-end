import React, { useState, useEffect } from "react";
import { Download, ChevronDown, FileText } from "lucide-react";
import {
  exportSlaPdfAll,
  exportSlaPdfByType,
  exportSlaPdfByService,
} from "../../api/sla/exportSlaPdf";
import {
  exportSlaCsvAll,
  exportSlaCsvByType,
  exportSlaCsvByService,
} from "../../api/sla/exportSlaCsv";
import { getServices } from "../../api/services";

export default function ExportButtonsFilter() {
  const [showPDFDropdown, setShowPDFDropdown] = useState(false);
  const [showCSVDropdown, setShowCSVDropdown] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  // PDF state
  const [pdfPeriod, setPdfPeriod] = useState("week");
  const [pdfType, setPdfType] = useState("all");
  const [pdfService, setPdfService] = useState("");
  const [pdfCustomStart, setPdfCustomStart] = useState("");
  const [pdfCustomEnd, setPdfCustomEnd] = useState("");
  // CSV state
  const [csvPeriod, setCsvPeriod] = useState("week");
  const [csvType, setCsvType] = useState("all");
  const [csvService, setCsvService] = useState("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (showCSVDropdown || showPDFDropdown) {
      getServices().then((data) => {
        setServices(data || []);
      });
    }
  }, [showCSVDropdown, showPDFDropdown]);

  const periods = [
    { label: "Última Semana", value: "week" },
    { label: "Último Mês", value: "month" },
    { label: "Último Ano", value: "year" },
    { label: "Personalizado", value: "custom" },
  ];

  const serviceTypes = [
    { label: "Todos", value: "all" },
    { label: "PING", value: "PING" },
    { label: "HTTP", value: "HTTP" },
    { label: "SNMP", value: "SNMP" },
    { label: "WEBHOOK", value: "WEBHOOK" },
  ];

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

  const handleExportCSV = async () => {
    setLoadingCSV(true);
    setShowCSVDropdown(false);
    try {
      let blob;
      if (csvService) {
        blob = await exportSlaCsvByService(csvService);
      } else if (csvType !== "all") {
        blob = await exportSlaCsvByType(csvType, {
          period: csvPeriod,
          startDate: csvPeriod === "custom" ? customStart : undefined,
          endDate: csvPeriod === "custom" ? customEnd : undefined,
        });
      } else {
        blob = await exportSlaCsvAll({
          period: csvPeriod,
          startDate: csvPeriod === "custom" ? customStart : undefined,
          endDate: csvPeriod === "custom" ? customEnd : undefined,
        });
      }
      downloadBlob(blob, "sla_relatorio.csv");
    } catch {
      alert("Erro ao exportar CSV");
    } finally {
      setLoadingCSV(false);
    }
  };

  const handleExportPDF = async () => {
    setLoadingPDF(true);
    setShowPDFDropdown(false);
    try {
      let blob;
      if (pdfService) {
        blob = await exportSlaPdfByService(pdfService);
      } else if (pdfType !== "all") {
        blob = await exportSlaPdfByType(pdfType, {
          startDate: pdfPeriod === "custom" ? pdfCustomStart : undefined,
          endDate: pdfPeriod === "custom" ? pdfCustomEnd : undefined,
          period: pdfPeriod,
        });
      } else {
        blob = await exportSlaPdfAll(pdfPeriod);
      }
      downloadBlob(blob, "sla_relatorio.pdf");
    } catch {
      alert("Erro ao exportar PDF");
    } finally {
      setLoadingPDF(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Botão PDF */}
      <div className="relative">
        <button
          onClick={() => setShowPDFDropdown(!showPDFDropdown)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 transition-colors min-w-[140px] justify-center"
          disabled={loadingPDF}
        >
          {loadingPDF ? (
            <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            <Download className="w-4 h-4" />
          )}
          EXPORTAR PDF
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showPDFDropdown ? "rotate-180" : ""
            }`}
          />
        </button>
        {showPDFDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 min-w-[340px] p-4 flex flex-col gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Período:
              </label>
              <select
                value={pdfPeriod}
                onChange={(e) => setPdfPeriod(e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
              >
                {periods.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {pdfPeriod === "custom" && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="date"
                    value={pdfCustomStart}
                    onChange={(e) => setPdfCustomStart(e.target.value)}
                    className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <span className="text-gray-400">até</span>
                  <input
                    type="date"
                    value={pdfCustomEnd}
                    onChange={(e) => setPdfCustomEnd(e.target.value)}
                    className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Tipo de Serviço:
              </label>
              <select
                value={pdfType}
                onChange={(e) => {
                  setPdfType(e.target.value);
                  setPdfService("");
                }}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
              >
                {serviceTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Serviço Específico:
              </label>
              <select
                value={pdfService}
                onChange={(e) => setPdfService(e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                disabled={pdfType === "all"}
              >
                <option value="">Todos</option>
                {services
                  .filter((s) => pdfType === "all" || s.type === pdfType)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              onClick={handleExportPDF}
              disabled={
                loadingPDF ||
                (pdfPeriod === "custom" && (!pdfCustomStart || !pdfCustomEnd))
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold mt-2 flex items-center justify-center"
            >
              {loadingPDF ? (
                <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full mr-2"></span>
              ) : null}
              Exportar PDF
            </button>
          </div>
        )}
      </div>
      {/* Botão CSV real */}
      <div className="relative">
        <button
          onClick={() => setShowCSVDropdown(!showCSVDropdown)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 transition-colors min-w-[140px] justify-center"
          disabled={loadingCSV}
        >
          <FileText className="w-4 h-4" />
          EXPORTAR CSV
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showCSVDropdown ? "rotate-180" : ""
            }`}
          />
        </button>
        {showCSVDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 min-w-[340px] p-4 flex flex-col gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Período:
              </label>
              <select
                value={csvPeriod}
                onChange={(e) => setCsvPeriod(e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
              >
                {periods.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {csvPeriod === "custom" && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <span className="text-gray-400">até</span>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Tipo de Serviço:
              </label>
              <select
                value={csvType}
                onChange={(e) => {
                  setCsvType(e.target.value);
                  setCsvService("");
                }}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
              >
                {serviceTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Serviço Específico:
              </label>
              <select
                value={csvService}
                onChange={(e) => setCsvService(e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                disabled={csvType === "all"}
              >
                <option value="">Todos</option>
                {services
                  .filter((s) => csvType === "all" || s.type === csvType)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={
                loadingCSV ||
                (csvPeriod === "custom" && (!customStart || !customEnd))
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold mt-2 flex items-center justify-center"
            >
              {loadingCSV ? (
                <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full mr-2"></span>
              ) : null}
              Exportar CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
