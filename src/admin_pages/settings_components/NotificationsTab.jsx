import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import ConfigCard from "./ConfigCard";
import DynamicHeadersField from "./DynamicHeadersField";

// import ToggleSwitch from "./ToggleSwitch";
// import ConfigCard from "./ConfigCard";
// import DynamicHeadersField from "./DynamicHeadersField";

export default function NotificationsTab() {
  // Estados para os toggles
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(true);

  // Estados para os formulários
  const [emailConfig, setEmailConfig] = useState({
    smtp: "smtp.exemplo.com",
    porta: "587",
    remetente: "no-reply@smtp.exemplo.com"
  });

  const [slackConfig, setSlackConfig] = useState({
    webhookUrl: "https://hooks.slack.com/services/...",
    canalPadrao: "#alertas"
  });

  const [smsConfig, setSmsConfig] = useState({
    apiToken: "ex: 1a2b3c...",
    numeroCanal: "ex: +2449... @canal"
  });

  const [webhookConfig, setWebhookConfig] = useState({
    endpointUrl: "https://hooks.slack.com/services/...",
    headers: [
      { chave: "#alertas", valor: "#alertas" },
      { chave: "#alertas", valor: "#alertas" }
    ],
    secretToken: "https://hooks.slack.com/services/..."
  });

  const handleSave = (configType) => {
    console.log(`Salvando configurações de ${configType}`);
    // Aqui você implementaria a lógica de salvamento via API
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* EMAIL Card */}
      <ConfigCard
        title="EMAIL"
        icon="📧"
        enabled={emailEnabled}
        onToggle={setEmailEnabled}
        onSave={() => handleSave('email')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              SMTP
            </label>
            <input
              type="text"
              value={emailConfig.smtp}
              onChange={(e) => setEmailConfig({...emailConfig, smtp: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!emailEnabled}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              PORTA
            </label>
            <input
              type="text"
              value={emailConfig.porta}
              onChange={(e) => setEmailConfig({...emailConfig, porta: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!emailEnabled}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              REMETENTE
            </label>
            <input
              type="email"
              value={emailConfig.remetente}
              onChange={(e) => setEmailConfig({...emailConfig, remetente: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!emailEnabled}
            />
          </div>
        </div>
      </ConfigCard>

      {/* SLACK / TEAMS Card */}
      <ConfigCard
        title="SLACK / TEAMS"
        icon="#"
        enabled={slackEnabled}
        onToggle={setSlackEnabled}
        onSave={() => handleSave('slack')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              value={slackConfig.webhookUrl}
              onChange={(e) => setSlackConfig({...slackConfig, webhookUrl: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!slackEnabled}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Canal Padrão
            </label>
            <input
              type="text"
              value={slackConfig.canalPadrao}
              onChange={(e) => setSlackConfig({...slackConfig, canalPadrao: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!slackEnabled}
            />
          </div>
        </div>
      </ConfigCard>

      {/* SMS / TELEGRAM Card */}
      <ConfigCard
        title="SMS / TELEGRAM"
        icon="💬"
        enabled={smsEnabled}
        onToggle={setSmsEnabled}
        onSave={() => handleSave('sms')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              API Token / Chave
            </label>
            <input
              type="password"
              value={smsConfig.apiToken}
              onChange={(e) => setSmsConfig({...smsConfig, apiToken: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!smsEnabled}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Número / Canal padrão
            </label>
            <input
              type="text"
              value={smsConfig.numeroCanal}
              onChange={(e) => setSmsConfig({...smsConfig, numeroCanal: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!smsEnabled}
            />
          </div>
        </div>
      </ConfigCard>

      {/* WEBHOOK GENÉRICO Card */}
      <ConfigCard
        title="WEBHOOK GENÉRICO"
        icon="#"
        enabled={webhookEnabled}
        onToggle={setWebhookEnabled}
        onSave={() => handleSave('webhook')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Endpoint URL
            </label>
            <input
              type="url"
              value={webhookConfig.endpointUrl}
              onChange={(e) => setWebhookConfig({...webhookConfig, endpointUrl: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!webhookEnabled}
            />
          </div>

          <DynamicHeadersField
            headers={webhookConfig.headers}
            onChange={(headers) => setWebhookConfig({...webhookConfig, headers})}
            disabled={!webhookEnabled}
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Secret / Token
            </label>
            <input
              type="password"
              value={webhookConfig.secretToken}
              onChange={(e) => setWebhookConfig({...webhookConfig, secretToken: e.target.value})}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={!webhookEnabled}
            />
          </div>
        </div>
      </ConfigCard>
    </div>
  );
}
