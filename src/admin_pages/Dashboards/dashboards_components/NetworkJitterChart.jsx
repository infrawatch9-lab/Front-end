import React, { useState, useMemo } from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';
import CustomDiv from '../../../components/CustomComponents/CustomDiv';
import { useTheme } from '../../../hooks/useTheme/useTheme';

export default function NetworkJitterChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const { theme } = useTheme()
  const generateJitterData = () => {
    const dataPoints = 100;
    const maximoData = [];
    const jitterData = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const maximoBase = 2.5 + Math.sin(i * 0.1) * 0.8;
      const maximoNoise = (Math.random() - 0.5) * 0.6;
      const maximoValue = Math.max(1.5, maximoBase + maximoNoise);

      const jitterBase = 0.8 + Math.sin(i * 0.05) * 0.3;
      const jitterNoise = (Math.random() - 0.5) * 0.2;
      const jitterValue = Math.max(0.1, jitterBase + jitterNoise);

      maximoData.push({
        x: i,
        y: maximoValue,
        time: 10 + (i * 32 / dataPoints),
      });

      jitterData.push({
        x: i,
        y: jitterValue,
        time: 10 + (i * 32 / dataPoints),
      });
    }
    
    return { maximoData, jitterData };
  };

  const { maximoData, jitterData } = useMemo(() => generateJitterData(), []);

  const chartConfig = {
    width: 1000,
    height: 280,
    padding: { top: 20, right: 60, bottom: 40, left: 40 },
    yMax: 5,
    yMin: 0,
  };

  const chartWidth = chartConfig.width - chartConfig.padding.left - chartConfig.padding.right;
  const chartHeight = chartConfig.height - chartConfig.padding.top - chartConfig.padding.bottom;

  const getPointCoordinates = (dataPoint, index) => {
    const x = (index / (maximoData.length - 1)) * chartWidth;
    const y = chartHeight - ((dataPoint.y - chartConfig.yMin) / (chartConfig.yMax - chartConfig.yMin)) * chartHeight;
    return { x, y };
  };

  const generatePath = (data, area = true) => {
    if (data.length === 0) return '';
    let path = '';

    data.forEach((point, index) => {
      const coords = getPointCoordinates(point, index);
      if (index === 0) {
        path += `M ${coords.x} ${coords.y}`;
      } else {
        path += ` L ${coords.x} ${coords.y}`;
      }
    });

    if (area) {
      path += ` L ${chartWidth} ${chartHeight}`;
      path += ` L 0 ${chartHeight}`;
      path += ' Z';
    }
    return path;
  };

  return (
    <CustomDiv className="bg-[#0B1440] rounded-lg p-6 w-full border border-[#3B5B75]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 text-center">
          <h2 className={"text-white text-xl font-semibold tracking-wider "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>JITTER</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className={"flex items-center gap-2 text-white hover:text-gray-300 transition-colors "  + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")}
            onClick={() => setSelectedPeriod(selectedPeriod === 'Week' ? 'Day' : 'Week')}
          >
            {selectedPeriod} <ChevronDown className="w-4 h-4" />
          </button>
          <button className={"flex items-center gap-2 text-white hover:text-gray-300 transition-colors "  + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")}>
            <BarChart3 className="w-4 h-4" />
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className={"text-white hover:text-gray-300 transition-colors text-lg "  + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg ")}>⋯</button>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex justify-end gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span className={"text-white text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>MÁXIMO</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-sm"></div>
          <span className={"text-white text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>JITTER</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative">
        <svg width={chartConfig.width} height={chartConfig.height} className="overflow-visible">
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <g key={value}>
              <line
                x1={chartConfig.padding.left}
                y1={chartConfig.padding.top + chartHeight - ((value / chartConfig.yMax) * chartHeight)}
                x2={chartConfig.padding.left + chartWidth}
                y2={chartConfig.padding.top + chartHeight - ((value / chartConfig.yMax) * chartHeight)}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray={value === 0 ? "none" : "2,2"}
              />
              <text
                x={chartConfig.padding.left - 10}
                y={chartConfig.padding.top + chartHeight - ((value / chartConfig.yMax) * chartHeight) + 4}
                fill={( theme == 'dark' ? " white " : " #0b143f " )}
                fontSize="12"
                textAnchor="end"
              >
                Y{value}
              </text>
            </g>
          ))}

          {/* Grid do tempo */}
          {[10, 12, 20, 22, 42].map((timeValue, index) => {
            const x = chartConfig.padding.left + (index / 4) * chartWidth;
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
                  fill={( theme == 'dark' ? " white " : " #0b143f " )}
                  fontSize="12"
                  textAnchor="middle"
                >
                  {timeValue}
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="jitterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#F59E0B', stopOpacity: 0.8}} />
              <stop offset="50%" style={{stopColor: '#D97706', stopOpacity: 0.6}} />
              <stop offset="100%" style={{stopColor: '#92400E', stopOpacity: 0.3}} />
            </linearGradient>
            <linearGradient id="maximoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.4}} />
              <stop offset="100%" style={{stopColor: '#1E40AF', stopOpacity: 0.1}} />
            </linearGradient>
          </defs>

          <g transform={`translate(${chartConfig.padding.left}, ${chartConfig.padding.top})`}>
            <path d={generatePath(maximoData)} fill="url(#maximoGradient)" strokeWidth="0" />
            <path d={generatePath(jitterData)} fill="url(#jitterGradient)" strokeWidth="0" />
            <path d={generatePath(maximoData, false)} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </CustomDiv>
  );
}
