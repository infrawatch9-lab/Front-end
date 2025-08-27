import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./sidebar.styles.css"

export default function SidebarItem({ icon, label, isOpen, to }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se a rota atual é a rota deste item
  const isSelected = location.pathname === to;

  // Azul claro para o item selecionado
  const selectedBg = "bg-blue-600"; // Tailwind: azul claro

  return (
    <div
      onClick={() => navigate(to)}
      className={`flex items-center space-x-4 p-2 rounded cursor-pointer transition-all
        ${isSelected ? selectedBg : "side-bar-item-hover"}
      `}
    >
      <span className="text-lg">{icon}</span>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
}
