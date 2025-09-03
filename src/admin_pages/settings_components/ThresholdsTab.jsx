import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomDiv from "../../components/CustomComponents/CustomDiv";

export default function ThresholdsTab() {
  const { t } = useTranslation();
  const [configs, setConfigs] = useState({
    intervalo1: "60",
    intervalo2: "60", 
    intervalo3: "60",
    intervalo4: "60"
  });

  const handleInputChange = (field, value) => {
    setConfigs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Salvando configurações de thresholds:", configs);
    // Aqui você implementaria a lógica de salvamento via API
  };

  return (
    <div className="max-w-4xl">
      <CustomDiv type="foreground" className="border border-slate-700 rounded p-6">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-white font-medium text-lg mb-2">{t("settings.thresholds.general_configs")}</h3>
          <div className="w-full h-px bg-slate-600"></div>
        </div>

        {/* Grid de Configurações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primeira linha */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.thresholds.check_interval")}
            </label>
            <input
              type="number"
              value={configs.intervalo1}
              onChange={(e) => handleInputChange('intervalo1', e.target.value)}
              placeholder={t("settings.common.placeholder_ex", { value: "60" })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.thresholds.check_interval")}
            </label>
            <input
              type="number"
              value={configs.intervalo2}
              onChange={(e) => handleInputChange('intervalo2', e.target.value)}
              placeholder={t("settings.common.placeholder_ex", { value: "60" })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Segunda linha */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.thresholds.check_interval")}
            </label>
            <input
              type="number"
              value={configs.intervalo3}
              onChange={(e) => handleInputChange('intervalo3', e.target.value)}
              placeholder={t("settings.common.placeholder_ex", { value: "60" })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t("settings.thresholds.check_interval")}
            </label>
            <input
              type="number"
              value={configs.intervalo4}
              onChange={(e) => handleInputChange('intervalo4', e.target.value)}
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
