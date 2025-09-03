import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Server, Activity, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

const data = [
  { month: "Jan", service1: 45, service2: 25, service3: 65, service4: 35 },
  { month: "Feb", service1: 35, service2: 15, service3: 55, service4: 25 },
  { month: "Mar", service1: 55, service2: 35, service3: 75, service4: 45 },
  { month: "Apr", service1: 85, service2: 45, service3: 95, service4: 65 },
  { month: "May", service1: 75, service2: 65, service3: 85, service4: 55 },
  { month: "Jun", service1: 65, service2: 45, service3: 75, service4: 85 },
];

export default function ResourceConsumptionChart() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const services = [
    {
      key: "service1",
      label: t("resource_chart.database_service"),
      color: "#3B82F6",
      visible: true,
    },
    {
      key: "service2",
      label: t("resource_chart.api_gateway"),
      color: "#F59E0B",
      visible: true,
    },
    {
      key: "service3",
      label: t("resource_chart.web_server"),
      color: "#10B981",
      visible: true,
    },
    {
      key: "service4",
      label: t("resource_chart.cache_service"),
      color: "#8B5CF6",
      visible: true,
    },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState(
    t("resource_chart.week")
  );
  const [serviceVisibility, setServiceVisibility] = useState(
    services.reduce((acc, service) => ({ ...acc, [service.key]: true }), {})
  );

  const toggleServiceVisibility = (serviceKey) => {
    setServiceVisibility((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey],
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomDiv className="border border-slate-600 rounded p-3 shadow-xl">
          <p
            className={
              "text-gray-300 text-sm mb-2 font-medium " +
              (theme == "dark" ? " items-colors-light " : " items-colors-dark ")
            }
          >
            {label}
          </p>
          {payload.map((entry, index) => {
            const service = services.find((s) => s.key === entry.dataKey);
            return (
              <p
                key={index}
                className={
                  "text-sm flex items-center gap-2 " +
                  (theme == "dark"
                    ? " items-colors-light "
                    : " items-colors-dark ")
                }
                style={{ color: entry.color }}
              >
                <span
                  className={
                    "w-2 h-2 rounded-full " +
                    (theme == "dark"
                      ? " items-colors-light "
                      : " items-colors-dark ")
                  }
                  style={{ backgroundColor: entry.color }}
                ></span>
                {`${service?.label}: ${entry.value}%`}
              </p>
            );
          })}
        </CustomDiv>
      );
    }
    return null;
  };

  return (
    <CustomDiv className="rounded shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      {/* Header */}
      <CustomDiv className="flex justify-between items-center p-6 pb-4 rounded-xl">
        <CustomDiv className="flex items-center gap-4 ">
          <CustomDiv className="flex items-center gap-2 text-gray-300 ">
            <button
              className={
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-600/50 transition-colors " +
                (theme == "dark" ? " div-dark-mode-bg " : " div-light-mode-bg")
              }
            >
              {t("resource_chart.all_services")}
            </button>
            <span
              className={
                "text-gray-500 " +
                (theme == "dark"
                  ? " items-colors-light "
                  : " items-colors-dark ")
              }
            >
              |
            </span>
            <span
              className={
                "text-sm " +
                (theme == "dark"
                  ? " items-colors-light "
                  : " items-colors-dark ")
              }
            >
              {t("resource_chart.uptime_history")}
            </span>
          </CustomDiv>
        </CustomDiv>

        <CustomDiv className="flex items-center gap-3 ">
          <CustomDiv className="relative">
            <button
              className={
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 border border-slate-600/50 transition-colors " +
                (theme == "dark" ? " div-dark-mode-bg" : "div-light-mode-bg")
              }
            >
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </button>
          </CustomDiv>
          <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </CustomDiv>
      </CustomDiv>

      {/* Chart */}
      <CustomDiv className="px-6 pb-6 rounded-xl">
        <CustomDiv className="bg-[#0A1235]/30 rounded-lg p-4 border border-slate-700/30">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#596891ff"
                strokeOpacity={0.6}
              />
              <XAxis
                dataKey="month"
                stroke={theme == "dark" ? "#f5f5f5" : "#0B143F"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: theme == "dark" ? "#f5f5f5" : "#0B143F" }}
              />
              <YAxis
                stroke={theme == "dark" ? "#f5f5f5" : "#0B143F"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: theme == "dark" ? "#f5f5f5" : "#0B143F" }}
              />
              <Tooltip content={<CustomTooltip />} />

              {services.map(
                (service) =>
                  serviceVisibility[service.key] && (
                    <Line
                      key={service.key}
                      type="monotone"
                      dataKey={service.key}
                      stroke={service.color}
                      strokeWidth={2.5}
                      dot={{
                        r: 4,
                        fill: service.color,
                        strokeWidth: 2,
                        stroke: "#0B1440",
                      }}
                      activeDot={{
                        r: 6,
                        fill: service.color,
                        strokeWidth: 3,
                        stroke: "#0B1440",
                        style: {
                          filter:
                            "drop-shadow(0px 0px 8px rgba(255,255,255,0.3))",
                        },
                      }}
                    />
                  )
              )}
            </LineChart>
          </ResponsiveContainer>
        </CustomDiv>

        {/* Services Legend */}
        <CustomDiv className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700/50">
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => toggleServiceVisibility(service.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                serviceVisibility[service.key]
                  ? "bg-slate-700/50 text-white"
                  : "bg-slate-800/30 text-gray-500 hover:text-gray-300"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full transition-opacity ${
                  serviceVisibility[service.key] ? "opacity-100" : "opacity-50"
                }`}
                style={{ backgroundColor: service.color }}
              ></span>
              {service.label}
            </button>
          ))}
        </CustomDiv>

        {/* Status Footer */}
        <CustomDiv className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-slate-700/50 gap-4">
          <CustomDiv className="flex items-center gap-2 text-gray-400 text-sm">
            <CustomDiv className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></CustomDiv>
            <span
              className={
                theme == "dark" ? " items-colors-light " : " items-colors-dark "
              }
            >
              {t("resource_chart.last_update")}
            </span>
          </CustomDiv>
          <CustomDiv className="flex items-center gap-6 text-sm">
            <CustomDiv className="flex items-center gap-2">
              <span
                className={
                  "text-gray-400 " +
                  (theme == "dark"
                    ? " items-colors-light "
                    : " items-colors-dark ")
                }
              >
                {t("resource_chart.avg_uptime")}
              </span>
              <span className="text-green-400 font-medium">96.8%</span>
            </CustomDiv>
            <CustomDiv className="flex items-center gap-2">
              <span
                className={
                  "text-gray-400 " +
                  +(theme == "dark"
                    ? " items-colors-light "
                    : " items-colors-dark ")
                }
              >
                {t("resource_chart.status")}
              </span>
              <span className="text-green-400 font-medium">
                {t("resource_chart.operational")}
              </span>
            </CustomDiv>
          </CustomDiv>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
}
