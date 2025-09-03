import React from "react";
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, XCircle, Activity, Clock } from "lucide-react";

const WebhooksStatusSummary = () => {
  const { t } = useTranslation();

  // Mock data - substitua pelos dados reais da API
  const mockData = {
    totalEvents: 151,
    lastUpdate: "2025-08-27 21:40 WAT",
    eventsByType: {
      failures: 50,
      updates: 30,
      alerts: 71
    },
    processingStatus: {
      success: 95,
      errors: 5
    },
    receptionRate: 4 // eventos por minuto
  };

  return (
    <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">STATUS E RESUMO DOS EVENTOS</h2>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>Última Atualização: {mockData.lastUpdate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total de Eventos */}
        <div className="bg-[#081028] border border-[#2A4A5A] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-gray-300 text-sm">Total de Eventos Recebidos</span>
          </div>
          <div className="text-white text-3xl font-bold mb-1">{mockData.totalEvents}</div>
          <div className="text-gray-400 text-sm">
            Taxa de Recepção: {mockData.receptionRate} eventos/min
          </div>
        </div>

        {/* Eventos por Tipo */}
        <div className="bg-[#081028] border border-[#2A4A5A] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-yellow-500/20 rounded-full">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-gray-300 text-sm">Eventos por Tipo</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Falhas:</span>
              <span className="text-red-400 font-semibold">{mockData.eventsByType.failures}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Atualizações:</span>
              <span className="text-blue-400 font-semibold">{mockData.eventsByType.updates}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Alertas:</span>
              <span className="text-yellow-400 font-semibold">{mockData.eventsByType.alerts}</span>
            </div>
          </div>
        </div>

        {/* Status de Processamento */}
        <div className="bg-[#081028] border border-[#2A4A5A] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full">
              <Activity className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-gray-300 text-sm">Status de Processamento</span>
          </div>
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-green-400 font-semibold">{mockData.processingStatus.success}% Sucesso</span>
              <span className="text-red-400 font-semibold">{mockData.processingStatus.errors}% Erros</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${mockData.processingStatus.success}%` }}
              ></div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Performance geral do sistema
          </div>
        </div>
      </div>

      {/* Filtros de Período */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
            Hora
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition-colors">
            Dia
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition-colors">
            Semana
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition-colors">
            Mês
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebhooksStatusSummary;
