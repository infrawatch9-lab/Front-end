
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Layout from "./admin_pages/Layout";
import { HomepageAdmin } from './admin_pages/Homepage';
//import DashboardAdmin from './admin_pages/Dashboard';
import { AuthProvider } from "./components/AuthContext";
import MonitorAdmin from './admin_pages/Monitor';
import HistoryAdmin from './admin_pages/History';
import UsersAdmin from './admin_pages/Users';
import SettingsAdmin from './admin_pages/Settings';
import APIDashboard from './admin_pages/Dashboards/DashboardAPI';
import NetworkDashboard from './admin_pages/Dashboards/DashboardNetworks';
import ServerDashboard from './admin_pages/Dashboards/DashboardServers';
import WebhookDashboard from './admin_pages/Dashboards/DashboardWebhooks';
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

          {/* Páginas protegidas */}
          <Route
            path="/admin"
            element={
                <Layout />
            }
          >
            <Route index element={<HomepageAdmin />}/>
            <Route path="homepage_admin" element={<HomepageAdmin />}/>
            
            {/* Relatórios - Comentado temporariamente */}
            {/*
            <Route path="reports_servers_admin" element={
              <ProtectedRoute requiredPermission="reports">
                <ServersReport />
              </ProtectedRoute>
            }/>
            <Route path="reports_networks_admin" element={
              <ProtectedRoute requiredPermission="reports">
                <NetworksReport />
              </ProtectedRoute>
            }/>
            <Route path="reports_api_admin" element={
              <ProtectedRoute requiredPermission="reports">
                <APIReport />
              </ProtectedRoute>
            }/>
            <Route path="reports_webhooks_admin" element={
              <ProtectedRoute requiredPermission="reports">
                <WebhooksReport />
              </ProtectedRoute>
            }/>
            */}
            
            {/* Monitoramento - Requer permissão de monitoring */}
            <Route path="monitor_admin" element={
              <ProtectedRoute requiredPermission="monitoring">
                <MonitorAdmin />
              </ProtectedRoute>
            }/>
            
            {/* Histórico - Requer permissão de history */}
            <Route path="history_admin" element={
              <ProtectedRoute requiredPermission="history">
                <HistoryAdmin />
              </ProtectedRoute>
            }/>
            
            {/* Usuários - Requer permissão de users (apenas ADMIN) */}
            <Route path="users_admin" element={
              <ProtectedRoute requiredPermission="users">
                <UsersAdmin />
              </ProtectedRoute>
            }/>
            
            {/* Configurações - Requer permissão de settings (apenas ADMIN) */}
            <Route path="settings_admin" element={
              <ProtectedRoute requiredPermission="settings">
                <SettingsAdmin />
              </ProtectedRoute>
            }/>
            
            {/* Dashboards - Requer permissão de monitoring */}
            <Route path="dashboard_api_admin" element={
              <ProtectedRoute requiredPermission="monitoring">
                <APIDashboard />
              </ProtectedRoute>
            }/>
            <Route path="dashboard_servers_admin" element={
              <ProtectedRoute requiredPermission="monitoring">
                <ServerDashboard />
              </ProtectedRoute>
            }/>
            <Route path="dashboard_networks_admin" element={
              <ProtectedRoute requiredPermission="monitoring">
                <NetworkDashboard />
              </ProtectedRoute>
            }/>
            <Route path="dashboard_webhooks_admin" element={
              <ProtectedRoute requiredPermission="monitoring">
                <WebhookDashboard />
              </ProtectedRoute>
            }/>
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  );
}


/*

<Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="systems" element={<Systems />} />
            <Route path="active" element={<Active />} />
            <Route path="inactive" element={<Inactive />} />
            <Route path="sla" element={<SLA />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="/sistemas/:id" element={<SystemDetails />} />
            <Route path="*" element={<NotFound />} />

            */


/*

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
*/
