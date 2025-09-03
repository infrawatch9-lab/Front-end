import React from "react";
import { useTranslation } from 'react-i18next';
import { Zap, CheckCircle, AlertCircle, Cpu, Database, Wifi } from "lucide-react";

const WebhooksPerformanceMetrics = () => {
  const { t } = useTranslation();

  // Mock data - substitua pelos dados reais da API
  const mockMetrics = {
    latency: {
      average: 45,
      max: 100,
      status: 'good' // good, medium, bad
    },
    successRate: {
      percentage: 98,
      period: '24h',
      status: 'good'
    },
    errorsByType: {
      invalid: 2,
      timeouts: 3,
      total: 5,
      status: 'medium'
    },
    systemHealth: {
      cpu: 15,
      ram: 200,
      connections: 3,
      health: 100,
      status: 'good'
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'bad': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return '🟢';
      case 'medium': return '🟡';
      case 'bad': return '🔴';
      default: return '⚪';
    }
  };

  const getBgColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-500/10 border-green-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'bad': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Latência de Processamento */}
      <div className={`bg-[#0B1440] border ${getBgColor(mockMetrics.latency.status)} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">Latência</span>
          </div>
          <span className="text-lg">{getStatusIcon(mockMetrics.latency.status)}</span>
        </div>
        <div className={`text-2xl font-bold mb-1 ${getStatusColor(mockMetrics.latency.status)}`}>
          {mockMetrics.latency.average}ms
        </div>
        <div className="text-gray-400 text-xs">
          Máx: {mockMetrics.latency.max}ms
        </div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(mockMetrics.latency.average / mockMetrics.latency.max) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Taxa de Sucesso */}
      <div className={`bg-[#0B1440] border ${getBgColor(mockMetrics.successRate.status)} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm">Taxa de Sucesso</span>
          </div>
          <span className="text-lg">{getStatusIcon(mockMetrics.successRate.status)}</span>
        </div>
        <div className={`text-2xl font-bold mb-1 ${getStatusColor(mockMetrics.successRate.status)}`}>
          {mockMetrics.successRate.percentage}%
        </div>
        <div className="text-gray-400 text-xs">
          ({mockMetrics.successRate.period})
        </div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
          <div 
            className="bg-green-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${mockMetrics.successRate.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Erros por Tipo */}
      <div className={`bg-[#0B1440] border ${getBgColor(mockMetrics.errorsByType.status)} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">Erros</span>
          </div>
          <span className="text-lg">{getStatusIcon(mockMetrics.errorsByType.status)}</span>
        </div>
        <div className={`text-2xl font-bold mb-1 ${getStatusColor(mockMetrics.errorsByType.status)}`}>
          {mockMetrics.errorsByType.total}
        </div>
        <div className="text-gray-400 text-xs space-y-1">
          <div>{mockMetrics.errorsByType.invalid} inválidos</div>
          <div>{mockMetrics.errorsByType.timeouts} timeouts</div>
        </div>
      </div>

      {/* Saúde do Sistema */}
      <div className={`bg-[#0B1440] border ${getBgColor(mockMetrics.systemHealth.status)} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Sistema</span>
          </div>
          <span className="text-lg">{getStatusIcon(mockMetrics.systemHealth.status)}</span>
        </div>
        <div className={`text-2xl font-bold mb-1 ${getStatusColor(mockMetrics.systemHealth.status)}`}>
          {mockMetrics.systemHealth.health}%
        </div>
        <div className="text-gray-400 text-xs space-y-1">
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            CPU: {mockMetrics.systemHealth.cpu}%
          </div>
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            RAM: {mockMetrics.systemHealth.ram}MB
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            {mockMetrics.systemHealth.connections} conexões
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhooksPerformanceMetrics;
