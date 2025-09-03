import React from "react";
import { BounceLoader } from "react-spinners";

export default function AppLoader({
  size = 15,
  color = "#010E37",
  className = "",
  minHeight = 32,
}) {
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
      style={{ minHeight }}
    >
      <BounceLoader color={color} size={size} />
    </div>
  );
}
