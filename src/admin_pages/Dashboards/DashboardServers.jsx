import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// componentes internos
import HeaderActions from "./dashboards_components/ServerHeaderActions";
import ResponseErrorsCard from "./dashboards_components/ServerResponseErrorsCard";
import InteractiveTerminal from "./dashboards_components/ServerInteractiveTerminal";
import ServerStatusCard from "./dashboards_components/ServerStatusCard";
import ServerServicesOverviewCard from "./dashboards_components/ServerServicesOverviewCard";
import ServerResourcesCard from "./dashboards_components/ServerResourcesCard";
import { getEvents } from "../../api/dashboards/serverDasboards";

export default function ServerDashboard() {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState("Week");
  const [chartType, setChartType] = useState("line"); // 'line' | 'area' | 'bar'
  const [data, setData] = useState([]);
  // Simulated data - replace with real API calls

  useEffect(() => {
    // Main chart data
    // const events = getEvents();
    // console.log(events);
    const chartData = [
      { x: "X0", response: 4.5, error: 1.2 },
      { x: "X1", response: 14.2, error: 1.8 },
      { x: "X2", response: 3.8, error: 1.5 },
      { x: "X3", response: 24.1, error: 1.9 },
      { x: "X4", response: 3.9, error: 1.4 },
      { x: "X5", response: 4.5, error: 1.2 },
      { x: "X6", response: 14.2, error: 1.8 },
      { x: "X7", response: 3.8, error: 1.5 },
      { x: "X8", response: 24.1, error: 1.9 },
      { x: "X9", response: 3.9, error: 1.4 },
      { x: "X10", response: 4.5, error: 1.2 },
      { x: "X11", response: 14.2, error: 1.8 },
      { x: "X12", response: 3.8, error: 1.5 },
      { x: "X13", response: 24.1, error: 1.9 },
      { x: "X14", response: 3.9, error: 1.4 },
    ];

    setData(chartData);
  }, [timeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-[#081028]">
      {/* Header / ações */}
      <div className="p-6 text-white">
        <HeaderActions />
      </div>

      {/* Grid principal */}
      <div className="px-6 pb-6 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <ResponseErrorsCard
              data={data}
              chartType={chartType}
              setChartType={setChartType}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
            />
          </div>

          {/* Sidebar direita */}
          <div className="space-y-4">
            <ServerStatusCard />
            <ServerServicesOverviewCard />
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-8">
          <ServerResourcesCard />
        </div>
        <InteractiveTerminal className="mt-6" />
      </div>
    </div>
  );
}
