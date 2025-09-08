import React from "react";
import { useTranslation } from "react-i18next";
import CustomDiv from "../../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../../hooks/useTheme/useTheme";

export default function StatusCard({ statusData }) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CustomDiv className="p-6 rounded shadow-lg border border-[#3B5B75]">
      <div className="flex items-center justify-between mb-6">
        <h3 className={"text-sm font-semibold" + ( theme === 'dark' ? 'text-slate-300' : 'text-white-700' )}>{t('api.http_status_code')}</h3>
        <span className="text-xs text-blue-400">{t('api.last_24h')}</span>
      </div>
      <div className="space-y-4">
        {statusData.map(item => (
          <div key={item.code} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <span className={"text-sm font-mono" + ( theme === 'dark' ? 'text-slate-300' : 'text-white-700' )}>{item.code}</span>
              <div className="w-24 h-2 bg-[#3B5B75] rounded">
                <div className="h-2 rounded" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
              </div>
            </div>
            <span className={"text-xs" + ( theme === 'dark' ? 'text-slate-300' : 'text-white-700' )}>{item.percentage}%</span>
          </div>
        ))}
      </div>
    </CustomDiv>
  );
}
