import { 
  Network,
  Activity,
  Shield,
  Users,
  Lock,
  CheckCircle,
  Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Enterprise Features Section
const EnterpriseSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('landing.enterprise.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('landing.enterprise.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">{t('landing.enterprise.sla_compliance.title')}</h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              {t('landing.enterprise.sla_compliance.description')}
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <span className="text-slate-300 text-sm">{t('landing.enterprise.sla_compliance.uptime_sla')}</span>
                <span className="text-green-400 text-sm font-semibold">99.99%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <span className="text-slate-300 text-sm">{t('landing.enterprise.sla_compliance.response_time_sla')}</span>
                <span className="text-blue-400 text-sm font-semibold">100ms</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <span className="text-slate-300 text-sm">{t('landing.enterprise.sla_compliance.support_response')}</span>
                <span className="text-amber-400 text-sm font-semibold"> 15min</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Network className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">{t('landing.enterprise.snmp_monitoring.title')}</h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              {t('landing.enterprise.snmp_monitoring.description')}
            </p>
            
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="text-white text-sm font-medium mb-3">Supported Protocols</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-slate-300 text-sm">SNMPv1</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-slate-300 text-sm">SNMPv2c</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-slate-300 text-sm">SNMPv3</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-slate-300 text-sm">Custom MIBs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">{t('landing.enterprise.webhook_integration.title')}</h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              {t('landing.enterprise.webhook_integration.description')}
            </p>
            
            <div className="bg-slate-700/30 p-4 rounded-lg font-mono text-xs">
              <div className="text-green-400 mb-2"># Webhook payload example</div>
              <div className="text-slate-300">{'{'}</div>
              <div className="text-blue-400 ml-2">"event": "alert.triggered",</div>
              <div className="text-blue-400 ml-2">"timestamp": "2024-01-15T10:30:00Z",</div>
              <div className="text-amber-400 ml-2">"severity": "critical",</div>
              <div className="text-amber-400 ml-2">"message": "Server down",</div>
              <div className="text-purple-400 ml-2">{`"metadata": {...}`}</div>
              <div className="text-slate-300">{'}'}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/20 backdrop-blur-sm border border-slate-600 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Security & Compliance Standards</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t('landing.enterprise.compliance.soc2.title')} Type II</h4>
              <p className="text-slate-300 text-sm">
                {t('landing.enterprise.compliance.soc2.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t('landing.enterprise.compliance.iso27001.title')}</h4>
              <p className="text-slate-300 text-sm">
                {t('landing.enterprise.compliance.iso27001.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t('landing.enterprise.compliance.gdpr.title')}</h4>
              <p className="text-slate-300 text-sm">
                {t('landing.enterprise.compliance.gdpr.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t('landing.enterprise.compliance.hipaa.title')}</h4>
              <p className="text-slate-300 text-sm">
                {t('landing.enterprise.compliance.hipaa.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
