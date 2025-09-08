import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, AlertTriangle } from 'lucide-react';

const SnmpServiceForm = ({ config, onChange }) => {
  const { t } = useTranslation();
  
  const handleConfigChange = (field, value) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  // Validação de OID
  const isValidOID = (oid) => {
    if (!oid) return false;
    const oidPattern = /^[0-9]+(\.[0-9]+)*$/;
    return oidPattern.test(oid);
  };

  // Validação de IP/Host
  const isValidHost = (host) => {
    if (!host) return false;
    // Aceita IPs e hostnames
    const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const hostnamePattern = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
    return ipPattern.test(host) || hostnamePattern.test(host);
  };

  return (
    <div className="space-y-4">
      {/* Informação sobre integração SNMP */}
      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-blue-400 font-medium mb-2">Integração SNMP Avançada</h4>
            <p className="text-slate-300 text-sm">
              Este serviço será automaticamente configurado no Zabbix Server para monitoramento contínuo. 
              Certifique-se de que o host SNMP está acessível e configurado corretamente.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('service_types.snmp.host')} *
          </label>
          <input
            type="text"
            value={config.host || ''}
            onChange={(e) => handleConfigChange('host', e.target.value)}
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
              !config.host || !config.host.trim() 
                ? 'border-red-500 focus:border-red-400' 
                : !isValidHost(config.host)
                ? 'border-yellow-500 focus:border-yellow-400'
                : 'border-slate-600 focus:border-blue-500'
            }`}
            placeholder={t('service_types.snmp.host_placeholder') || '192.168.1.100 ou servidor.exemplo.com'}
          />
          {(!config.host || !config.host.trim()) && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
          {config.host && config.host.trim() && !isValidHost(config.host) && (
            <div className="flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 text-yellow-400 mr-1" />
              <p className="text-yellow-400 text-xs">Formato de IP ou hostname inválido</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('service_types.snmp.version')} *
          </label>
          <select
            value={config.version || 'v2c'}
            onChange={(e) => handleConfigChange('version', e.target.value)}
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
              !config.version 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-slate-600 focus:border-blue-500'
            }`}
          >
            <option value="v1">v1</option>
            <option value="v2c">v2c (Recomendado)</option>
            <option value="v3">v3 (Mais Seguro)</option>
          </select>
          {!config.version && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Porta SNMP
          </label>
          <input
            type="number"
            value={config.port || 161}
            onChange={(e) => handleConfigChange('port', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="65535"
          />
          <p className="text-slate-400 text-xs mt-1">Padrão: 161</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Timeout (ms)
          </label>
          <input
            type="number"
            value={config.timeout || 5000}
            onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1000"
            max="30000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t('service_types.snmp.oid')} *
        </label>
        <input
          type="text"
          value={config.oid || ''}
          onChange={(e) => handleConfigChange('oid', e.target.value)}
          className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
            !config.oid || !config.oid.trim() 
              ? 'border-red-500 focus:border-red-400' 
              : !isValidOID(config.oid)
              ? 'border-yellow-500 focus:border-yellow-400'
              : 'border-slate-600 focus:border-blue-500'
          }`}
          placeholder={t('service_types.snmp.oid_placeholder') || '1.3.6.1.2.1.1.3.0'}
        />
        {(!config.oid || !config.oid.trim()) && (
          <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
        )}
        {config.oid && config.oid.trim() && !isValidOID(config.oid) && (
          <div className="flex items-center mt-1">
            <AlertTriangle className="w-3 h-3 text-yellow-400 mr-1" />
            <p className="text-yellow-400 text-xs">Formato de OID inválido. Use números separados por pontos</p>
          </div>
        )}
        <p className="text-slate-400 text-xs mt-1">
          Exemplos: 1.3.6.1.2.1.1.3.0 (uptime), 1.3.6.1.2.1.1.1.0 (system description)
        </p>
      </div>

      {/* Community for v1 and v2c */}
      {(config.version === 'v1' || config.version === 'v2c' || !config.version) && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Community String
          </label>
          <input
            type="text"
            value={config.community || 'public'}
            onChange={(e) => handleConfigChange('community', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="public"
          />
        </div>
      )}

      {/* v3 Authentication */}
      {config.version === 'v3' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={config.username || ''}
                onChange={(e) => handleConfigChange('username', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Protocolo de Autenticação
              </label>
              <select
                value={config.authProtocol || ''}
                onChange={(e) => handleConfigChange('authProtocol', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Nenhum</option>
                <option value="MD5">MD5</option>
                <option value="SHA">SHA</option>
              </select>
            </div>
          </div>

          {config.authProtocol && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Senha de Autenticação
              </label>
              <input
                type="password"
                value={config.authPassword || ''}
                onChange={(e) => handleConfigChange('authPassword', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Protocolo de Privacidade
              </label>
              <select
                value={config.privProtocol || ''}
                onChange={(e) => handleConfigChange('privProtocol', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Nenhum</option>
                <option value="DES">DES</option>
                <option value="AES">AES</option>
              </select>
            </div>

            {config.privProtocol && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Senha de Privacidade
                </label>
                <input
                  type="password"
                  value={config.privPassword || ''}
                  onChange={(e) => handleConfigChange('privPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Monitoring Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Modo de Monitoramento
          </label>
          <select
            value={config.monitoringMode || 'cron'}
            onChange={(e) => handleConfigChange('monitoringMode', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="cron">Cron</option>
            <option value="interval">Intervalo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Timezone
          </label>
          <input
            type="text"
            value={config.timezone || 'UTC'}
            onChange={(e) => handleConfigChange('timezone', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="UTC, America/Sao_Paulo"
          />
        </div>
      </div>

      {config.monitoringMode === 'cron' && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Expressão Cron
          </label>
          <input
            type="text"
            value={config.cronExpression || '*/5 * * * *'}
            onChange={(e) => handleConfigChange('cronExpression', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="*/5 * * * * (a cada 5 minutos)"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Intervalo de Monitoramento (segundos)
          </label>
          <input
            type="number"
            value={config.interval || 300}
            onChange={(e) => handleConfigChange('interval', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="60"
            max="3600"
          />
          <p className="text-slate-400 text-xs mt-1">Mínimo: 60s, Padrão: 300s (5 minutos)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tentativas
          </label>
          <input
            type="number"
            value={config.retries || 3}
            onChange={(e) => handleConfigChange('retries', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
          />
        </div>
      </div>

      {/* Configurações de Monitoramento */}
      <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4">
        <h4 className="text-slate-300 font-medium mb-3">Configurações de Monitoramento</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Delay entre tentativas (ms)
            </label>
            <input
              type="number"
              value={config.delay || 1000}
              onChange={(e) => handleConfigChange('delay', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="100"
              max="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tempo de Resposta Esperado (ms)
            </label>
            <input
              type="number"
              value={config.expectedResponseTimeMs || 1000}
              onChange={(e) => handleConfigChange('expectedResponseTimeMs', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="100"
              max="10000"
            />
          </div>
        </div>
      </div>

      {/* Configurações opcionais */}
      <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4">
        <h4 className="text-slate-300 font-medium mb-3">Configurações Opcionais</h4>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Webhook para Alertas (Opcional)
          </label>
          <input
            type="url"
            value={config.webhookUrl || ''}
            onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://exemplo.com/webhook"
          />
          <p className="text-slate-400 text-xs mt-1">URL para receber notificações de alertas</p>
        </div>
      </div>
    </div>
  );
};

export default SnmpServiceForm;
