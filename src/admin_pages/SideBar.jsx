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
import { useNavigate, useLocation } from "react-router-dom"; // Adicione useLocation
import SidebarItemWithSubmenu from "../components/SideBarWithSubMenu";
import SidebarItem from "../components/SideBarItem";
import { useSidebar } from "../contexts/SidebarContext";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { FaToggleOff } from "react-icons/fa6";
import { useUserPermissions } from "../hooks/useUserPermissions";
import UserInfo from "../components/UserInfo";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation(); // Pega a rota atual
  const { hasPermission, loading: permissionsLoading } = useUserPermissions();

  // Função para verificar se a rota está ativa
  const isActive = (to) => location.pathname === to;

  return (
    <div
      className={`bg-[#0B1440] text-white fixed left-0 top-0 h-screen flex flex-col justify-between transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-20"
      } p-4 overflow-y-auto`}
    >
      {/* Topo */}
      <div>
        <div
          className="flex items-center space-x-2 mb-6 novo"
          style={{ display: "flex", gap: 20 }}
        >
          {isOpen && (
            <img src="/img/logo_white.png" alt="Logo" className="w-8 h-8" />
          )}
          {isOpen && (
            <h1 className="text-lg font-semibold">
              {t("sidebar.brand", "InfraWatch")}
            </h1>
          )}
          <CollapseButton isOpen={isOpen} toggle={toggleSidebar} />
        </div>

        {/* Loading indicator para permissões */}
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
            {/* Dashboard - Todos os usuários têm acesso */}
            {hasPermission("dashboard") && (
              <SidebarItem
                icon={<Home size={20} />}
                label={t("sidebar.homepage", "Início")}
                isOpen={isOpen}
                to="/admin/homepage_admin"
                active={isActive("/admin/homepage_admin")}
              />
            )}

            {/* Monitoramento - ADMIN e USER têm acesso */}
            {hasPermission("monitoring") && (
              <SidebarItem
                icon={<BarChart size={20} />}
                label={t("sidebar.monitoring", "Monitoramento")}
                badge="1"
                isOpen={isOpen}
                to="/admin/monitor_admin"
                active={isActive("/admin/monitor_admin")}
              />
            )}

            {/* Relatórios - Comentado temporariamente */}
            {/*
            {hasPermission('reports') && (
              <SidebarItemWithSubmenu
                icon={<FolderOpen size={20} />}
                label={t('sidebar.reports', 'Relatórios')}
                isOpen={isOpen}
                subItems={[
                  { label: t('sidebar.servers', 'Servidores'), to: "reports_servers_admin" },
                  { label: t('sidebar.networks', 'Redes'), to: "reports_networks_admin" },
                  { label: t('sidebar.webhooks', 'Webhooks'), to: "reports_webhooks_admin" },
                  { label: t('sidebar.apis', 'APIs'), to: "reports_api_admin" },
                ]}
                active={location.pathname.startsWith("/admin/reports")}
              />
            )}
            */}

            {/* Histórico - ADMIN e USER têm acesso */}
            {hasPermission("history") && (
              <SidebarItem
                icon={<History size={20} />}
                label={t("sidebar.history", "Histórico")}
                isOpen={isOpen}
                to="/admin/history_admin"
                active={isActive("/admin/history_admin")}
              />
            )}

            {/* Usuários - Apenas ADMIN tem acesso */}
            {hasPermission("users") && (
              <SidebarItem
                icon={<Users size={20} />}
                label={t("sidebar.users", "Usuários")}
                isOpen={isOpen}
                to="/admin/users_admin"
                active={isActive("/admin/users_admin")}
              />
            )}

            {/* Configurações - Apenas ADMIN tem acesso */}
            {hasPermission("settings") && (
              <SidebarItem
                icon={<Settings size={20} />}
                label={t("sidebar.settings", "Configurações")}
                isOpen={isOpen}
                to="/admin/settings_admin"
                active={isActive("/admin/settings_admin")}
              />
            )}
          </>
        )}
      </div>

      {/* Parte inferior */}
      <div className="space-y-4">
        {/* Informações do usuário */}
        <UserInfo isOpen={isOpen} />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon size={20} />
            {isOpen && <span>{t("sidebar.dark_mode", "Modo escuro")}</span>}
          </div>
          <div className="flex items-center gap-2">
            {isOpen && (
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <button>
                  {/* <FaToggleOff size={30} color='#009cdd' /> */}
                  <FaToggleOff size={30} color="#010E37" />
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
    </div>
  );
}
