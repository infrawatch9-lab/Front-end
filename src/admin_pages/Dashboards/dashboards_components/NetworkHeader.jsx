import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ExportIndividualButtons from "./ExportIndividualButtons";
import { getServices } from "../../../api/services";
import { useTheme } from "../../../hooks/useTheme/useTheme";

export default function Header() {
  const [services, setServices] = useState([]);
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    getServices().then((data) => {
      setServices((data || []).filter((s) => s.type === "NETWORK"));
    });
  }, []);
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button className={"flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors "
          + ( theme == 'dark' ? ' btn-dark-mode-fg ' : " btn-light-mode-fg " )
        } >
          GOOGLE DNS
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <ExportIndividualButtons type="NETWORK" services={services} />
    </div>
  );
}
