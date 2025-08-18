import React from "react";
import SearchBar from "./HistorySearchBar";
import FilterDropdown from "./HistoryFilterDropdown";
import ExportButtons from "./HistoryExportButtons";

export default function ControlsBar({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  serviceFilter,
  onServiceFilterChange,
}) {
  const typeOptions = [
    { value: "info", label: "INFO" },
    { value: "error", label: "ERRO" },
    { value: "warning", label: "AVISO" },
  ];

  const serviceOptions = [
    { value: "auth", label: "Autenticação" },
    { value: "user", label: "Usuário" },
    { value: "system", label: "Sistema" },
  ];

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-64">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
        <FilterDropdown
          label="TIPO"
          value={typeFilter}
          options={typeOptions}
          onChange={onTypeFilterChange}
        />
        <FilterDropdown
          label="SERVIÇO"
          value={serviceFilter}
          options={serviceOptions}
          onChange={onServiceFilterChange}
        />
      </div>
      <ExportButtons />
    </div>
  );
}
