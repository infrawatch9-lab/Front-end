import React from "react";

export default function ServicesOverviewCard({ active = 98, inactive = 10, failed = 12 }) {
  return (
    <div className="bg-[#0B1440] p-6 rounded-lg shadow-lg border border-[#3B5B75] flex flex-col gap-4">
      <div className="text-white font-semibold text-sm mb-2">Services Overview</div>
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Active:</span>
          <span className="text-green-300 font-bold">{active}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Inactive:</span>
          <span className="text-yellow-300 font-bold">{inactive}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Failed:</span>
          <span className="text-red-400 font-bold">{failed}</span>
        </div>
      </div>
    </div>
  );
}