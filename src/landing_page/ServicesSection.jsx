import { 
  Database, 
  Cloud, 
  Zap,
} from 'lucide-react';

// Services Section
const ServicesSection = () => {
  return (
    <section id="services" className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Detailed Service Monitoring
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Deep dive into each service with dedicated dashboards and comprehensive analytics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Database Monitoring</h3>
                <p className="text-slate-300">
                  Monitor database performance, query execution times, connection pools, and resource utilization across MySQL, PostgreSQL, MongoDB, and more.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-green-400 text-2xl font-bold">2.3ms</div>
                <div className="text-slate-400 text-sm">Avg Query Time</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-blue-400 text-2xl font-bold">1,247</div>
                <div className="text-slate-400 text-sm">Active Connections</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">Database Dashboard</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-600/50 p-3 rounded-lg text-center">
                <div className="text-green-400 text-lg font-bold">99.9%</div>
                <div className="text-slate-400 text-xs">Uptime</div>
              </div>
              <div className="bg-slate-600/50 p-3 rounded-lg text-center">
                <div className="text-amber-400 text-lg font-bold">847</div>
                <div className="text-slate-400 text-xs">Queries/sec</div>
              </div>
              <div className="bg-slate-600/50 p-3 rounded-lg text-center">
                <div className="text-red-400 text-lg font-bold">12GB</div>
                <div className="text-slate-400 text-xs">Cache Size</div>
              </div>
            </div>
            
            <div className="h-20 bg-slate-600/30 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around">
                {[40, 65, 45, 80, 35, 90, 55, 70].map((height, i) => (
                  <div 
                    key={i}
                    className="bg-gradient-to-t from-purple-500 to-purple-400 w-6 rounded-t"
                    style={{height: `${height}%`}}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-2">Cloud Resources</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-500 rounded mr-3 flex items-center justify-center text-xs text-white font-bold">AWS</div>
                    <span className="text-white text-sm">EC2 Instances</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 text-sm mr-2">47 Running</span>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded mr-3 flex items-center justify-center text-xs text-white font-bold">G</div>
                    <span className="text-white text-sm">GCP Compute</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 text-sm mr-2">23 Running</span>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-xs text-white font-bold">Az</div>
                    <span className="text-white text-sm">Azure VMs</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm mr-2">15 Warning</span>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Cloud Infrastructure</h3>
                <p className="text-slate-300">
                  Comprehensive monitoring across AWS, Google Cloud, Azure, and other cloud platforms with unified dashboards and cost optimization insights.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-cyan-400 text-2xl font-bold">$2,847</div>
                <div className="text-slate-400 text-sm">Monthly Cost</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-blue-400 text-2xl font-bold">85</div>
                <div className="text-slate-400 text-sm">Active Resources</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Application Performance</h3>
                  <p className="text-slate-400 text-sm">Monitor application performance, error rates, user experience, and business metrics with distributed tracing and real-user monitoring.</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-600/30 p-4 rounded-lg">
                <div className="text-green-400 text-2xl font-bold">0.02%</div>
                <div className="text-slate-400 text-sm">Error Rate</div>
              </div>
              
              <div className="bg-slate-600/30 p-4 rounded-lg">
                <div className="text-blue-400 text-2xl font-bold">234ms</div>
                <div className="text-slate-400 text-sm">Avg Response</div>
              </div>
              
              <div className="bg-slate-600/30 p-4 rounded-lg">
                <h4 className="text-teal-400 text-sm font-medium mb-3">Application Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Response Time</span>
                    <span className="text-green-400 text-sm">Good</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div className="bg-green-400 h-1 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Throughput</span>
                    <span className="text-blue-400 text-sm">Excellent</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div className="bg-blue-400 h-1 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Error Rate</span>
                    <span className="text-green-400 text-sm">Low</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div className="bg-green-400 h-1 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
