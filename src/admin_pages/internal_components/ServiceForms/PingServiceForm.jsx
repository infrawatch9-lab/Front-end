import React from 'react';
import { useTranslation } from 'react-i18next';

const PingServiceForm = ({ config, onChange }) => {
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
            {t('service_types.ping.ip_address')} *
          </label>
          <input
            type="text"
            value={config.ipAddress || ''}
            onChange={(e) => handleConfigChange('ipAddress', e.target.value)}
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors ${
              !config.ipAddress || !config.ipAddress.trim() 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-slate-600 focus:border-blue-500'
            }`}
            placeholder={t('service_types.ping.ip_placeholder')}
          />
          {(!config.ipAddress || !config.ipAddress.trim()) && (
            <p className="text-red-400 text-xs mt-1">{t('common.required')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('service_types.ping.webhook_url')}
          </label>
          <input
            type="url"
            value={config.webhookUrl || ''}
            onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('service_types.ping.webhook_placeholder')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('service_modal.interval_seconds')}
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
            {t('service_modal.timeout_ms')}
          </label>
          <input
            type="number"
            value={config.timeout || 5}
            onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('service_types.ping.packet_size')}
          </label>
          <input
            type="number"
            value={config.packetSize || 32}
            onChange={(e) => handleConfigChange('packetSize', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="8"
            max="65507"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t('service_types.ping.ttl')}
        </label>
        <input
          type="number"
          value={config.ttl || 64}
          onChange={(e) => handleConfigChange('ttl', parseInt(e.target.value))}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="1"
          max="255"
        />
      </div>
    </div>
  );
};

export default PingServiceForm;
