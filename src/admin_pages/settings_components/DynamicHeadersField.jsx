import React from "react";
import { useTranslation } from "react-i18next";

export default function DynamicHeadersField({ headers, onChange, disabled }) {
  const { t } = useTranslation();
  const addHeader = () => {
    onChange([...headers, { chave: "#alertas", valor: "#alertas" }]);
  };

  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    onChange(newHeaders);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = headers.map((header, i) => 
      i === index ? { ...header, [field]: value } : header
    );
    onChange(newHeaders);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-slate-300">
          {t("settings.notifications.webhook.headers")}
        </label>
        <button
          onClick={addHeader}
          disabled={disabled}
          className={`text-xl ${disabled ? "text-slate-600" : "text-green-500 hover:text-green-400"} transition-colors`}
        >
          +
        </button>
      </div>

      <div className="space-y-3">
        {headers.map((header, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">{t("settings.notifications.webhook.key_label")}</label>
              <input
                type="text"
                value={header.chave}
                onChange={(e) => updateHeader(index, 'chave', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                disabled={disabled}
              />
            </div>
            <div className="relative">
              <label className="block text-xs text-slate-400 mb-1">{t("settings.notifications.webhook.value_label")}</label>
              <div className="flex">
                <input
                  type="text"
                  value={header.valor}
                  onChange={(e) => updateHeader(index, 'valor', e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  disabled={disabled}
                />
                <button
                  onClick={() => removeHeader(index)}
                  disabled={disabled || headers.length <= 1}
                  className={`px-2 py-2 border-l-0 border border-slate-700 rounded-r-lg ${
                    disabled || headers.length <= 1 
                      ? "text-slate-600 cursor-not-allowed" 
                      : "text-red-500 hover:text-red-400 hover:bg-slate-700"
                  } transition-colors`}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
