import React from "react";
import { Search } from "lucide-react";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function SearchBar({ searchTerm, onSearchChange }) {
    const { theme } = useTheme();
  return (
    <div className="relative">
      <Search className={"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"} />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={"w-full bg-[#081028] text-white pl-10 pr-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none" + (theme == "dark"
                    ? " div-dark-mode-bg "
                    : " div-light-mode-bg ")}
      />
    </div>
  );
}
