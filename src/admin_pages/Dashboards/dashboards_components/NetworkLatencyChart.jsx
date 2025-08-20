import React from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';

export default function LatencyChart() {
  const generateChartData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      const baseLatency = 50 + Math.random() * 100;
      const isSpike = Math.random() > 0.9;
      const latency = isSpike ? baseLatency * 2 : baseLatency;
      data.push({ time: `1:16:${26 + i}`, latency, isSpike });
    }
    return data;
  };

  const chartData = generateChartData();
  const maxLatency = 150;

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-white text-lg font-semibold">LATÊNCIA (ms) AO</h2>
          <h2 className="text-white text-lg font-semibold">LONGO DO TEMPO</h2>
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
      
      <div className="relative h-64">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[150, 100, 50, 0].map((value) => (
            <div key={value} className="flex items-center">
              <span className="text-gray-400 text-sm w-8">{value}</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>
          ))}
        </div>
        
        {/* Chart bars */}
        <div className="absolute inset-0 ml-8 flex items-end justify-between px-2">
          {chartData.map((point, index) => {
            const cappedLatency = Math.min(point.latency, maxLatency);
            const heightPercentage = (cappedLatency / maxLatency) * 100;
            return (
              <div
                key={index}
                className={`w-2 rounded-t ${point.isSpike ? 'bg-orange-500' : 'bg-blue-400'} hover:opacity-80 transition-opacity cursor-pointer relative`}
                style={{ height: `${heightPercentage}%` }}
                title={`${point.time}: ${point.latency.toFixed(0)}ms`}
              >
                {point.latency > maxLatency && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Time labels */}
        <div className="absolute -bottom-6 ml-8 flex justify-between w-full pr-4">
          {['1:16:26 AM','1:16:26 AM','1:16:26 AM','1:16:26 AM','1:16:26 AM','1:16:26 AM'].map((time, index) => (
            <span key={index} className="text-gray-400 text-xs">{time}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
