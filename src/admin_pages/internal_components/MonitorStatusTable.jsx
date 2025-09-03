import React from "react";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "./MonitorStatusBadge";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function StatusTable({
  data,
  searchTerm,
  onRowClick,
  onEditService,
  onDeleteService,
}) {
  const { t } = useTranslation();
  const { theme } = useTheme()
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
    <CustomDiv
      type="background"
      className="rounded border border-slate-600 overflow-hidden"
      style={{ backgroundColor: "#020E36" }}
    >
      {/* Table Header */}
      <CustomDiv type="background"
        className="grid grid-cols-6 gap-4 p-4 border-b border-slate-600"
        
      >
        <div className={"text-white font-semibold text-sm " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
          {t("internal.sla")}
        </div>
        <div className={"text-white font-semibold text-sm " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
          {t("internal.limit")}
        </div>
        <div className={"text-white font-semibold text-sm " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
          {t("internal.measured")}
        </div>
        <div className={"text-white font-semibold text-sm " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
          {t("internal.status")}
        </div>
        <div className={"text-white font-semibold text-sm " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
          {t("internal.service")}
        </div>
        <div className={"text-white font-semibold text-sm text-center " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
          {t("actions.actions")}
        </div>
      </CustomDiv>

      {/* Table Body */}
      <CustomDiv className="divide-y divide-slate-600">
        {filteredData.map((item, index) => (
          <CustomDiv
            key={index}
            className={"grid grid-cols-6 gap-4 p-4 transition-colors cursor-pointer " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}
          >
            <CustomDiv
              className={"text-slate-300 text-sm cursor-pointer " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.sla}
            </CustomDiv>
            <div
              className={"text-slate-300 text-sm cursor-pointer " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.limite}
            </div>
            <div
              className={"text-slate-300 text-sm cursor-pointer " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}
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
              className={"text-slate-300 text-sm cursor-pointer " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {item.servico || t("internal.none")}
            </div>
            <div className={"flex items-center justify-center space-x-2 " + (theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEditService && onEditService(item);
                }}
                className={"p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded transition-colors " + (theme == 'dark' ? "btn-dark-mode-fg" : "btn-light-mode-fg")}
                title={t("actions.edit")}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteService && onDeleteService(item.id);
                }}
                className={"p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded transition-colors " + (theme == 'dark' ? " btn-dark-mode-fg text-red-400 " : " btn-light-mode-fg text-red-400")}
                title={t("actions.delete")}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </CustomDiv>
        ))}
      </CustomDiv>
    </CustomDiv>
  );
}
