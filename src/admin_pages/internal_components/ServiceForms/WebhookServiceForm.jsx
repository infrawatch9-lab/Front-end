import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const WebhookServiceForm = ({ config, onChange }) => {
  const [headers, setHeaders] = useState(config.headers || {});
  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');

  const handleConfigChange = (field, value) => {
    const newConfig = {
      ...config,
      [field]: value
    };
    onChange(newConfig);
  };

  const addHeader = () => {
    if (newHeaderKey.trim() && newHeaderValue.trim()) {
      const newHeaders = {
        ...headers,
        [newHeaderKey]: newHeaderValue
      };
      setHeaders(newHeaders);
      handleConfigChange('headers', newHeaders);
      setNewHeaderKey('');
      setNewHeaderValue('');
    }
  };

  const removeHeader = (key) => {
    const newHeaders = { ...headers };
    delete newHeaders[key];
    setHeaders(newHeaders);
    handleConfigChange('headers', newHeaders);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Endpoint URL *
          </label>
          <input
            type="url"
            value={config.endpoint || ''}
            onChange={(e) => handleConfigChange('endpoint', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://webhook.exemplo.com/notify"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Método HTTP *
          </label>
          <select
            value={config.method || 'POST'}
            onChange={(e) => handleConfigChange('method', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Secret (Chave secreta para assinatura)
        </label>
        <input
          type="password"
          value={config.secret || ''}
          onChange={(e) => handleConfigChange('secret', e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Chave secreta para validação do webhook"
        />
        <p className="text-sm text-slate-400 mt-1">
          Usado para gerar assinatura HMAC do payload
        </p>
      </div>

      {/* Headers */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Headers Personalizados
        </label>
        <div className="space-y-2">
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <input
                type="text"
                value={key}
                disabled
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400"
              />
              <input
                type="text"
                value={value}
                disabled
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400"
              />
              <button
                onClick={() => removeHeader(key)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newHeaderKey}
              onChange={(e) => setNewHeaderKey(e.target.value)}
              placeholder="Nome do header"
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newHeaderValue}
              onChange={(e) => setNewHeaderValue(e.target.value)}
              placeholder="Valor do header"
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addHeader}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Common Headers Suggestions */}
      <div>
        <p className="text-sm text-slate-400 mb-2">Headers comuns:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'Content-Type', value: 'application/json' },
            { key: 'Authorization', value: 'Bearer YOUR_TOKEN' },
            { key: 'X-Custom-Header', value: 'custom-value' },
            { key: 'User-Agent', value: 'InfraWatch/1.0' }
          ].map((suggestion) => (
            <button
              key={suggestion.key}
              onClick={() => {
                setNewHeaderKey(suggestion.key);
                setNewHeaderValue(suggestion.value);
              }}
              className="px-3 py-1 text-xs bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors"
            >
              {suggestion.key}
            </button>
          ))}
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-2">
          📋 Informações sobre Webhooks
        </h4>
        <div className="text-sm text-slate-300 space-y-1">
          <p>• Os webhooks serão chamados quando eventos de monitoramento ocorrerem</p>
          <p>• O payload incluirá informações sobre o serviço e o evento</p>
          <p>• Use o secret para validar a autenticidade das requisições</p>
          <p>• Headers personalizados podem ser usados para autenticação adicional</p>
        </div>
      </div>

      {/* Payload Preview */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Exemplo de Payload que será enviado:
        </label>
        <textarea
          readOnly
          value={JSON.stringify({
            service: {
              id: "uuid",
              name: "Nome do Serviço",
              type: "SERVICE_TYPE"
            },
            event: {
              type: "STATUS_CHANGE",
              status: "DOWN",
              timestamp: "2024-01-01T00:00:00Z",
              message: "Service is down"
            },
            metadata: {
              responseTime: 5000,
              errorCode: "TIMEOUT"
            }
          }, null, 2)}
          rows={8}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400 font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default WebhookServiceForm;
