import { PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import { apiUrl } from "../../../api/confg";

function ServerResourcesCard() {
  const COLORS = ["#F9C74F", "#C77DFF"];
  const [resourceData, setResourceData] = useState(null);

  useEffect(() => {
    const source = new EventSource(`${apiUrl}/dashboard/dash/test-sse`);
    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setResourceData(parsed);
      } catch (e) {
        console.error("Erro ao processar evento SSE:", e);
      }
    };
    return () => {
      source.close();
    };
  }, []);

  if (
    !resourceData ||
    !resourceData.cpuData ||
    !resourceData.ram ||
    !resourceData.disk
  ) {
    return <div className="text-white">Carregando recursos...</div>;
  }

  const cpuData = [
    { name: "In Use", value: resourceData.cpuData.usage },
    { name: "Free", value: 100 - resourceData.cpuData.usage },
  ];
  const ramData = [
    {
      name: "In Use",
      value: (resourceData.ram.usage / resourceData.ram.total) * 100,
    },
    {
      name: "Free",
      value: 100 - (resourceData.ram.usage / resourceData.ram.total) * 100,
    },
  ];
  const diskData = [
    { name: "In Use", value: resourceData.disk.inUse },
    { name: "Free", value: resourceData.disk.free },
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
                <Cell key={`cell-cpu-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-[-20px] text-yellow-400 font-semibold">
            {resourceData.cpuData.label}
          </div>
          <div className="text-xs text-gray-300">
            In Use: {resourceData.cpuData.usage}%
          </div>
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
                <Cell key={`cell-ram-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-[-20px] text-pink-400 font-semibold">
            {resourceData.ram.label}
          </div>
          <div className="text-xs text-gray-300">
            {resourceData.ram.usage}GB / {resourceData.ram.total}GB
          </div>
          <div className="text-xs text-gray-300">
            In Use:{" "}
            {((resourceData.ram.usage / resourceData.ram.total) * 100).toFixed(
              2
            )}
            %
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
                <Cell key={`cell-disk-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-white font-bold text-lg"
            >
              {resourceData.disk.usage}
              {resourceData.disk.unit}
            </text>
          </PieChart>
          <div className="flex gap-4 text-xs text-gray-300 mt-[-10px]">
            <span className="text-pink-400">
              Free {resourceData.disk.free}%
            </span>
            <span className="text-yellow-400">
              In Use {resourceData.disk.inUse}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerResourcesCard;
