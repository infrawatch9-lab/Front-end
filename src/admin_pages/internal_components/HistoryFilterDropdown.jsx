import React from "react";
import { ChevronRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function FilterDropdown({ label, value, options, onChange }) {
  const { theme } = useTheme()

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={"appearance-none bg-[#081028] text-white px-4 py-2 pr-8 rounded border border-gray-600  cursor-pointer "+
          ( theme == 'dark' ? " div-dark-mode-bg " : " div-light-mode-bg " )
        }
        
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
}
