import React from "react";
import { useTheme } from '../../hooks/useTheme/useTheme';

export default function PageHeader() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="mb-8">
      <h1 className={"text-white text-2xl font-semibold "  + (theme == 'dark' ? " items-colors-light " : " items-colors-dark ")}>AUDITORIA DE EVENTOS</h1>
    </div>
  );
}
