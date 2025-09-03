import { 
  Zap,
  FileText,
  Settings,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// API & Webhooks Section
const APISection = () => {
  const { t } = useTranslation();
  return (
    <section id="api" className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('landing.api.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('landing.api.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{t('landing.api.rest_api')}</h3>
            <p className="text-slate-300">
              {t('landing.api.rest_description')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-slate-300">{t('landing.api.features.retrieve_metrics')}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-slate-300">{t('landing.api.features.configure_rules')}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-slate-300">{t('landing.api.features.manage_team')}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-slate-300">{t('landing.api.features.export_data')}</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Webhooks</h4>
              <p className="text-slate-300 mb-4">
                Receive real-time notifications about infrastructure events via HTTP webhooks with customizable payloads.
              </p>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h5 className="text-white text-sm font-medium mb-3">Webhook Events</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-slate-300 text-sm">alert.triggered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                    <span className="text-slate-300 text-sm">alert.resolved</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-slate-300 text-sm">server.down</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                    <span className="text-slate-300 text-sm">maintenance.started</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-slate-300 text-sm ml-4">API Documentation</span>
              </div>
              <button className="text-slate-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 font-mono text-sm space-y-4">
              <div>
                <div className="text-green-400 mb-2"># Get server metrics</div>
                <div className="text-slate-300">curl</div>
                <div className="text-slate-300 ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
                <div className="text-slate-300 ml-4">-H "Content-Type: application/json"</div>
                <div className="text-slate-300 ml-4">https://api.infrawatch.com/v1/servers/metrics</div>
              </div>
              
              <div>
                <div className="text-green-400 mb-2"># Response</div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-slate-300">{'{'}</div>
                  <div className="text-blue-400 ml-2">"status": "success",</div>
                  <div className="text-blue-400 ml-2">"data": {'{'}</div>
                  <div className="text-amber-400 ml-4">"cpu_usage": 67.5,</div>
                  <div className="text-amber-400 ml-4">"memory_usage": 84.2,</div>
                  <div className="text-amber-400 ml-4">"disk_usage": 45.8,</div>
                  <div className="text-amber-400 ml-4">"uptime": 2847609</div>
                  <div className="text-blue-400 ml-2">{'}'}</div>
                  <div className="text-slate-300">{'}'}</div>
                </div>
              </div>
              
              <div>
                <div className="text-green-400 mb-2"># Create alert rule</div>
                <div className="text-slate-300">curl</div>
                <div className="text-slate-300 ml-4">-X POST</div>
                <div className="text-slate-300 ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
                <div className="text-slate-300 ml-4">{`-d '{"name": "High CPU", "threshold": 80}'`}</div>
                <div className="text-slate-300 ml-4">https://api.infrawatch.com/v1/alerts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.api.secure_auth.title')}</h3>
            <p className="text-slate-300 text-sm">
              {t('landing.api.secure_auth.description')}
            </p>
          </div>
          
          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.api.comprehensive_docs_section.title')}</h3>
            <p className="text-slate-300 text-sm">
              {t('landing.api.comprehensive_docs_section.description')}
            </p>
          </div>
          
          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.api.high_performance.title')}</h3>
            <p className="text-slate-300 text-sm">
              {t('landing.api.high_performance.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APISection;
