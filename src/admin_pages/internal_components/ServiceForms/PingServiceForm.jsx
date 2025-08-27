import React from 'react';

const PingServiceForm = ({ config, onChange }) => {
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
            Endereço IP *
          </label>
          <input
            type="text"
            value={config.ipAddress || ''}
            onChange={(e) => handleConfigChange('ipAddress', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="192.168.1.1"
          />
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
      </div>

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
            Timeout (segundos)
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
            Tamanho do Pacote (bytes)
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
          TTL (Time To Live)
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
