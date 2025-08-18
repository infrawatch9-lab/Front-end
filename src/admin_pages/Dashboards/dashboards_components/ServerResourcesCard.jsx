import React from "react";

export default function ResourcesCard({
  cpu = { usage: 23.75, label: "Alto uso" },
  ram = { usage: 7.6, total: 32, label: "Baixo Uso" },
  disk = { usage: 10, unit: "TB", free: 52, inUse: 48 }
}) {
  return (
    <div className="bg-[#0B1440] p-6 rounded-lg shadow-lg border border-[#3B5B75]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white">
        {/* CPU */}
        <div className="flex flex-col items-center">
          <div className="mb-2 font-semibold">CPU USAGE</div>
          <div className="w-20 h-20 rounded-full bg-[#1B223F] flex items-center justify-center mb-2">
            <span className="text-yellow-300 text-lg font-bold">{cpu.usage}%</span>
          </div>
          <div className="text-yellow-300">{cpu.label}</div>
        </div>
        {/* RAM */}
        <div className="flex flex-col items-center">
          <div className="mb-2 font-semibold">RAM Usage</div>
          <div className="w-20 h-20 rounded-full bg-[#1B223F] flex items-center justify-center mb-2">
            <span className="text-blue-400 text-lg font-bold">{ram.usage}GB</span>
          </div>
          <div className="text-blue-400">{ram.label}</div>
          <div className="text-gray-400">{ram.usage}GB / {ram.total}GB</div>
        </div>
        {/* Disco */}
        <div className="flex flex-col items-center">
          <div className="mb-2 font-semibold">Disc Usage</div>
          <div className="w-20 h-20 rounded-full bg-[#1B223F] flex items-center justify-center mb-2">
            <span className="text-pink-400 text-lg font-bold">{disk.usage}{disk.unit}</span>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="text-yellow-300">Free {disk.free}%</span>
            <span className="text-pink-400">In Use {disk.inUse}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}