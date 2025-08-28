import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle, XCircle, Clock, ExternalLink, AlertCircle } from "lucide-react";

const WebhooksAlertsPanel = () => {
  const { t } = useTranslation();

  // Mock data - substitua pelos dados reais da API
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-001',
      severity: 'high',
      message: 'srv-erp-prod down há 10min',
      timestamp: '2025-08-27 21:30',
      actions: {
        emailSent: true,
        telegramPending: true
      },
      escalationTime: 10, // minutos restantes
      status: 'active'
    },
    {
      id: 'alert-002',
      severity: 'medium',
      message: 'srv-web1 latência alta (250ms) há 5min',
      timestamp: '2025-08-27 21:35',
      actions: {
        emailSent: false,
        telegramPending: false
      },
      escalationTime: 15,
      status: 'active'
    },
    {
      id: 'alert-003',
      severity: 'low',
      message: 'srv-db1 restaurado às 21:30',
      timestamp: '2025-08-27 21:30',
      actions: {
        emailSent: true,
        telegramPending: false
      },
      escalationTime: null,
      status: 'resolved'
    }
  ]);

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          emoji: '🔴'
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          emoji: '🟡'
        };
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          emoji: '🟢'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          emoji: '⚪'
        };
    }
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: 'resolved', severity: 'low' }
          : alert
      )
    );
  };

  const handleEscalateAlert = (alertId) => {
    // Implementar lógica de escalação
    console.log(`Escalando alerta: ${alertId}`);
  };

  const handleIgnoreAlert = (alertId) => {
    setAlerts(prevAlerts =>
      prevAlerts.filter(alert => alert.id !== alertId)
    );
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">ALERTAS E AÇÕES PENDENTES</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            {activeAlerts.length} alertas ativos
          </span>
          <div className={`w-3 h-3 rounded-full ${activeAlerts.length > 0 ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Alertas Ativos */}
        {activeAlerts.map((alert) => {
          const config = getSeverityConfig(alert.severity);
          const IconComponent = config.icon;

          return (
            <div
              key={alert.id}
              className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 transition-all duration-300 hover:bg-opacity-80`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{config.emoji}</span>
                    <IconComponent className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${config.color} mb-1`}>
                      {alert.message}
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {alert.timestamp}
                    </div>
                    <div className="text-gray-300 text-sm">
                      <span className="font-medium">Ações:</span>
                      <span className={`ml-2 ${alert.actions.emailSent ? 'text-green-400' : 'text-gray-500'}`}>
                        E-mail {alert.actions.emailSent ? 'enviado' : 'pendente'}
                      </span>
                      <span className="mx-2">•</span>
                      <span className={`${alert.actions.telegramPending ? 'text-yellow-400' : 'text-gray-500'}`}>
                        Telegram {alert.actions.telegramPending ? 'pendente' : 'enviado'}
                      </span>
                    </div>
                    {alert.escalationTime && (
                      <div className="text-orange-400 text-sm mt-1">
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        Escalação em {alert.escalationTime} min
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Resolver
                  </button>
                  <button
                    onClick={() => handleEscalateAlert(alert.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Escalonar
                  </button>
                  {alert.severity === 'medium' && (
                    <button
                      onClick={() => handleIgnoreAlert(alert.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Ignorar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Histórico de Alertas Resolvidos */}
        {resolvedAlerts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3">HISTÓRICO RECENTE</h3>
            <div className="space-y-2">
              {resolvedAlerts.slice(0, 3).map((alert) => {
                const config = getSeverityConfig(alert.severity);
                
                return (
                  <div
                    key={alert.id}
                    className="bg-gray-800/30 border border-gray-700/50 rounded p-3 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{config.emoji}</span>
                      <span className="text-gray-300">{alert.message}</span>
                      <span className="text-gray-500 ml-auto">{alert.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Estado vazio */}
        {activeAlerts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <div className="text-gray-300 font-medium mb-1">Nenhum alerta ativo</div>
            <div className="text-gray-500 text-sm">Todos os sistemas estão funcionando normalmente</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhooksAlertsPanel;
