import React from "react";
import { useTranslation } from 'react-i18next';
import { ChevronDown, BarChart3 } from "lucide-react";
import Header from "./dashboards_components/WebhooksHeader";
import LatencyMetrics from "./dashboards_components/WebhooksLatencyMetrics";
import LatencyAreaChart from "./dashboards_components/WebhooksLatencyAreaChart";
import StatusPanel from "./dashboards_components/WebhooksStatusPanel";
import ExecutionsTable from "./dashboards_components/WebhooksExecutionsTable";

const WebhookDashboard = () => {
  return (
    <div className="min-h-screen bg-[#081028] p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="col-span-3">
            <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-lg font-semibold">Latência</h2>
                  <p className="text-gray-400 text-sm">ms</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-white hover:text-gray-300">
                    Week <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 text-white hover:text-gray-300">
                    <BarChart3 className="w-4 h-4" />
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="text-white hover:text-gray-300">⋯</button>
                </div>
              </div>

              <LatencyMetrics />
              <LatencyAreaChart />
            </div>
          </div>

          <div className="col-span-1">
            <StatusPanel />
          </div>
        </div>

        <ExecutionsTable />
      </div>
    </div>
  );
};

export default WebhookDashboard;

