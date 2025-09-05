import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ExportIndividualButtons from "./ExportIndividualButtons";
import { getServices } from "../../../api/services";
import { useTheme } from "../../../hooks/useTheme/useTheme";

export default function HeaderActions({ onNew, onShowAll, onExplorer }) {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const { theme } = useTheme()
  useEffect(() => {
    getServices().then((data) => {
      setServices((data || []).filter((s) => s.type === "SERVER"));
    });
  }, []);
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <select
          className={"bg-[#010E37] border border-[#3B5B75] rounded px-3 py-1 text-sm text-gray-300 " 
            + ( theme == 'dark' ? "div-dark-mode-fg" : " div-light-mode-fg " )
          }
          value={t("server.all_api_services")}
          onChange={() => {}}
        >
          <option>{t("server.all_api_services")}</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onNew}
          className={"px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm transition-colors "  + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")}
        >
          {t("server.new")}
        </button>
        <button
          onClick={onShowAll}
          className={"px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm transition-colors "  + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")}
        >
          {t("server.show_all")}
        </button>
        <button
          onClick={onExplorer}
          className={"px-3 py-1 bg-[#0B1440] text-gray-300 rounded text-sm transition-colors "  + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")}
        >
          {t("server.explorer")}
        </button>
        <ExportIndividualButtons type="SERVER" services={services} />
      </div>
    </div>
  );
}
