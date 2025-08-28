import React from 'react';
import { useTranslation } from 'react-i18next';

const SnmpServiceForm = ({ config, onChange }) => {
  const { t } = useTranslation();
  const handleConfigChange = (field, value) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
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
                : 'border-slate-600 focus:border-blue-500'
            }`}
            placeholder={t('service_types.snmp.host_placeholder')}
          />
          {(!config.host || !config.host.trim()) && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
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
            <option value="v2c">v2c</option>
            <option value="v3">v3</option>
          </select>
          {!config.version && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
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
              : 'border-slate-600 focus:border-blue-500'
          }`}
          placeholder={t('service_types.snmp.oid_placeholder')}
        />
        {(!config.oid || !config.oid.trim()) && (
          <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
        )}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Intervalo (segundos)
          </label>
          <input
            type="number"
            value={config.interval || 60}
            onChange={(e) => handleConfigChange('interval', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
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
          />
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
          />
        </div>
      </div>

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
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Webhook URL
        </label>
        <input
          type="url"
          value={config.webhookUrl || ''}
          onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://exemplo.com/webhook"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={config.autoGenerate || false}
          onChange={(e) => handleConfigChange('autoGenerate', e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
        />
        <label className="text-sm text-slate-300">
          Auto-gerar configurações
        </label>
      </div>
    </div>
  );
};

export default SnmpServiceForm;
