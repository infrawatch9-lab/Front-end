import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

// Dados baseados na imagem fornecida - padrão mais realista
const incidentData = [
  { month: "Jan", blue: 85, red: 45 },
  { month: "Feb", blue: 72, red: 38 },
  { month: "Mar", blue: 95, red: 52 },
  { month: "Apr", blue: 68, red: 35 },
  { month: "May", blue: 78, red: 42 },
  { month: "Jun", blue: 82, red: 48 },
  { month: "Jul", blue: 90, red: 55 },
  { month: "Aug", blue: 75, red: 40 },
  { month: "Sep", blue: 88, red: 45 },
  { month: "Oct", blue: 92, red: 58 },
  { month: "Nov", blue: 86, red: 50 },
  { month: "Dec", blue: 79, red: 44 },
];

export default function IncidentHistoryChart() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomDiv className="bg-[#0B1440] border border-slate-600 rounded p-3 shadow-xl">
          <p
            className={
              "text-gray-300 text-sm font-medium mb-2 " +
              (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
            }
          >
            {label}
          </p>

          {payload.map((entry, index) => (
            <CustomDiv key={index} className="flex items-center gap-2 text-sm">
              <CustomDiv
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span
                className={
                  "text-gray-300 " +
                  (theme == "dark"
                    ? " text-colors-light "
                    : " text-colors-dark ")
                }
              >
                {entry.dataKey === "blue"
                  ? t("internal.incident")
                  : t("internal.critical")}
                :
              </span>
              <span
                className={
                  "font-medium text-white " +
                  (theme == "dark"
                    ? " text-colors-light "
                    : " text-colors-dark ")
                }
              >
                {entry.value}
              </span>
            </CustomDiv>
          ))}
        </CustomDiv>
      );
    }
    return null;
  };

  return (
    <CustomDiv className="bg-[#0B1440] border p-4 rounded shadow-lg">
      {/* Header */}
      <CustomDiv className="flex justify-between items-center mb-4">
        <h2
          className={
            "text-white font-semibold text-sm " +
            (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
          }
        >
          {t("internal.incident_history")}
        </h2>
        <CustomDiv className="flex gap-2 text-xs items-center">
          <button
            className={
              "bg-[#162050] text-gray-300 px-3 py-1 rounded text-xs transition-colors " +
              (theme == "dark" ? " div-dark-mode-bg " : " div-light-mode-bg ")
            }
          >
            {t("internal.all")}
          </button>
          <button
            className={
              "bg-[#162050] text-gray-300 px-3 py-1 rounded text-xs transition-colors " +
              (theme == "dark" ? " div-dark-mode-bg " : " div-light-mode-bg ")
            }
          >
            {t("internal.escalar")}
          </button>
          <button
            className={
              "bg-[#162050] text-gray-300 px-3 py-1 rounded text-xs transition-colors " +
              (theme == "dark" ? " div-dark-mode-bg " : " div-light-mode-bg ")
            }
          >
            {t("internal.analyze")}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors text-lg leading-none">
            ⋯
          </button>
        </CustomDiv>
      </CustomDiv>

      {/* Chart */}
      <CustomDiv className="relative">
        {/* Y-axis labels */}
        <CustomDiv className="absolute left-0 top-0 h-[200px] flex flex-col justify-between text-xs text-gray-400 -ml-2">
          <span
            className={
              theme == "dark" ? " text-colors-light " : " text-colors-dark "
            }
          >
            100%
          </span>
          <span
            className={
              theme == "dark" ? " text-colors-light " : " text-colors-dark "
            }
          >
            80%
          </span>
          <span
            className={
              theme == "dark" ? " text-colors-light " : " text-colors-dark "
            }
          >
            60%
          </span>
          <span
            className={
              theme == "dark" ? " text-colors-light " : " text-colors-dark "
            }
          >
            40%
          </span>
          <span
            className={
              theme == "dark" ? " text-colors-light " : " text-colors-dark "
            }
          >
            20%
          </span>
          <span
            className={
              theme == "dark" ? " text-colors-light " : " text-colors-dark "
            }
          >
            0%
          </span>
        </CustomDiv>

        <CustomDiv className="ml-8">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={incidentData}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="2 2"
                stroke="#1E2A5C"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={theme == "dark" ? "#f5f5f5" : "#0B143F"}
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fill: theme == "dark" ? "#f5f5f5" : "#0B143F" }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="blue"
                fill="#3B82F6"
                radius={[1, 1, 0, 0]}
                name="Incidentes"
              />
              <Bar
                dataKey="red"
                fill="#EF4444"
                radius={[1, 1, 0, 0]}
                name="Críticos"
              />
            </BarChart>
          </ResponsiveContainer>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
}
