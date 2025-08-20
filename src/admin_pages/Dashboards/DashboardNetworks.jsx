import React, { useState, useEffect } from 'react';
import Header from './dashboards_components/NetworkHeader';
import LatencyChart from './dashboards_components/NetworkLatencyChart';
import StatusPanel from './dashboards_components/NetworkStatusPanel';
import MetricsGrid from './dashboards_components/NetworkMetricsGrid';
import NetworkJitterChart from './dashboards_components/NetworkJitterChart';

export default function NetworkDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="col-span-3">
            <LatencyChart />
          </div>
          <div className="col-span-1">
            <StatusPanel />
          </div>
        </div>
        
        <MetricsGrid />

        {/* Novo gráfico Jitter abaixo de tudo */}
        <div className="mt-6">
          <NetworkJitterChart />
        </div>
      </div>
    </div>
  );
}
