import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { BarChart3, TrendingUp, TrendingDown, Activity, Calendar } from "lucide-react";

const WebhooksTrendsChart = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [chartType, setChartType] = useState('line');

  // Mock data para o gráfico (substitua pelos dados reais)
  const mockData = {
    '24h': {
      labels: ['21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'],
      failures: [5, 8, 12, 3, 7, 2, 1, 4],
      updates: [15, 20, 18, 22, 16, 19, 25, 21],
      alerts: [3, 5, 7, 2, 4, 1, 2, 3]
    },
    '7d': {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      failures: [25, 30, 18, 45, 22, 15, 20],
      updates: [120, 135, 98, 156, 142, 88, 95],
      alerts: [15, 18, 12, 25, 19, 8, 12]
    }
  };

  const currentData = mockData[selectedPeriod] || mockData['24h'];

  // Calcular estatísticas
  const totalFailures = currentData.failures.reduce((a, b) => a + b, 0);
  const totalUpdates = currentData.updates.reduce((a, b) => a + b, 0);
  const totalAlerts = currentData.alerts.reduce((a, b) => a + b, 0);
  const failureRate = ((totalFailures / (totalFailures + totalUpdates)) * 100).toFixed(1);

  // Simular uptime
  const uptime = (100 - parseFloat(failureRate)).toFixed(1);

  // Gerar pontos do gráfico
  const maxValue = Math.max(
    ...currentData.failures,
    ...currentData.updates,
    ...currentData.alerts
  );

  const generatePath = (data, color) => {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 80; // 80% para deixar margem
      return `${x},${y}`;
    }).join(' ');
    
    return `M 0,100 L ${points} L 100,100 Z`;
  };

  return (
    <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">VISUALIZAÇÃO HISTÓRICA E TENDÊNCIAS</h2>
          <p className="text-gray-400 text-sm">Eventos por {selectedPeriod === '24h' ? 'hora' : 'dia'} (últimos {selectedPeriod})</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {['24h', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Gráfico Principal */}
        <div className="lg:col-span-3">
          <div className="bg-[#081028] rounded-lg p-4 h-80">
            {/* Legenda */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 text-sm">Falhas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm">Atualizações</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-400 text-sm">Alertas</span>
              </div>
            </div>

            {/* Área do Gráfico */}
            <div className="relative h-48">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="#374151"
                    strokeWidth="0.2"
                  />
                ))}

                {/* Áreas dos gráficos */}
                <path
                  d={generatePath(currentData.failures, '#EF4444')}
                  fill="rgba(239, 68, 68, 0.1)"
                  stroke="#EF4444"
                  strokeWidth="0.5"
                />
                <path
                  d={generatePath(currentData.updates, '#10B981')}
                  fill="rgba(16, 185, 129, 0.1)"
                  stroke="#10B981"
                  strokeWidth="0.5"
                />
                <path
                  d={generatePath(currentData.alerts, '#F59E0B')}
                  fill="rgba(245, 158, 11, 0.1)"
                  stroke="#F59E0B"
                  strokeWidth="0.5"
                />

                {/* Pontos de dados */}
                {currentData.failures.map((value, index) => {
                  const x = (index / (currentData.failures.length - 1)) * 100;
                  const y = 100 - (value / maxValue) * 80;
                  return (
                    <circle
                      key={`failure-${index}`}
                      cx={x}
                      cy={y}
                      r="0.8"
                      fill="#EF4444"
                    />
                  );
                })}
              </svg>

              {/* Labels do eixo X */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-500 text-xs mt-2">
                {currentData.labels.map((label, index) => (
                  <span key={index}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Laterais */}
        <div className="space-y-4">
          <div className="bg-[#081028] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-gray-300 text-sm">Taxa de Falhas</span>
            </div>
            <div className="text-red-400 text-2xl font-bold mb-1">{failureRate}%</div>
            <div className="text-gray-500 text-xs">últimos {selectedPeriod}</div>
          </div>

          <div className="bg-[#081028] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm">Uptime Serviço</span>
            </div>
            <div className="text-green-400 text-2xl font-bold mb-1">{uptime}%</div>
            <div className="text-gray-500 text-xs">últimos {selectedPeriod}</div>
          </div>

          <div className="bg-[#081028] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 text-sm">Total de Eventos</span>
            </div>
            <div className="text-blue-400 text-2xl font-bold mb-1">{totalFailures + totalUpdates + totalAlerts}</div>
            <div className="text-gray-500 text-xs">últimos {selectedPeriod}</div>
          </div>

          <div className="bg-[#081028] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 text-sm">Próxima Análise</span>
            </div>
            <div className="text-purple-400 text-sm font-medium mb-1">Em 1h 30m</div>
            <div className="text-gray-500 text-xs">Relatório automático</div>
          </div>
        </div>
      </div>

      {/* Resumo inferior */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
        <div className="text-center">
          <div className="text-red-400 text-2xl font-bold">{totalFailures}</div>
          <div className="text-gray-400 text-sm">Total de Falhas</div>
        </div>
        <div className="text-center">
          <div className="text-green-400 text-2xl font-bold">{totalUpdates}</div>
          <div className="text-gray-400 text-sm">Total de Atualizações</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 text-2xl font-bold">{totalAlerts}</div>
          <div className="text-gray-400 text-sm">Total de Alertas</div>
        </div>
      </div>
    </div>
  );
};

export default WebhooksTrendsChart;
