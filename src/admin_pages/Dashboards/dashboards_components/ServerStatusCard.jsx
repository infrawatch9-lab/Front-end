import React from "react";

export default function StatusCard({ status = "ONLINE", uptime = "16d 12h 28m", lastUpdate = "10 min ago", latency = "321 ms" }) {
  const statusColor = status === "ONLINE" ? "bg-green-400" : "bg-red-400";
  return (
    <div className="bg-[#0B1440] p-6 rounded-lg shadow-lg border border-[#3B5B75] flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
        <span className="text-green-300 font-bold text-sm">{status}</span>
      </div>
      <div className="text-xs text-gray-400">
        <div>uptime: <span className="text-white">{uptime}</span></div>
        <div>Última atualização: <span className="text-white">{lastUpdate}</span></div>
        <div>Latência: <span className="text-white">{latency}</span></div>
      </div>
    </div>
  );
}