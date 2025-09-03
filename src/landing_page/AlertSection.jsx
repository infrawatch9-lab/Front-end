import { 
  Bell,
  MessageSquare,
  Send,
  Hash,
  Filter,
  GitBranch,
  Calendar,
} from 'lucide-react';

// Alert Integrations Section
const AlertIntegrationsSection = () => {
  const integrations = [
    {
      name: "Slack Integration",
      icon: <Hash className="w-8 h-8" />,
      description: "Send alerts directly to Slack channels with rich formatting, interactive buttons, and thread-based incident management.",
      color: "from-purple-500 to-pink-500",
      alertExample: {
        type: "Critical Alert",
        message: "Server web-01 is down",
        time: "2 minutes ago",
        actions: ["Acknowledge", "View Details"]
      }
    },
    {
      name: "Telegram Bot",
      icon: <Send className="w-8 h-8" />,
      description: "Receive instant notifications via Telegram with inline keyboards for quick actions and status updates.",
      color: "from-blue-500 to-cyan-500",
      alertExample: {
        type: "InfraWatch Bot",
        message: "Database connection timeout",
        time: "mysql-prod-01 • 5 minutes ago",
        actions: ["✅ Ack", "📊 Details"]
      }
    },
    {
      name: "Google Chat",
      icon: <MessageSquare className="w-8 h-8" />,
      description: "Integrate with Google Workspace to send alerts to Google Chat spaces with card-based notifications.",
      color: "from-green-500 to-teal-500",
      alertExample: {
        type: "Warning Alert",
        message: "High memory usage detected",
        time: "app-server-03 • Memory: 87%",
        actions: ["View in Dashboard"]
      }
    }
  ];

  return (
    <section id="integrations" className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Alert Integrations
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get notified instantly through your preferred channels with smart routing and escalation policies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-r ${integration.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
                  <span className="text-white text-sm font-medium">{integration.alertExample.type}</span>
                </div>
                
                <div className="text-white text-sm mb-1">{integration.alertExample.message}</div>
                <div className="text-slate-400 text-xs mb-3">{integration.alertExample.time}</div>
                
                <div className="flex space-x-2">
                  {integration.alertExample.actions.map((action, i) => (
                    <button key={i} className="bg-slate-500/50 hover:bg-slate-500 text-white text-xs px-3 py-1 rounded transition-colors">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-700/20 backdrop-blur-sm border border-slate-600 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Smart Alert Routing</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Intelligent Filtering</h4>
              <p className="text-slate-300 text-sm">
                Reduce noise with smart alert filtering based on severity, frequency, and historical patterns.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Escalation Policies</h4>
              <p className="text-slate-300 text-sm">
                Configure multi-level escalation with time-based routing to ensure critical issues are addressed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">On-Call Scheduling</h4>
              <p className="text-slate-300 text-sm">
                Automated on-call rotation with timezone support and holiday management for global teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertIntegrationsSection;
