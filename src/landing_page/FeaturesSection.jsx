import {
  Network, 
  Server, 
  Activity, 
  Bell,
  CheckCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Features Section Component
const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <Network className="w-8 h-8" />,
      title: t('landing.features.network_insights.title'),
      description: t('landing.features.network_insights.description'),
      features: ["Real-time network topology", "Bandwidth monitoring", "SNMP support"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: t('landing.features.real_time.title'),
      description: t('landing.features.real_time.description'),
      features: ["CPU & Memory tracking", "Disk usage monitoring", "Process monitoring"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: t('landing.features.api_monitoring.title'),
      description: t('landing.features.api_monitoring.description'),
      features: ["Response time tracking", "Error rate monitoring", "SLA compliance"],
      color: "from-teal-500 to-green-500"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: t('landing.features.intelligent_alerts.title'),
      description: t('landing.features.intelligent_alerts.description'),
      features: ["Smart alert routing", "Multi-channel notifications", "Escalation policies"],
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('landing.features.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 h-full hover:border-slate-500 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
