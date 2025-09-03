import React from "react";
import { BounceLoader } from "react-spinners";
import { useTheme } from "../hooks/useTheme/useTheme";

export default function AppLoader({
  size = 15,
  color = "#010E37",
  className = "",
  minHeight = 32,
}) {
  const { theme } = useTheme()
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
      style={{ minHeight }}
    >
      <BounceLoader color={ theme == 'dark' ? "#ffffff" : color} size={size} />
    </div>
  );
}
