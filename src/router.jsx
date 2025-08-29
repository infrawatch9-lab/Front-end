import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Layout from "./admin_pages/Layout";
import { HomepageAdmin } from "./admin_pages/Homepage";
//import DashboardAdmin from './admin_pages/Dashboard';
import { AuthProvider } from "./components/AuthContext";
import MonitorAdmin from "./admin_pages/Monitor";
import HistoryAdmin from "./admin_pages/History";
import UsersAdmin from "./admin_pages/Users";
import SettingsAdmin from "./admin_pages/Settings";
import APIDashboard from "./admin_pages/Dashboards/DashboardAPI";
import NetworkDashboard from "./admin_pages/Dashboards/DashboardNetworks";
import ServerDashboard from "./admin_pages/Dashboards/DashboardServers";
import WebhookDashboard from "./admin_pages/Dashboards/DashboardWebhooks";
import ServersReport from "./admin_pages/Relatorio_pages/Servers";
import NetworksReport from "./admin_pages/Relatorio_pages/Networks";
import APIReport from "./admin_pages/Relatorio_pages/API";
import WebhooksReport from "./admin_pages/Relatorio_pages/Webhooks";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./hooks/useTheme/ThemeContext";
import { Test } from "./components/CustomComponents/Test";

export default function Router() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Página inicial = Login */}
            <Route path="/" element={<Login />} />
            {/* Rota de teste de tema (fora do admin) */}
            <Route path="/test" element={<Test />} />

            {/* Páginas protegidas */}
            <Route path="/admin" element={<Layout />}>
              {/* Rota de teste de tema dentro do admin */}
              <Route path="test" element={<Test />} />
              <Route index element={<HomepageAdmin />} />
              <Route path="homepage_admin" element={<HomepageAdmin />} />

              {/* Monitoramento - Requer permissão de monitoring */}
              <Route
                path="monitor_admin"
                element={
                  <ProtectedRoute requiredPermission="monitoring">
                    <MonitorAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Histórico - Requer permissão de history */}
              <Route
                path="history_admin"
                element={
                  <ProtectedRoute requiredPermission="history">
                    <HistoryAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Usuários - Requer permissão de users (apenas ADMIN) */}
              <Route
                path="users_admin"
                element={
                  <ProtectedRoute requiredPermission="users">
                    <UsersAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Configurações - Requer permissão de settings (apenas ADMIN) */}
              <Route
                path="settings_admin"
                element={
                  <ProtectedRoute requiredPermission="settings">
                    <SettingsAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard_networks_admin"
                element={
                  <ProtectedRoute requiredPermission="monitoring">
                    <NetworkDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard_webhooks_admin"
                element={
                  <ProtectedRoute requiredPermission="monitoring">
                    <WebhookDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
