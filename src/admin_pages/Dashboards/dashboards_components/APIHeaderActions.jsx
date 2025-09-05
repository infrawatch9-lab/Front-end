import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ExportIndividualButtons from "./ExportIndividualButtons";
import { getServices } from "../../../api/services";

export default function HeaderActions({ type = "API" }) {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  useEffect(() => {
    getServices().then((data) => {
      setServices((data || []).filter((s) => s.type === type));
    });
  }, [type]);
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <select
          className="bg-[#010E37] border border-[#3B5B75] rounded px-3 py-1 text-sm text-gray-300"
          value={t("api.all_api_services")}
          onChange={() => {}}
        >
          <option>{t("api.all_api_services")}</option>
        </select>
      </div>
      <ExportIndividualButtons type={type} services={services} />
    </div>
  );
}
