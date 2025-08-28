import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WebhookServiceForm = ({ config, onChange }) => {
  const { t } = useTranslation();
  const [headers, setHeaders] = useState(config.headers || {});
  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');

  // Proteção contra autocomplete no formulário de webhook
  useEffect(() => {
    const interval = setInterval(() => {
      // Verificar campos de headers
      document.querySelectorAll('input[name*="webhook-header"]').forEach(input => {
        if (input.value && input.value.includes('@') && input !== document.activeElement) {
          input.value = '';
          if (input.name.includes('key')) {
            setNewHeaderKey('');
          } else if (input.name.includes('value')) {
            setNewHeaderValue('');
          }
        }
      });
      
      // Verificar outros campos do webhook
      document.querySelectorAll('input[name*="webhook-"]').forEach(input => {
        if (input.value && input.value.includes('@') && input !== document.activeElement) {
          input.value = '';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Limpeza inicial
  useEffect(() => {
    const clearFields = () => {
      setNewHeaderKey('');
      setNewHeaderValue('');
    };
    
    const timers = [
      setTimeout(clearFields, 100),
      setTimeout(clearFields, 300),
      setTimeout(clearFields, 500)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleConfigChange = (field, value) => {
    const newConfig = {
      ...config,
      [field]: value,
      // Sempre definir método como POST para webhooks
      method: 'POST'
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
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Provedor *
        </label>
        <select
          value={config.provedor || ''}
          onChange={(e) => handleConfigChange('provedor', e.target.value)}
          className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
            !config.provedor || !config.provedor.trim() 
              ? 'border-red-500 focus:border-red-400' 
              : 'border-slate-600 focus:border-blue-500'
          }`}
        >
          <option value="" disabled>Selecione um provedor</option>
          <option value="github">GitHub</option>
          <option value="gitlab">GitLab</option>
          <option value="bitbucket">Bitbucket</option>
          <option value="jenkins">Jenkins</option>
          <option value="azure-devops">Azure DevOps</option>
          <option value="custom">Personalizado</option>
        </select>
        {(!config.provedor || !config.provedor.trim()) && (
          <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
        )}
        <p className="text-sm text-slate-400 mt-1">
          Especifique de onde virá este webhook (GitHub, GitLab, etc.)
        </p>
      </div>

      {/* Campo personalizado - aparece quando "Personalizado" é selecionado */}
      {config.provedor === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nome do Provedor Personalizado *
          </label>
          <input
            type="text"
            value={config.customProvedor || ''}
            onChange={(e) => handleConfigChange('customProvedor', e.target.value)}
            autoComplete="nope"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            name="webhook-custom-provider"
            data-lpignore="true"
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
              !config.customProvedor || !config.customProvedor.trim() 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-slate-600 focus:border-blue-500'
            }`}
            placeholder="Ex: Meu Sistema Personalizado, API Custom, etc."
          />
          {(!config.customProvedor || !config.customProvedor.trim()) && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
          <p className="text-sm text-slate-400 mt-1">
            Digite o nome do sistema ou serviço de onde virá o webhook
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Secret (Chave secreta para assinatura)
        </label>
        <input
          type="password"
          value={config.secret || ''}
          onChange={(e) => handleConfigChange('secret', e.target.value)}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          name="webhook-secret-key"
          data-lpignore="true"
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
            {/* Campos iscas para confundir autocomplete */}
            <input type="email" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} tabIndex={-1} />
            <input type="password" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} tabIndex={-1} />
            
            <input
              type="text"
              value={newHeaderKey}
              onChange={(e) => setNewHeaderKey(e.target.value)}
              placeholder="Nome do header"
              autoComplete="nope"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              name="webhook-header-key"
              data-lpignore="true"
              onFocus={(e) => {
                // Limpa se foi preenchido automaticamente
                if (e.target.value !== newHeaderKey) {
                  setNewHeaderKey('');
                  e.target.value = '';
                }
              }}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newHeaderValue}
              onChange={(e) => setNewHeaderValue(e.target.value)}
              placeholder="Valor do header"
              autoComplete="nope"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              name="webhook-header-value"
              data-lpignore="true"
              onFocus={(e) => {
                // Limpa se foi preenchido automaticamente
                if (e.target.value !== newHeaderValue) {
                  setNewHeaderValue('');
                  e.target.value = '';
                }
              }}
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
          <p>• O endpoint será gerado automaticamente após a criação do serviço</p>
          <p>• Configure o provedor para especificar de onde virá o webhook</p>
          <p>• Use o secret para validar a autenticidade das requisições</p>
          <p>• Headers personalizados podem ser usados para autenticação adicional</p>
          <p>• O método HTTP será sempre POST para recebimento do webhook</p>
        </div>
      </div>
    </div>
  );
};

export default WebhookServiceForm;
