import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Search, Download, Filter, ChevronDown, Eye, AlertCircle } from "lucide-react";
import ExecutionRow from "./WebhooksExecutionRow";

const ExecutionsTable = () => {
  const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('24h');

  const mockExecutions = [
    {
      id: 'evt-2025-08-27-2140',
      dateTime: '2025-08-27 21:40',
      origin: 'AWS-EC2',
      type: 'service_fail',
      httpCode: 500,
      attempts: 8,
      latency: 1500,
      status: 'ERRO INTERNO DO SERVIDOR',
      severity: 'Alta',
      deviceId: 'srv-erp-prod',
      description: 'Timeout de rede',
      details: {
        statusDetail: 'down',
        responseTime: '250ms'
      }
    },
    {
      id: 'evt-2025-08-27-2135',
      dateTime: '2025-08-27 21:35',
      origin: 'GitHub',
      type: 'deploy_error',
      httpCode: 422,
      attempts: 3,
      latency: 850,
      status: 'FALHA',
      severity: 'Média',
      deviceId: 'srv-web1',
      description: 'Erro na validação do webhook',
      details: {
        statusDetail: 'validation_error',
        responseTime: '120ms'
      }
    },
    {
      id: 'evt-2025-08-27-2130',
      dateTime: '2025-08-27 21:30',
      origin: 'Stripe',
      type: 'payment_fail',
      httpCode: 200,
      attempts: 1,
      latency: 45,
      status: 'SUCESSO',
      severity: 'Baixa',
      deviceId: 'srv-payment',
      description: 'Webhook processado com sucesso',
      details: {
        statusDetail: 'processed',
        responseTime: '45ms'
      }
    },
    {
      id: 'evt-2025-08-27-2125',
      dateTime: '2025-08-27 21:25',
      origin: 'AWS-RDS',
      type: 'database_alert',
      httpCode: 200,
      attempts: 1,
      latency: 120,
      status: 'SUCESSO',
      severity: 'Baixa',
      deviceId: 'srv-db-prod',
      description: 'Backup automático concluído',
      details: {
        statusDetail: 'backup_completed',
        responseTime: '120ms'
      }
    }
  ];

  // Filtrar execuções
  const filteredExecutions = mockExecutions.filter(execution => {
    const matchesType = !typeFilter || execution.type.includes(typeFilter);
    const matchesStatus = !statusFilter || execution.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesSeverity = !severityFilter || execution.severity === severityFilter;
    const matchesSearch = !searchTerm || 
      execution.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      execution.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      execution.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSeverity && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Alta': return 'text-red-400 bg-red-500/10';
      case 'Média': return 'text-yellow-400 bg-yellow-500/10';
      case 'Baixa': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg overflow-hidden">
      {/* Header com filtros melhorados */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">DETALHES DOS EVENTOS RECENTES</h2>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{filteredExecutions.length} de {mockExecutions.length} eventos</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Barra de Pesquisa */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por ID, origem ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>

          {/* Filtros */}
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none appearance-none text-sm"
            >
              <option value="">Todos os tipos</option>
              <option value="service_fail">Falha de Serviço</option>
              <option value="deploy_error">Erro de Deploy</option>
              <option value="payment_fail">Falha de Pagamento</option>
              <option value="database_alert">Alerta de DB</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none appearance-none text-sm"
            >
              <option value="">Todos os status</option>
              <option value="sucesso">Sucesso</option>
              <option value="falha">Falha</option>
              <option value="erro">Erro</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none appearance-none text-sm"
            >
              <option value="">Todas severidades</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>

        {/* Filtros de período */}
        <div className="flex gap-2 mt-4">
          {['1h', '24h', '7d', '30d'].map((period) => (
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
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#081028]">
            <tr>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">ID EVENTO</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">TIMESTAMP</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">ORIGEM</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">TIPO</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">STATUS</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">SEVERIDADE</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">LATÊNCIA (ms)</th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">AÇÕES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredExecutions.map((execution, index) => (
              <ExecutionRow key={execution.id || index} execution={execution} getSeverityColor={getSeverityColor} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Estado vazio */}
      {filteredExecutions.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <div className="text-gray-400 font-medium mb-1">Nenhum evento encontrado</div>
          <div className="text-gray-500 text-sm">Tente ajustar os filtros para ver mais resultados</div>
        </div>
      )}
    </div>
  );
};

export default ExecutionsTable;
