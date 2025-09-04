import React, { useState } from 'react';
import { FileText, Download, ChevronDown } from 'lucide-react';

export default function ExportButtonsFilter() {
  const [showCSVDropdown, setShowCSVDropdown] = useState(false);
  const [showPDFDropdown, setShowPDFDropdown] = useState(false);

  const periods = [
    { label: 'Última Semana', value: '7d' },
    { label: 'Último Mês', value: '30d' },
    { label: 'Último Ano', value: '365d' }
  ];

  const handleExportCSV = (period) => {
    console.log('Exportando CSV para o período:', period.value);
    setShowCSVDropdown(false);
    
    // Aqui você implementaria a lógica real de exportação CSV
    // exportToCSV(period.value);
  };

  const handleExportPDF = (period) => {
    console.log('Exportando PDF para o período:', period.value);
    setShowPDFDropdown(false);
    
    // Aqui você implementaria a lógica real de exportação PDF
    // exportToPDF(period.value);
  };

  return (
    <div className="flex gap-2">
      {/* Botão Export CSV com Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowCSVDropdown(!showCSVDropdown)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 transition-colors"
        >
          <FileText className="w-4 h-4" />
          EXPORTAR CSV
          <ChevronDown className={`w-4 h-4 transition-transform ${showCSVDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu CSV */}
        {showCSVDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 min-w-full">
            {periods.map((period) => (
              <button
                key={`csv-${period.value}`}
                onClick={() => handleExportCSV(period)}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 transition-colors first:rounded-t last:rounded-b"
              >
                {period.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Botão Export PDF com Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowPDFDropdown(!showPDFDropdown)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          EXPORTAR PDF
          <ChevronDown className={`w-4 h-4 transition-transform ${showPDFDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu PDF */}
        {showPDFDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 min-w-full">
            {periods.map((period) => (
              <button
                key={`pdf-${period.value}`}
                onClick={() => handleExportPDF(period)}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 transition-colors first:rounded-t last:rounded-b"
              >
                {period.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}