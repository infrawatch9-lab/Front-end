import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

export default function ResourcesCard({
  cpu = { usage: 23.75, label: "Alto uso" },
  ram = { usage: 7.6, total: 32, label: "Baixo Uso" },
  disk = { usage: 10, unit: "TB", free: 52, inUse: 48 }
}) {
  // cores iguais à imagem
  const COLORS = ["#F9C74F", "#C77DFF"];

  const cpuData = [
    { name: "In Use", value: cpu.usage },
    { name: "Free", value: 100 - cpu.usage },
  ];

  const ramData = [
    { name: "In Use", value: (ram.usage / ram.total) * 100 },
    { name: "Free", value: 100 - (ram.usage / ram.total) * 100 },
  ];

  const diskData = [
    { name: "In Use", value: disk.inUse },
    { name: "Free", value: disk.free },
  ];

  return (
    <div className="bg-[#0B1440] p-6 rounded-lg shadow-lg border border-[#3B5B75] w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-sm">
        {/* CPU */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2">CPU USAGE</h3>
          <PieChart width={180} height={180}>
            <Pie
              data={cpuData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}
              startAngle={90}
              endAngle={-270}
            >
              {cpuData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-[-20px] text-yellow-400 font-semibold">{cpu.label}</div>
          <div className="text-xs text-gray-300">In Use: {cpu.usage}%</div>
        </div>

        {/* RAM */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2">RAM Usage</h3>
          <PieChart width={180} height={180}>
            <Pie
              data={ramData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}
              startAngle={90}
              endAngle={-270}
            >
              {ramData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-[-20px] text-pink-400 font-semibold">{ram.label}</div>
          <div className="text-xs text-gray-300">{ram.usage}GB / {ram.total}GB</div>
          <div className="text-xs text-gray-300">
            In Use: {((ram.usage / ram.total) * 100).toFixed(2)}%
          </div>
        </div>

        {/* Disk */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2">Disc Usage</h3>
          <PieChart width={180} height={180}>
            <Pie
              data={diskData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={50}
              startAngle={90}
              endAngle={-270}
            >
              {diskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-white font-bold text-lg"
            >
              {disk.usage}{disk.unit}
            </text>
          </PieChart>
          <div className="flex gap-4 text-xs text-gray-300 mt-[-10px]">
            <span className="text-pink-400">Free {disk.free}%</span>
            <span className="text-yellow-400">In Use {disk.inUse}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
