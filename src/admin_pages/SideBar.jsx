import React from "react";
import {
  Home,
  Monitor,
  BarChart,
  History,
  Users,
  Settings,
  Moon,
  Power,
  FolderOpen,
} from "lucide-react";
import CollapseButton from "../components/CollapseButton";
import { useNavigate } from "react-router-dom";
import SidebarItemWithSubmenu from "../components/SideBarWithSubMenu";
import SidebarItem from "../components/SideBarItem";
import { useSidebar } from "../contexts/SidebarContext";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useTheme } from "../hooks/useTheme/useTheme";
import CustomDiv from "../components/CustomComponents/CustomDiv";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useUserPermissions } from "../hooks/useUserPermissions";
import UserInfo from "../components/UserInfo";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hasPermission, permissionsLoading } = useUserPermissions();
  const isActive = (route) => window.location.pathname === route;

  return (
    <CustomDiv
      className={`bg-[#0B1440] text-white fixed left-0 top-0 h-screen flex flex-col justify-start transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-20"
      } p-4 overflow-y-auto`}
    >
      {/* Topo */}
      <div
        className="flex items-center space-x-2 mb-6 novo"
        style={{ display: "flex", gap: 20 }}
      >
        {isOpen && (
          <img
            src={theme === "dark" ? "/img/logo_white.png" : "/img/logo.png"}
            alt="Logo"
            className="w-8 h-8"
          />
        )}
        {isOpen && (
          <h1
            style={{ fontWeight: "bold" }}
            className={
              "text-lg font-semibold " +
              (theme === "dark"
                ? " items-colors-light "
                : " items-colors-dark ")
            }
          >
            {t("sidebar.brand", "InfraWatch")}
          </h1>
        )}
        <CollapseButton isOpen={isOpen} toggle={toggleSidebar} />
      </div>
      {/* Menu de permissões */}
      <div>
        {permissionsLoading ? (
          <div className="flex items-center justify-center py-4">
            <svg
              className="animate-spin h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {isOpen && (
              <span className="ml-2 text-slate-400 text-sm">Carregando...</span>
            )}
          </div>
        ) : (
          <>
            {hasPermission("dashboard") && (
              <SidebarItem
                icon={
                  <Home
                    color={theme === "dark" ? "#ffffff" : "#0B143F"}
                    size={20}
                  />
                }
                label={t("sidebar.homepage", "Início")}
                isOpen={isOpen}
                to="/admin/homepage_admin"
                active={isActive("/admin/homepage_admin")}
              />
            )}
            {hasPermission("monitoring") && (
              <SidebarItem
                icon={
                  <BarChart
                    color={theme === "dark" ? "#ffffff" : "#0B143F"}
                    size={20}
                  />
                }
                label={t("sidebar.monitoring", "Monitoramento")}
                badge="1"
                isOpen={isOpen}
                to="/admin/monitor_admin"
                active={isActive("/admin/monitor_admin")}
              />
            )}
            {hasPermission("history") && (
              <SidebarItem
                icon={
                  <History
                    color={theme === "dark" ? "#ffffff" : "#0B143F"}
                    size={20}
                  />
                }
                label={t("sidebar.history", "Histórico")}
                isOpen={isOpen}
                to="/admin/history_admin"
                active={isActive("/admin/history_admin")}
              />
            )}
            {hasPermission("users") && (
              <SidebarItem
                icon={
                  <Users
                    color={theme === "dark" ? "#ffffff" : "#0B143F"}
                    size={20}
                  />
                }
                label={t("sidebar.users", "Usuários")}
                isOpen={isOpen}
                to="/admin/users_admin"
                active={isActive("/admin/users_admin")}
              />
            )}
            {hasPermission("settings") && (
              <SidebarItem
                icon={
                  <Settings
                    color={theme === "dark" ? "#ffffff" : "#0B143F"}
                    size={20}
                  />
                }
                label={t("sidebar.settings", "Configurações")}
                isOpen={isOpen}
                to="/admin/settings_admin"
                active={isActive("/admin/settings_admin")}
              />
            )}
          </>
        )}
      </div>
      {/* Spacer to push bottom section down */}
      <div className="flex-1" />
      {/* Parte inferior */}
      <div className="space-y-4">
        <UserInfo isOpen={isOpen} />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon color={theme != "dark" ? "#070E23" : "#d8d8d8"} size={20} />
            {isOpen && (
              <span
                className={
                  theme == "dark" ? " text-colors-light " : " text-colors-dark "
                }
              >
                {t("sidebar.dark_mode", "Modo escuro")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isOpen && (
              <label className={"inline-flex items-center cursor-pointer"}>
                <input type="checkbox" className="sr-only peer" />
                <button onClick={() => toggleTheme()}>
                  {theme == "dark" ? (
                    <FaToggleOn
                      size={30}
                      fill={theme != "dark" ? "#070E23" : "#d8d8d8"}
                      color="#010E37"
                    />
                  ) : (
                    <FaToggleOff
                      size={30}
                      fill={theme != "dark" ? "#070E23" : "#d8d8d8"}
                      color="#010E37"
                    />
                  )}
                </button>
              </label>
            )}
            <LanguageSelector />
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-red-600 text-white rounded-md py-2 text-sm transition-all"
        >
          <Power size={20} />
          {isOpen && <span>{t("sidebar.logout", "Sair")}</span>}
        </button>
      </div>
    </CustomDiv>
  );
}
