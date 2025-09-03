import {
  Server,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function SystemOverview() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const systemStats = [
    {
      id: 1,
      label: t("system_overview.services_failed"),
      value: "6",
      total: "10",
      percentage: 60,
      icon: Server,
      color: "red",
      bgColor: "bg-red-500/10",
      iconColor: "text-red-400",
      barColor: "bg-red-900",
      trend: "down",
    },
    {
      id: 2,
      label: t("system_overview.active_alerts"),
      value: "112",
      total: "203",
      percentage: 55,
      icon: AlertTriangle,
      color: "#F59E0B",
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      barColor: "bg-[#F59E0B]",
      trend: "up",
    },
    {
      id: 3,
      label: t("system_overview.availability"),
      value: "97",
      total: "100",
      percentage: 97,
      icon: CheckCircle2,
      color: "green",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400",
      barColor: "bg-green-900",
      trend: "up",
      suffix: "%",
    },
  ];

  return (
    <CustomDiv className="bg-[#0B1440] p-6 rounded shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      <CustomDiv className="flex items-center justify-between mb-6">
        <h2
          className={
            "text-xl font-bold text-white flex items-center gap-3 " +
            (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
          }
        >
          <Activity className="w-6 h-6 text-blue-400" />
          {t("system_overview.title")}
        </h2>
        <CustomDiv className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></CustomDiv>
      </CustomDiv>

      <CustomDiv className="space-y-6">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <CustomDiv
              key={stat.id}
              className="group hover:scale-[1.02] transition-all duration-300"
            >
              <CustomDiv className="flex items-center justify-between mb-3">
                <CustomDiv className="flex items-center gap-3">
                  <CustomDiv
                    className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </CustomDiv>
                  <CustomDiv className="flex flex-col">
                    <span
                      className={
                        "text-gray-200 font-medium text-sm sm:text-base " +
                        (theme == "dark"
                          ? " text-colors-light "
                          : " text-colors-dark ")
                      }
                    >
                      {stat.label}
                    </span>
                    <CustomDiv
                      className={
                        "flex items-center gap-2 mt-1 " +
                        (theme == "dark"
                          ? " text-colors-light "
                          : " text-colors-dark ")
                      }
                    >
                      <TrendingUp
                        className={`w-3 h-3 ${
                          stat.trend === "up"
                            ? "text-green-400"
                            : "text-red-400"
                        } ${stat.trend === "down" ? "rotate-180" : ""}`}
                      />
                      <span
                        className={
                          "text-xs text-gray-400 " +
                          (theme == "dark"
                            ? " text-colors-light "
                            : " text-colors-dark ")
                        }
                      >
                        {stat.trend === "up"
                          ? t("system_overview.increased")
                          : t("system_overview.decreased")}{" "}
                        {t("system_overview.last_24h")}
                      </span>
                    </CustomDiv>
                  </CustomDiv>
                </CustomDiv>
                <CustomDiv className="text-right">
                  <CustomDiv className="text-white font-bold text-lg">
                    <span
                      className={
                        theme == "dark"
                          ? " text-colors-light "
                          : " text-colors-dark "
                      }
                    >
                      {stat.value}
                      {stat.suffix || ""}/{stat.total}
                      {stat.suffix && stat.suffix !== "%" ? stat.suffix : ""}
                    </span>
                  </CustomDiv>
                  <CustomDiv className="text-gray-400 text-sm">
                    <span
                      className={
                        theme == "dark"
                          ? " text-colors-light "
                          : " text-colors-dark "
                      }
                    >
                      {stat.percentage}%
                    </span>
                  </CustomDiv>
                </CustomDiv>
              </CustomDiv>

              <CustomDiv className="relative">
                <CustomDiv
                  type="background"
                  className="w-full bg-[#1E2A5C]/60 rounded-full h-3 overflow-hidden shadow-inner"
                >
                  <div
                    className={`${stat.barColor} h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${stat.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </CustomDiv>
                <CustomDiv className="flex justify-between mt-1 text-xs text-gray-500">
                  <span
                    className={
                      theme == "dark"
                        ? " text-colors-light "
                        : " text-colors-dark "
                    }
                  >
                    0
                  </span>
                  <span
                    className={
                      theme == "dark"
                        ? " text-colors-light "
                        : " text-colors-dark "
                    }
                  >
                    {stat.total}
                    {stat.suffix || ""}
                  </span>
                </CustomDiv>
              </CustomDiv>
            </CustomDiv>
          );
        })}
      </CustomDiv>

      {/* Status geral */}
      <CustomDiv className="mt-6 pt-4 border-t border-slate-700/50">
        <CustomDiv className="flex items-center justify-between">
          <span
            className={
              "text-gray-400 text-sm " +
              (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
            }
          >
            {t("system_overview.general_status")}
          </span>
          <CustomDiv className="flex items-center gap-2">
            <CustomDiv className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></CustomDiv>
            <span className={"text-green-400 font-semibold text-sm "}>
              {t("system_overview.operational")}
            </span>
          </CustomDiv>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
}
