import React from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomDiv from "../../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../../hooks/useTheme/useTheme";

export default function ResponseErrorsCard({
  data,
  chartType,
  setChartType,
  timeFilter,
  setTimeFilter,
}) {
  const { t } = useTranslation();
  const {theme} = useTheme()
  const Chart = () => {
    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3B5B75" />
              <XAxis dataKey="x" tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme == 'dark' ? "#0B1440" : '#ebebebff',
                  border: "1px solid " + (theme == 'dark' ? "#101c58ff" : '#ffffff'),
                  color: "#white",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="response"
                stackId="1"
                stroke="#60A5FA"
                fill="#60A5FA"
                fillOpacity={0.6}
                name={t('server.response')}
              />
              <Area
                type="monotone"
                dataKey="error"
                stackId="1"
                stroke="#34D399"
                fill="#34D399"
                fillOpacity={0.6}
                name={t('server.error')}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3B5B75" />
              <XAxis dataKey="x" tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme == 'dark' ? "#0B1440" : '#ebebebff',
                  border: "1px solid " + (theme == 'dark' ? "#101c58ff" : '#ffffff'),
                  color: "#white",
                }}
              />
              <Legend />
              <Bar dataKey="response" fill="#60A5FA" name="Response" />
              <Bar dataKey="error" fill="#34D399" name="Error" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3B5B75" />
              <XAxis dataKey="x" tick={{ fill: ( theme == 'dark' ? "#f5f5f5" : "#0b143f"), fontSize: 12 }} />
              <YAxis tick={{ fill: ( theme == 'dark' ? "#f5f5f5" : "#0b143f"), fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme == 'dark' ? "#0B1440" : '#ebebebff',
                  border: "1px solid " + (theme == 'dark' ? "#101c58ff" : '#ffffff'),
                  color: "#white",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="response"
                stroke="#60A5FA"
                strokeWidth={2}
                name="Response"
                dot={{ fill: "#60A5FA", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="error"
                stroke="#34D399"
                strokeWidth={2}
                name="Error"
                dot={{ fill: "#34D399", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <CustomDiv type="foreground" className="rounded p-6 border border-[#3B5B75]">
      <div className="flex items-center justify-between mb-6">
        <h2 className={"text-lg font-semibold text-white "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>RESPONSE & ERRORS</h2>

        <div className="flex items-center space-x-4">
          {/* tipo de gráfico */}
          <CustomDiv type="background" className="flex items-center gap-2 bg-[#0E1A3D] rounded-lg p-1 border border-[#3B5B75]">
            <button
              onClick={() => setChartType("line")}
              className={`px-3 py-1 rounded text-xs transition-colors ${( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")} ${
                chartType === "line"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
              }` }
              title="Line Chart"
              >
              Line
            </button>
            <button
              onClick={() => setChartType("area")}
              className={`px-3 py-1 rounded text-xs transition-colors ${( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")} ${
                chartType === "area"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
              }`}
              title="Area Chart"
              >
              Wave
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 rounded text-xs transition-colors ${( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")} ${
                chartType === "bar"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
              }`}
              title="Bar Chart"
              >
              Bar
            </button>
          </CustomDiv>

          {/* filtro de tempo (controla os dados do dashboard inteiro) */}
          <select
            className={" border border-[#3B5B75] rounded px-2 py-1 text-xs text-gray-300 "  + ( theme == 'dark' ? " div-dark-mode-bg " : " div-light-mode-bg ")}
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            >
            <option>Week</option>
            <option>Day</option>
            <option>Month</option>
          </select>

          {/* legenda */}
          <CustomDiv className="flex items-center space-x-4 text-xs">
            <CustomDiv className="flex items-center">
              <div className="w-3 h-0.5 bg-blue-400 mr-2"></div>
              <span className={"text-gray-400 " + (theme == 'dark' ? " text-colors-light " : "text-colors-dark")}>Response</span>
            </CustomDiv>
            <CustomDiv className="flex items-center">
              <div className="w-3 h-0.5 bg-green-400 mr-2"></div>
              <span className={"text-gray-400 " + (theme == 'dark' ? " text-colors-light " : "text-colors-dark")}>Error</span>
            </CustomDiv>
          </CustomDiv>
        </div>
      </div>

      <div className="h-96">
        <Chart />
      </div>
    </CustomDiv>
  );
}
