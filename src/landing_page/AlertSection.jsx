import {
  Bell,
  MessageSquare,
  Send,
  Hash,
  Filter,
  GitBranch,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Alert Integrations Section
const AlertIntegrationsSection = () => {
  const { t } = useTranslation();
  const integrations = [
    {
      name: t("landing.alerts.slack"),
      icon: <Hash className="w-8 h-8" />,
      description: t("landing.alerts.slack_description"),
      color: "from-purple-500 to-pink-500",
      alertExample: {
        type: "Critical Alert",
        message: "Server web-01 is down",
        time: "2 minutes ago",
        actions: ["Acknowledge", "View Details"],
      },
    },
    {
      name: t("landing.alerts.mobile"),
      icon: <Send className="w-8 h-8" />,
      description: t("landing.alerts.mobile_description"),
      color: "from-blue-500 to-cyan-500",
      alertExample: {
        type: "InfraWatch Bot",
        message: "Database connection timeout",
        time: "mysql-prod-01 • 5 minutes ago",
        actions: ["✅ Ack", "📊 Details"],
      },
    },
    {
      name: t("landing.alerts.email"),
      icon: <MessageSquare className="w-8 h-8" />,
      description: t("landing.alerts.email_description"),
      color: "from-green-500 to-teal-500",
      alertExample: {
        type: "Warning Alert",
        message: "High memory usage detected",
        time: "app-server-03 • Memory: 87%",
        actions: ["View in Dashboard"],
      },
    },
  ];

  return (
    <section id="integrations" className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t("landing.alerts.title")}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t("landing.alerts.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${integration.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {integration.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {integration.name}
              </h3>

              <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                {integration.description}
              </p>

              <div className="bg-slate-600/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                    <Bell className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {integration.alertExample.type}
                  </span>
                </div>

                <div className="text-white text-sm mb-1">
                  {integration.alertExample.message}
                </div>
                <div className="text-slate-400 text-xs mb-3">
                  {integration.alertExample.time}
                </div>

                <div className="flex space-x-2">
                  {integration.alertExample.actions.map((action, i) => (
                    <button
                      key={i}
                      className="bg-slate-500/50 hover:bg-slate-500 text-white text-xs px-3 py-1 rounded transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-700/20 backdrop-blur-sm border border-slate-600 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            {t("landing.alerts.smart_alert_routing")}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {t("landing.alerts.intelligent_filtering.title")}
              </h4>
              <p className="text-slate-300 text-sm">
                {t("landing.alerts.intelligent_filtering.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {t("landing.alerts.escalation_policies.title")}
              </h4>
              <p className="text-slate-300 text-sm">
                {t("landing.alerts.escalation_policies.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {t("landing.alerts.on_call_scheduling.title")}
              </h4>
              <p className="text-slate-300 text-sm">
                {t("landing.alerts.on_call_scheduling.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertIntegrationsSection;
