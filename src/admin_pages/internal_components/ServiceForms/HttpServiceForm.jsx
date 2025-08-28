import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HttpServiceForm = ({ config, onChange }) => {
  const { t } = useTranslation();
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
            {t('service_types.http.endpoint')} *
          </label>
          <input
            type="url"
            value={config.endpoint || ''}
            onChange={(e) => handleConfigChange('endpoint', e.target.value)}
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
              !config.endpoint || !config.endpoint.trim() 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-slate-600 focus:border-blue-500'
            }`}
            placeholder={t('service_types.http.endpoint_placeholder')}
          />
          {(!config.endpoint || !config.endpoint.trim()) && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('service_types.http.method')} *
          </label>
          <select
            value={config.method || 'GET'}
            onChange={(e) => handleConfigChange('method', e.target.value)}
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
              !config.method 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-slate-600 focus:border-blue-500'
            }`}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
            <option value="HEAD">HEAD</option>
          </select>
          {!config.method && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
        </div>
      </div>

      {/* Authentication */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tipo de Autenticação
          </label>
          <select
            value={config.authType || 'none'}
            onChange={(e) => handleConfigChange('authType', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="none">Nenhuma</option>
            <option value="bearer">Bearer Token</option>
            <option value="basic">Basic Auth</option>
          </select>
        </div>

        {config.authType && config.authType !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {config.authType === 'bearer' ? 'Token' : 'Credenciais (user:pass)'}
            </label>
            <input
              type={config.authType === 'bearer' ? 'text' : 'password'}
              value={config.authValue || ''}
              onChange={(e) => handleConfigChange('authValue', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={config.authType === 'bearer' ? 'Token...' : 'username:password'}
            />
          </div>
        )}
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

      {/* Body for POST/PUT requests */}
      {config.method && ['POST', 'PUT', 'PATCH'].includes(config.method) && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Body (JSON)
          </label>
          <textarea
            value={typeof config.body === 'object' ? JSON.stringify(config.body, null, 2) : config.body || ''}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleConfigChange('body', parsed);
              } catch {
                handleConfigChange('body', e.target.value);
              }
            }}
            rows={4}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder='{"key": "value"}'
          />
        </div>
      )}

      {/* Validation Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Status HTTP Esperado
          </label>
          <input
            type="number"
            value={config.expectedStatus || 200}
            onChange={(e) => handleConfigChange('expectedStatus', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="100"
            max="599"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tempo de Resposta Máximo (ms)
          </label>
          <input
            type="number"
            value={config.expectedResponseTimeMs || 5000}
            onChange={(e) => handleConfigChange('expectedResponseTimeMs', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Texto Esperado no Body
        </label>
        <input
          type="text"
          value={config.expectedBodyIncludes || ''}
          onChange={(e) => handleConfigChange('expectedBodyIncludes', e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="success, ok, running..."
        />
      </div>

      {/* SSL and Redirects */}
      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.validateSSL !== false}
            onChange={(e) => handleConfigChange('validateSSL', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Validar SSL</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.followRedirects !== false}
            onChange={(e) => handleConfigChange('followRedirects', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Seguir Redirecionamentos</span>
        </label>
      </div>
    </div>
  );
};

export default HttpServiceForm;
