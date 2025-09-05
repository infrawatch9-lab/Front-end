import React from "react";
import CustomDiv from "../../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../../hooks/useTheme/useTheme";

export default function ServicesOverviewCard({ active = 98, inactive = 10, failed = 12 }) {
  const { theme } = useTheme()
  return (
    <CustomDiv type="foreground" className="p-6 rounded shadow-lg w-100 h-60 border border-[#3B5B75] flex flex-col gap-4">
      <span className={"text-white font-semibold text-lg mb-2 " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>Services Overview</span>
      <div className="flex flex-col gap-3 text-base">
        <div className="flex justify-between">
          <span className={"text-gray-400 " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>Active:</span>
          <span className={"text-green-300 font-bold " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>{active}</span>
        </div>
        <div className="flex justify-between">
          <span className={"text-gray-400 " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>Inactive:</span>
          <span className={"text-yellow-300 font-bold " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>{inactive}</span>
        </div>
        <div className="flex justify-between">
          <span className={"text-gray-400 " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>Failed:</span>
          <span className={"text-red-400 font-bold " + ( theme == 'dark' ? "text-colors-light" : "text-colors-dark")}>{failed}</span>
        </div>
      </div>
    </CustomDiv>
  );
}
