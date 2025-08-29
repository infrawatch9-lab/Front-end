import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Clock, Server, AlertCircle, CheckCircle, AlertTriangle, Eye, Copy, Download, RefreshCw } from 'lucide-react';

const EventDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const eventData = {
    id: 'EVT-2025-05-12-001',
    timestamp: '2025-05-12 12:32:12',
    user: 'LIONEL MESSI',
    service: 'SMTP',
    type: 'INFO',
    status: 'success',
    description: 'Envio de email de notificação para cliente premium realizado com sucesso',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_2a8f9b7c4d1e',
    duration: '1.2s',
    requestSize: '2.4 KB',
    responseSize: '156 bytes'
  };

  const logs = [
    { time: '12:32:10', level: 'DEBUG', message: 'Iniciando conexão SMTP com servidor mail.empresa.com' },
    { time: '12:32:11', level: 'INFO', message: 'Autenticação realizada com sucesso' },
    { time: '12:32:11', level: 'INFO', message: 'Preparando email para lionel.messi@email.com' },
    { time: '12:32:12', level: 'SUCCESS', message: 'Email enviado com sucesso - ID: msg_abc123' },
    { time: '12:32:12', level: 'INFO', message: 'Conexão SMTP encerrada' }
  ];

  const getStatusColor = (type) => {
    switch(type) {
      case 'INFO': return 'bg-blue-500';
      case 'ERRO': return 'bg-red-500';
      case 'AVISO': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (type) => {
    switch(type) {
      case 'INFO': return <CheckCircle className="w-4 h-4" />;
      case 'ERRO': return <AlertCircle className="w-4 h-4" />;
      case 'AVISO': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'DEBUG': return 'text-gray-400';
      case 'INFO': return 'text-blue-400';
      case 'SUCCESS': return 'text-green-400';
      case 'ERROR': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#081028] text-white">
      {/* Header */}
      <div className="border-b border-slate-700 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar para Auditoria</span>
              </button>
              <div className="h-6 w-px bg-slate-600"></div>
              <h1 className="text-xl font-semibold">Detalhes do Evento</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copiar ID</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Event Summary Card */}
        <div className="bg-[#0B1440] rounded border border-slate-700 p-6 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(eventData.type)}`}></div>
              <h2 className="text-2xl font-bold">{eventData.id}</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                eventData.type === 'INFO' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                eventData.type === 'ERRO' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
              }`}>
                {getStatusIcon(eventData.type)}
                <span>{eventData.type}</span>
              </div>
            </div>
            <div className="text-slate-400">
              <Clock className="w-4 h-4 inline mr-1" />
              {eventData.timestamp}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded p-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">Usuário</span>
              </div>
              <div className="font-semibold">{eventData.user}</div>
            </div>
            
            <div className="bg-slate-900/50 rounded p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Server className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">Serviço</span>
              </div>
              <div className="font-semibold">{eventData.service}</div>
            </div>
            
            <div className="bg-slate-900/50 rounded p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">Duração</span>
              </div>
              <div className="font-semibold">{eventData.duration}</div>
            </div>
            
            <div className="bg-slate-900/50 rounded p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">Status</span>
              </div>
              <div className="font-semibold text-green-400">Sucesso</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-3 mb-6">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'technical', label: 'Detalhes Técnicos' },
            { id: 'logs', label: 'Logs do Sistema' },
            { id: 'context', label: 'Contexto' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#0B1440] rounded border border-slate-700 backdrop-blur-sm">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Descrição do Evento</h3>
              <div className="bg-slate-900/50 rounded p-4 mb-6">
                <p className="text-slate-300 leading-relaxed">{eventData.description}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-3">Informações do Usuário</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nome:</span>
                      <span className="font-medium">{eventData.user}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">IP Address:</span>
                      <span className="font-mono text-sm">{eventData.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Session ID:</span>
                      <span className="font-mono text-sm">{eventData.sessionId}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-200 mb-3">Métricas de Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tempo de Resposta:</span>
                      <span className="font-medium text-green-400">{eventData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tamanho da Requisição:</span>
                      <span className="font-medium">{eventData.requestSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tamanho da Resposta:</span>
                      <span className="font-medium">{eventData.responseSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detalhes Técnicos</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded p-4">
                  <h4 className="font-semibold text-slate-200 mb-3">Configuração do Serviço</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Protocolo:</span>
                      <span className="font-mono">SMTP/TLS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Servidor:</span>
                      <span className="font-mono">mail.empresa.com:587</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timeout:</span>
                      <span className="font-mono">30s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Retry Count:</span>
                      <span className="font-mono">0/3</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0B1440] rounded p-4">
                  <h4 className="font-semibold text-slate-200 mb-3">Headers da Requisição</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="text-slate-300">Content-Type: text/html</div>
                    <div className="text-slate-300">X-Mailer: AppSystem v2.1</div>
                    <div className="text-slate-300">X-Priority: Normal</div>
                    <div className="text-slate-300">Message-ID: &lt;msg_abc123&gt;</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-slate-900/50 rounded p-4">
                <h4 className="font-semibold text-slate-200 mb-3">User Agent</h4>
                <div className="font-mono text-sm text-slate-300 break-all">
                  {eventData.userAgent}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Logs do Sistema</h3>
                <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-sm transition-colors">
                  Atualizar Logs
                </button>
              </div>
              
              <div className="bg-slate-900/50 rounded p-4 font-mono text-sm">
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 py-1">
                      <span className="text-slate-500 w-16">{log.time}</span>
                      <span className={`w-16 font-semibold ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className="text-slate-300 flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'context' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contexto do Evento</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-3">Eventos Relacionados</h4>
                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Login do usuário</div>
                        <div className="text-xs text-slate-400">12:30:45</div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Acesso ao painel</div>
                        <div className="text-xs text-slate-400">12:31:20</div>
                      </div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 flex items-center justify-between border-l-2 border-blue-500">
                      <div>
                        <div className="font-medium text-sm">Envio de email</div>
                        <div className="text-xs text-slate-400">12:32:12</div>
                      </div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-200 mb-3">Informações do Sistema</h4>
                  <div className="bg-slate-900/50 rounded p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">CPU Usage:</span>
                        <span className="text-green-400">12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Memory Usage:</span>
                        <span className="text-green-400">248 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Active Connections:</span>
                        <span className="text-blue-400">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Queue Size:</span>
                        <span className="text-yellow-400">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-slate-200 mb-3">Payload do Evento</h4>
                <div className="bg-slate-900/50 rounded p-4 font-mono text-sm">
                  <pre className="text-slate-300 overflow-x-auto">
{`{
  "eventType": "email_sent",
  "recipient": "lionel.messi@email.com",
  "subject": "Notificação de Conta Premium",
  "template": "premium_notification",
  "metadata": {
    "campaign_id": "camp_2025_premium",
    "user_tier": "premium",
    "notification_type": "account_upgrade"
  },
  "result": {
    "status": "delivered",
    "messageId": "msg_abc123",
    "deliveryTime": "1.2s"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors">
            Marcar como Revisado
          </button>
          <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors">
            Criar Alerta
          </button>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors">
            Reportar Problema
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsScreen;