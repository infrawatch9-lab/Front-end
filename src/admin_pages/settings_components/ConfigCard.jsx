import React from "react";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./ToggleSwitch";

export default function ConfigCard({ title, icon, enabled, onToggle, onSave, children }) {
  const { t } = useTranslation();
  return (
    <div className="bg-[#0B1440] border border-slate-700 rounded p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <h3 className="text-white font-medium">{title}</h3>
        </div>
        <ToggleSwitch enabled={enabled} onToggle={onToggle} />
      </div>

      {/* Content */}
      <div className={`transition-opacity duration-200 ${enabled ? "opacity-100" : "opacity-50"}`}>
        {children}
        
        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onSave}
            disabled={!enabled}
            className={`px-6 py-2 rounded text-sm font-medium transition-all duration-200 ${
              enabled
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            {t("settings.common.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
