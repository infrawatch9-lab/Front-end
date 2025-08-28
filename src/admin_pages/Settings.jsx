import React, { useState } from "react";
import NotificationsTab from "./settings_components/NotificationsTab";
import ThresholdsTab from "./settings_components/ThresholdsTab";
import MonitoringTab from "./settings_components/MonitoringTab";

export default function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState("notifications");

  const tabs = [
    { id: "monitoring", label: "MONITORAMENTO" },
    { id: "notifications", label: "NOTIFICAÇÕES" },
    { id: "thresholds", label: "THRESHOLDS" },
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
    <div className="min-h-screen bg-[#081028] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Configurações</h1>

        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white border border-blue-500"
                  : "bg-[#081028] text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">{renderTabContent()}</div>
    </div>
  );
}
