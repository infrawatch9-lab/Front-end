import { 
  BarChart3, 
  Activity, 
  Bell, 
  Zap,
  Shield,
  CheckCircle,
} from 'lucide-react';

import { Link } from 'react-router-dom';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
              <BarChart3 className="w-4 h-4 mr-2" />
              Real-time Infrastructure Monitoring
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Monitor Your</span><br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Infrastructure
                </span><br />
                <span className="text-white">Like Never Before</span>
              </h1>
              
              <p className="text-xl text-slate-300 max-w-2xl">
                Comprehensive monitoring solution for servers, networks, APIs, and applications 
                with real-time alerts and intelligent insights.
              </p>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Start Monitoring
              </Link>
              <button className="border border-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                View Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center text-blue-400">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center text-amber-400">
                <Bell className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">24/7 Monitoring</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-slate-400 text-sm ml-4">InfraWatch Dashboard</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-green-400 text-2xl font-bold">99.9%</div>
                  <div className="text-slate-400 text-sm">Uptime</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-blue-400 text-2xl font-bold">1,247</div>
                  <div className="text-slate-400 text-sm">Servers</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-amber-400 text-2xl font-bold">23ms</div>
                  <div className="text-slate-400 text-sm">Avg Response</div>
                </div>
              </div>
              
              <div className="h-32 bg-slate-700/30 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
                <svg className="w-full h-full">
                  <path
                    d="M0,100 Q100,60 200,80 T400,70"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;