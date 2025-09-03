import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { ExternalLink, FileText, Ticket, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const WebhooksIntegrationPanel = () => {
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data para as integrações
  const mockIntegrations = {
    glpi: {
      isConnected: true,
      lastSync: '21:35',
      tickets: [
        { id: '#456', status: 'Em andamento', title: 'Falha no webhook Discord', priority: 'Alta' },
        { id: '#457', status: 'Resolvido', title: 'Timeout na API', priority: 'Média' },
        { id: '#458', status: 'Pendente', title: 'Configuração webhook', priority: 'Baixa' }
      ],
      totalOpen: 3,
      totalResolved: 12
    },
    docuware: {
      isConnected: true,
      lastSync: '21:35',
      documents: [
        { name: 'SLA-2025-08.pdf', type: 'SLA', date: '2025-08-27', size: '2.4 MB' },
        { name: 'Incident-Report-Aug.pdf', type: 'Relatório', date: '2025-08-26', size: '1.8 MB' },
        { name: 'Webhook-Config.pdf', type: 'Configuração', date: '2025-08-25', size: '856 KB' }
      ],
      totalDocuments: 5,
      recentUploads: 2
    }
  };

  const handleRefresh = async (service) => {
    setIsRefreshing(true);
    // Simular API call
    setTimeout(() => {
      setIsRefreshing(false);
      console.log(`Sincronizando ${service}...`);
    }, 2000);
  };

  const handleOpenExternal = (url) => {
    window.open(url, '_blank');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'text-red-400 bg-red-500/10';
      case 'Média': return 'text-yellow-400 bg-yellow-500/10';
      case 'Baixa': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em andamento': return 'text-blue-400';
      case 'Resolvido': return 'text-green-400';
      case 'Pendente': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Painel GLPI */}
      <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded">
              <Ticket className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">GLPI</h3>
              <p className="text-gray-400 text-sm">Sistema de Tickets</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${mockIntegrations.glpi.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${mockIntegrations.glpi.isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {mockIntegrations.glpi.isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#081028] rounded p-3 text-center">
            <div className="text-blue-400 text-xl font-bold">{mockIntegrations.glpi.totalOpen}</div>
            <div className="text-gray-400 text-xs">Tickets Abertos</div>
          </div>
          <div className="bg-[#081028] rounded p-3 text-center">
            <div className="text-green-400 text-xl font-bold">{mockIntegrations.glpi.totalResolved}</div>
            <div className="text-gray-400 text-xs">Resolvidos (mês)</div>
          </div>
        </div>

        {/* Lista de Tickets */}
        <div className="space-y-2 mb-4">
          <h4 className="text-gray-300 text-sm font-medium">Tickets Recentes</h4>
          {mockIntegrations.glpi.tickets.slice(0, 3).map((ticket, index) => (
            <div key={index} className="bg-[#081028] rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-mono text-sm">{ticket.id}</span>
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
              <div className="text-gray-300 text-sm mb-1">{ticket.title}</div>
              <div className={`text-xs ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </div>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenExternal('https://glpi.example.com')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors flex-1"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir GLPI
          </button>
          <button
            onClick={() => handleRefresh('GLPI')}
            disabled={isRefreshing}
            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Status da sincronização */}
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span>Última Sync: {mockIntegrations.glpi.lastSync} (OK)</span>
        </div>
      </div>

      {/* Painel DocuWare */}
      <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-500/20 rounded">
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">DocuWare</h3>
              <p className="text-gray-400 text-sm">Gestão de Documentos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${mockIntegrations.docuware.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${mockIntegrations.docuware.isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {mockIntegrations.docuware.isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#081028] rounded p-3 text-center">
            <div className="text-purple-400 text-xl font-bold">{mockIntegrations.docuware.totalDocuments}</div>
            <div className="text-gray-400 text-xs">Documentos</div>
          </div>
          <div className="bg-[#081028] rounded p-3 text-center">
            <div className="text-orange-400 text-xl font-bold">{mockIntegrations.docuware.recentUploads}</div>
            <div className="text-gray-400 text-xs">Novos (24h)</div>
          </div>
        </div>

        {/* Lista de Documentos */}
        <div className="space-y-2 mb-4">
          <h4 className="text-gray-300 text-sm font-medium">Documentos Recentes</h4>
          {mockIntegrations.docuware.documents.map((doc, index) => (
            <div key={index} className="bg-[#081028] rounded p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-purple-400 text-sm font-medium">{doc.name}</span>
                <span className="text-gray-500 text-xs">{doc.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{doc.type}</span>
                <span className="text-gray-500 text-xs">{doc.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenExternal('https://docuware.example.com')}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors flex-1"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir DocuWare
          </button>
          <button
            onClick={() => handleRefresh('DocuWare')}
            disabled={isRefreshing}
            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Status da sincronização */}
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span>Última Sync: {mockIntegrations.docuware.lastSync} (OK)</span>
        </div>
      </div>
    </div>
  );
};

export default WebhooksIntegrationPanel;
