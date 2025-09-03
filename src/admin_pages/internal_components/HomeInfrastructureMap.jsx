import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapView } from "../../components/Map";

import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function InfrastructureMap() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  return (
    <CustomDiv className="bg-[#0B1440] p-4 rounded-lg shadow-lg border">
      <h2
        className={
          "text-white font-semibold text-sm mb-4 uppercase tracking-wide " +
          (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
        }
      >
        {t("infrastructure_map.title")}
      </h2>

      {/* World Map Container */}

      <CustomDiv className="relative bg-[#12255F] rounded-lg  h-64 overflow-hidden">
        {/* <iframe style={{ width: "100%", height: "100%" }} src="https://api.maptiler.com/maps/0198c7bb-f83b-7f40-8d4a-b216a5788fe5/?key=uQS6EdoKMHiPUygZkhQq#0.2/-9.150492/13.391056"></iframe> */}
        <MapView />
      </CustomDiv>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span
            className={
              "text-gray-400 uppercase " +
              (theme == "dark" ? "text-colors-light" : "text-colors-dark")
            }
          >
            {t("infrastructure_map.servers")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span
            className={
              "text-gray-400 uppercase " +
              (theme == "dark" ? "text-colors-light" : "text-colors-dark")
            }
          >
            {t("infrastructure_map.networks")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span
            className={
              "text-gray-400 uppercase " +
              (theme == "dark" ? "text-colors-light" : "text-colors-dark")
            }
          >
            {t("infrastructure_map.failures")}
          </span>
        </div>
      </div>
    </CustomDiv>
  );
}
