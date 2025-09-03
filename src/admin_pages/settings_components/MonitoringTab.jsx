import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomDiv from "../../components/CustomComponents/CustomDiv";

export default function MonitoringTab() {
  const { t } = useTranslation();
  const [configs, setConfigs] = useState({
    latenciaMaxima: "60",
    codigoStatus: "GET",
    perdaPacotes: "10",
    jitterMaximo: "60"
  });

  const handleInputChange = (field, value) => {
    setConfigs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Salvando configurações de monitoramento:", configs);
    // Aqui você implementaria a lógica de salvamento via API
  };

  const statusOptions = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
    { value: "PATCH", label: "PATCH" }
  ];

  return (
    <div className="max-w-4xl">
      <CustomDiv type="foreground" className="border border-slate-700 rounded p-6">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-white font-medium text-lg mb-2">{t("settings.monitoring.general_configs")}</h3>
          <div className="w-full h-px bg-slate-600"></div>
        </div>

        {/* Grid de Configurações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primeira linha */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.monitoring.max_latency")}
            </label>
            <input
              type="number"
              value={configs.latenciaMaxima}
              onChange={(e) => handleInputChange('latenciaMaxima', e.target.value)}
              placeholder={t("settings.common.placeholder_ex", { value: "60" })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.monitoring.expected_status")}
            </label>
            <div className="relative">
              <select
                value={configs.codigoStatus}
                onChange={(e) => handleInputChange('codigoStatus', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-slate-900">
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Segunda linha */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.monitoring.packet_loss")}
            </label>
            <input
              type="number"
              value={configs.perdaPacotes}
              onChange={(e) => handleInputChange('perdaPacotes', e.target.value)}
              placeholder={t("settings.common.placeholder_ex", { value: "10" })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.monitoring.max_jitter")}
            </label>
            <input
              type="number"
              value={configs.jitterMaximo}
              onChange={(e) => handleInputChange('jitterMaximo', e.target.value)}
              placeholder={t("settings.common.placeholder_ex", { value: "60" })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-all duration-200"
          >
            {t("settings.common.save")}
          </button>
        </div>
        </CustomDiv>
    </div>
  );
}
