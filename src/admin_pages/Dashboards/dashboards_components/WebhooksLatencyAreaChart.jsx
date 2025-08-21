import React, { useMemo } from "react";

const LatencyAreaChart = () => {
  const generateLatencyData = useMemo(() => {
    const dataPoints = 30;
    const data = [];

    for (let i = 0; i < dataPoints; i++) {
      const baseLatency = 800 + Math.sin(i * 0.3) * 600;
      const noise = (Math.random() - 0.5) * 400;
      const spike = i === 4 || i === 15 || i === 28 ? 800 : 0;
      const latency = Math.max(100, baseLatency + noise + spike);

      data.push({ x: i + 1, y: latency, time: i + 1 });
    }
    return data;
  }, []);

  const chartConfig = {
    width: 100,
    height: 300,
    padding: { top: 20, right: 40, bottom: 40, left: 60 },
    yMax: 2500,
    yMin: 0,
  };

  const chartWidth = 800;
  const chartHeight =
    chartConfig.height - chartConfig.padding.top - chartConfig.padding.bottom;

  const getPointCoordinates = (dataPoint, index) => {
    const x = (index / (generateLatencyData.length - 1)) * chartWidth;
    const y =
      chartHeight -
      ((dataPoint.y - chartConfig.yMin) /
        (chartConfig.yMax - chartConfig.yMin)) *
        chartHeight;
    return { x, y };
  };

  const generateAreaPath = () => {
    if (generateLatencyData.length === 0) return "";

    let path = "";

    generateLatencyData.forEach((point, index) => {
      const coords = getPointCoordinates(point, index);
      if (index === 0) {
        path += `M ${coords.x} ${coords.y}`;
      } else {
        path += ` L ${coords.x} ${coords.y}`;
      }
    });

    path += ` L ${chartWidth} ${chartHeight}`;
    path += ` L 0 ${chartHeight}`;
    path += " Z";

    return path;
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${
          chartWidth + chartConfig.padding.left + chartConfig.padding.right
        } ${chartConfig.height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="latencyGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#3B82F6", stopOpacity: 0.8 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#1E40AF", stopOpacity: 0.6 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#1E3A8A", stopOpacity: 0.2 }}
            />
          </linearGradient>
        </defs>

        {[0, 250, 500, 750, 1000, 1500, 2000, 2500].map((value) => (
          <g key={value}>
            <line
              x1={chartConfig.padding.left}
              y1={
                chartConfig.padding.top +
                chartHeight -
                (value / chartConfig.yMax) * chartHeight
              }
              x2={chartConfig.padding.left + chartWidth}
              y2={
                chartConfig.padding.top +
                chartHeight -
                (value / chartConfig.yMax) * chartHeight
              }
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray={value === 0 ? "none" : "2,2"}
            />
            <text
              x={chartConfig.padding.left - 10}
              y={
                chartConfig.padding.top +
                chartHeight -
                (value / chartConfig.yMax) * chartHeight +
                4
              }
              fill="#9CA3AF"
              fontSize="12"
              textAnchor="end"
            >
              {value}
            </text>
          </g>
        ))}

        {[1, 5, 10, 15, 20, 25, 30].map((timeValue) => {
          const x =
            chartConfig.padding.left + ((timeValue - 1) / 29) * chartWidth;
          return (
            <g key={timeValue}>
              <line
                x1={x}
                y1={chartConfig.padding.top}
                x2={x}
                y2={chartConfig.padding.top + chartHeight}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x={x}
                y={chartConfig.padding.top + chartHeight + 20}
                fill="#9CA3AF"
                fontSize="12"
                textAnchor="middle"
              >
                {timeValue}
              </text>
            </g>
          );
        })}

        <g transform={`translate(${chartConfig.padding.left}, ${chartConfig.padding.top})`}>
          <path d={generateAreaPath()} fill="url(#latencyGradient)" strokeWidth="0" />
        </g>
      </svg>
    </div>
  );
};

export default LatencyAreaChart;
