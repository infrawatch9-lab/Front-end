import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationsTab from "./settings_components/NotificationsTab";
import ThresholdsTab from "./settings_components/ThresholdsTab";
import MonitoringTab from "./settings_components/MonitoringTab";
import AccessPermissionsTab from "./settings_components/AccessPermissionsTab";
import { useTheme } from "../hooks/useTheme/useTheme";
import CustomDiv from "../components/CustomComponents/CustomDiv";

export default function SettingsAdmin() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("notifications");
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: "monitoring", label: t("settings.tabs.monitoring") },
    { id: "notifications", label: t("settings.tabs.notifications") },
    { id: "thresholds", label: t("settings.tabs.thresholds") },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationsTab />;
      case "thresholds":
        return <ThresholdsTab />;
      case "monitoring":
        return <MonitoringTab />;
      default:
        return <NotificationsTab />;
    }
  };

  return (
    <CustomDiv type="background" className="min-h-screen bg-[#081028] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">{t("settings.title")}</h1>

        {/* Tabs Navigation */}
        <div
          className={
            "flex gap-4 mb-8 " +
            (theme == "dark" ? " items-colors-light " : " items-colors-dark ")
          }
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                `px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white border border-blue-500"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
                }` +
                (theme == "dark"
                  ? " items-colors-light "
                  : " items-colors-dark ")
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">{renderTabContent()}</div>
    </CustomDiv>
  );
}
