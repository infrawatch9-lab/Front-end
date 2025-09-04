import React from "react";
import CustomDiv from "../../../components/CustomComponents/CustomDiv";

export default function StatusCard({
  status = "ONLINE",
  uptime = "16d 12h 28m",
  lastUpdate = "10 min ago",
  latency = "321 ms",
}) {
  const statusColor = status === "ONLINE" ? "bg-green-400" : "bg-red-400";

  return (
    <CustomDiv type="foreground" className="p-6 rounded border border-[#3B5B75] text-sm w-100 h-60 flex flex-col gap-4">
      {/* Cabeçalho */}
      <div className="text-gray-400 text-sm">status</div>
      
      {/* Linha status */}
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
        <span className="text-white font-bold text-lg">{status}</span>
      </div>

      {/* Infos */}
      <div className="flex flex-col gap-2 text-gray-300 text-sm">
        <div>
          uptime: <span className="text-white font-medium">{uptime}</span>
        </div>
        <div>
          Última atualização: <span className="text-white font-medium">{lastUpdate}</span>
        </div>
        <div>
          Latência: <span className="text-white font-medium">{latency}</span>
        </div>
      </div>
    </CustomDiv>
  );
}
