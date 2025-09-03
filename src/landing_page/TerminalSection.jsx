import {
  Server, 
  Activity,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Terminal Section
const TerminalSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('landing.terminal.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('landing.terminal.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-black rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-300 text-sm ml-4">terminal — bash — 120×40</span>
            </div>
            
            <div className="p-6 font-mono text-sm">
              <div className="text-green-400">root@infrawatch-01:~# systemctl status nginx</div>
              <div className="text-white">● nginx.service - A high performance web server</div>
              <div className="text-white ml-4">Loaded: loaded (/lib/systemd/system/nginx.service)</div>
              <div className="text-green-400 ml-4">Active: active (running) since Mon 2024-01-15 10:30:25 UTC</div>
              <div className="text-white ml-4">Docs: man:nginx(8)</div>
              <div className="text-white ml-4">Main PID: 1234 (nginx)</div>
              <div className="text-white ml-4">Tasks: 5 (limit: 4915)</div>
              <div className="text-white ml-4">Memory: 12.5M</div>
              <div className="text-white ml-4">CGroup: /system.slice/nginx.service</div>
              <div className="text-white ml-8">├─1234 nginx: master process</div>
              <div className="text-white ml-8">└─1235 nginx: worker process</div>
              <div className="text-green-400">root@infrawatch-01:~# ps aux | grep nginx</div>
              <div className="text-white">root 1234 0.0 0.1 125680 1432 ? Ss 10:30 0:00 nginx: master</div>
              <div className="text-white">www-data 1235 0.0 0.1 126108 2844 ? S 10:30 0:00 nginx: worker</div>
              <div className="text-green-400">root@infrawatch-01:~# <span className="animate-pulse">|</span></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-5 h-5 text-teal-400" />
                <h3 className="text-white font-semibold">Active SSH Sessions</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-white text-sm">admin@192.168.1.100</div>
                    <div className="text-slate-400 text-xs">Connected 2h 15m ago</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-green-400 text-xs">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-white text-sm">deploy@10.0.1.50</div>
                    <div className="text-slate-400 text-xs">Connected 45m ago</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-green-400 text-xs">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-white text-sm">monitor@172.16.0.10</div>
                    <div className="text-slate-400 text-xs">Connected 12m ago</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                    <span className="text-yellow-400 text-xs">Idle</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Server className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-semibold">Running Services</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                    <span className="text-white text-sm">nginx</span>
                  </div>
                  <span className="text-slate-400 text-sm">Running</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                    <span className="text-white text-sm">mysql</span>
                  </div>
                  <span className="text-slate-400 text-sm">Running</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                    <span className="text-white text-sm">redis</span>
                  </div>
                  <span className="text-slate-400 text-sm">Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
