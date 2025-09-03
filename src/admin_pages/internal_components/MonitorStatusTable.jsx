import React from "react";
import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "./MonitorStatusBadge";
import { useTranslation } from "react-i18next";

export default function StatusTable({
  data,
  searchTerm,
  onRowClick,
  onEditService,
  onDeleteService,
}) {
  const { t } = useTranslation();
  const filteredData = data.filter(
    (item) =>
      item.sla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.limite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.servico &&
        item.servico.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div
      className="rounded border border-slate-600 overflow-hidden"
      style={{ backgroundColor: "#020E36" }}
    >
      {/* Table Header */}
      <div
        className="grid grid-cols-6 gap-4 p-4 border-b border-slate-600"
        style={{ backgroundColor: "#16205A" }}
      >
        <div className="text-white font-semibold text-sm">
          {t("internal.sla")}
        </div>
        <div className="text-white font-semibold text-sm">
          {t("internal.limit")}
        </div>
        <div className="text-white font-semibold text-sm">
          {t("internal.measured")}
        </div>
        <div className="text-white font-semibold text-sm">
          {t("internal.status")}
        </div>
        <div className="text-white font-semibold text-sm">
          {t("internal.service")}
        </div>
        <div className="text-white font-semibold text-sm text-center">
          {t("actions.actions")}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-600">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 p-4 transition-colors cursor-pointer"
            style={{ backgroundColor: "#0B1440" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#06194d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0B1440")
            }
          >
            <div
              className="text-slate-300 text-sm cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.sla}
            </div>
            <div
              className="text-slate-300 text-sm cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.limite}
            </div>
            <div
              className="text-slate-300 text-sm cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.medido}
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              <StatusBadge status={item.status} />
            </div>
            <div
              className="text-slate-300 text-sm cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.servico || t("internal.none")}
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditService && onEditService(item);
                }}
                className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded transition-colors"
                title={t("actions.edit")}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteService && onDeleteService(item.id);
                }}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded transition-colors"
                title={t("actions.delete")}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
