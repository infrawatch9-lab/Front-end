import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
import { exportSlaPdfByType } from "../../../api/sla/exportSlaPdf";
import { exportSlaCsvByType } from "../../../api/sla/exportSlaCsv";
import { useTheme } from "../../../hooks/useTheme/useTheme";

export default function ExportIndividualButtons({ type }) {
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);

  const { theme } = useTheme()

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

  const handleExportPDF = async () => {
    setLoadingPDF(true);
    try {
      const blob = await exportSlaPdfByType(type);
      downloadBlob(blob, `sla_${type}_completo.pdf`);
    } catch {
      alert("Erro ao exportar PDF");
    } finally {
      setLoadingPDF(false);
    }
  };

  const handleExportCSV = async () => {
    setLoadingCSV(true);
    try {
      const blob = await exportSlaCsvByType(type);
      downloadBlob(blob, `sla_${type}_completo.csv`);
    } catch {
      alert("Erro ao exportar CSV");
    } finally {
      setLoadingCSV(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportPDF}
        className={"flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded border border-gray-600 transition-colors min-w-[120px] justify-center " 
          + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")
        }
        disabled={loadingPDF}
      >
        {loadingPDF ? (
          <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <Download className="w-4 h-4" />
        )}
        PDF
      </button>
      <button
        onClick={handleExportCSV}
        className={"flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded border border-gray-600 transition-colors min-w-[120px] justify-center "
          + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")

        }
        disabled={loadingCSV}
      >
        {loadingCSV ? (
          <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <FileText className="w-4 h-4" />
        )}
        CSV
      </button>
    </div>
  );
}
