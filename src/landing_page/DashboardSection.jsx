import {
  BarChart3,
  Globe,
  Settings,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Dashboard Analytics Section
const DashboardSection = () => {
  const { t } = useTranslation();
  return (
    <section id="dashboard" className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('landing.dashboard.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('landing.dashboard.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span className="text-white font-medium">System Overview</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">CPU Usage</div>
                  <div className="text-2xl font-bold text-white mb-2">67%</div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                  <div className="text-xs text-green-400 mt-1">Normal</div>
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Memory</div>
                  <div className="text-2xl font-bold text-white mb-2">84%</div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '84%'}}></div>
                  </div>
                  <div className="text-xs text-yellow-400 mt-1">Warning</div>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-sm text-slate-400 mb-4 flex items-center justify-between">
                  <span>Network Traffic</span>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mr-1"></div>
                      <span>Inbound</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mr-1"></div>
                      <span>Outbound</span>
                    </div>
                  </div>
                </div>
                <div className="h-24 bg-slate-800/50 rounded relative overflow-hidden">
                  <svg className="w-full h-full">
                    <path d="M0,60 Q50,40 100,45 T200,50 T300,45 T400,50" stroke="#6366f1" strokeWidth="2" fill="none" />
                    <path d="M0,80 Q50,60 100,65 T200,70 T300,65 T400,70" stroke="#8b5cf6" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-teal-400" />
                <span className="text-white font-medium">Global Infrastructure</span>
              </div>
              <button className="text-slate-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-slate-700/30 rounded-lg p-4 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-lg"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-indigo-600/20 rounded-full border-2 border-indigo-500 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-red-400"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                    <span className="text-white text-sm">US East (N. Virginia)</span>
                  </div>
                  <span className="text-slate-400 text-sm">Online</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3"></div>
                    <span className="text-white text-sm">EU (Frankfurt)</span>
                  </div>
                  <span className="text-slate-400 text-sm">Warning</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                    <span className="text-white text-sm">Asia Pacific (Tokyo)</span>
                  </div>
                  <span className="text-slate-400 text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
