import React from "react";

export default function StatusBadge({ type }) {
  const getStatusConfig = (type) => {
    switch (type.toLowerCase()) {
      case "info":
        return { color: "bg-green-500", label: "INFO" };
      case "error":
        return { color: "bg-red-500", label: "ERRO" };
      case "warning":
        return { color: "bg-yellow-500", label: "AVISO" };
      default:
        return { color: "bg-gray-500", label: type };
    }
  };

  const config = getStatusConfig(type);

  return (
    <span className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-white text-sm">{config.label}</span>
    </span>
  );
}
