import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ExportIndividualButtons from "./ExportIndividualButtons";
import { getServices } from "../../../api/services";

const Header = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    getServices().then((data) => {
      setServices((data || []).filter((s) => s.type === "WEBHOOK"));
    });
  }, []);
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          WEBHOOK DISCORD
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <ExportIndividualButtons type="WEBHOOK" services={services} />
    </div>
  );
};

export default Header;
