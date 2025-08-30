import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./sidebar.styles.css"
import { useTheme } from "../hooks/useTheme/useTheme";

export default function SidebarItem({ icon, label, isOpen, to, active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme()

  console.log(active)
  // Verifica se a rota atual é a rota deste item
  const isSelected = location.pathname === to;

  // Azul claro para o item selecionado
  const selectedBg = "selected-side-bar-item-light"; // Tailwind: azul claro

  return (
    <div
      onClick={() => navigate(to)}
      className={`flex items-center space-x-4 p-2 rounded cursor-pointer transition-all
        ${isSelected ? (theme == 'dark' ? " selected-side-bar-item-dark " : " selected-side-bar-item-light ") : "side-bar-item-hover"}
      `}
    >
      <span className={" text-lg "}>{icon}</span>
      {isOpen && <span className={" text-sm " + (theme == 'dark' ? " items-colors-light " : " items-colors-dark " ) }>{label}</span>}
    </div>
  );
}
