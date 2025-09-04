import React from "react";
import CustomDiv from "../../../components/CustomComponents/CustomDiv";

export default function ServicesOverviewCard({ active = 98, inactive = 10, failed = 12 }) {
  return (
    <CustomDiv type="foreground" className="p-6 rounded shadow-lg w-100 h-60 border border-[#3B5B75] flex flex-col gap-4">
      <div className="text-white font-semibold text-lg mb-2">Services Overview</div>
      <div className="flex flex-col gap-3 text-base">
        <div className="flex justify-between">
          <span className="text-gray-400">Active:</span>
          <span className="text-green-300 font-bold">{active}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Inactive:</span>
          <span className="text-yellow-300 font-bold">{inactive}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Failed:</span>
          <span className="text-red-400 font-bold">{failed}</span>
        </div>
      </div>
    </CustomDiv>
  );
}
