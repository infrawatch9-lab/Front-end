import React from "react";
import { FileText, Download } from "lucide-react";

export default function ExportButtons() {
  return (
    <div className="flex gap-2">
      <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 transition-colors">
        <FileText className="w-4 h-4" />
        EXPORTAR CSV
      </button>
      <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 transition-colors">
        <Download className="w-4 h-4" />
        EXPORTAR PDF
      </button>
    </div>
  );
}
