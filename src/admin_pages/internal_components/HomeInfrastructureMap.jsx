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

  const mapMarkers = [
    { title: "Angola", lat: -8.858890, lon: 13.238543, status: "fail"  },
    { title: "Brasil", lat: -8.916192, lon: 14.119597, status: "server"  },
    { title: "Bolívia", lat: -15.724772, lon: 20.555587, status: "fail"  },
    { title: "CHile", lat: -18.608338, lon: -44.418713, status: "network"  },
    { title: "Africa do sul", lat: 23.922408, lon: 7.436756, status: "server"  },
    { title: "Zâmbia", lat: -27.261351, lon: 25.153665, status: "server"  },

    { title: "Nigéria", lat: -30.946409, lon: -62.561178, status: "network"  },
    { title: "Uruguai", lat: -20.680979, lon: -60.627584, status: "fail"  },
    { title: "Madagascar", lat: -17.860487, lon: 45.368508, status: "fail"  },
    { title: "Perú", lat: -8.458118, lon: 25.681008, status: "network"  },
  ]

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
        <MapView markers={mapMarkers} />
      </CustomDiv>

      {/* Legend */}
      <CustomDiv className="mt-4 flex justify-center gap-6 text-xs">
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
      </CustomDiv>
    </CustomDiv>
  );
}