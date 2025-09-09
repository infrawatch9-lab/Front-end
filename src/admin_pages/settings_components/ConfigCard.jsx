import React from "react";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./ToggleSwitch";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function ConfigCard({ 
  title, 
  icon, 
  enabled, 
  onToggle, 
  onSave, 
  children, 
  loading = false, 
  message = null 
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CustomDiv type="foreground" className="border border-slate-700 rounded p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <h3 className={"font-medium" + (theme === "dark" ? " text-slate-300 " : " text-white-700 ")}>{title}</h3>
        </div>
        <ToggleSwitch enabled={enabled} onToggle={onToggle}/>
      </div>

      {/* Content */}
      <div className={`transition-opacity duration-200 ${enabled ? "opacity-100" : "opacity-50"}`}>
        {/* Mensagem de feedback */}
        {message && message.text && (
          <div
            className={`mb-4 p-3 rounded border ${
              message.type === "success"
                ? "bg-green-900 border-green-600 text-green-300"
                : "bg-red-900 border-red-600 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}
        
        {children}
        
        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onSave}
            disabled={!enabled || loading}
            className={`px-6 py-2 rounded text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              enabled && !loading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>
              {loading ? t("settings.common.saving") || "Salvando..." : t("settings.common.save")}
            </span>
          </button>
        </div>
      </div>
    </CustomDiv>
  );
}
