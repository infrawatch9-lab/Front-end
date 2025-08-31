import {
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';

// Team Section
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead Infrastructure Engineer",
      description: "10+ years experience in large-scale infrastructure monitoring and cloud architecture. Expert in Kubernetes and microservices.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      color: "from-indigo-500 to-blue-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "#" },
        { icon: <Github className="w-4 h-4" />, url: "#" },
        { icon: <Twitter className="w-4 h-4" />, url: "#" }
      ]
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior DevOps Engineer",
      description: "Specializes in automation, CI/CD pipelines, and infrastructure as code. AWS and Azure certified professional.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      color: "from-purple-500 to-pink-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "#" },
        { icon: <Github className="w-4 h-4" />, url: "#" },
        { icon: <Twitter className="w-4 h-4" />, url: "#" }
      ]
    },
    {
      name: "Emma Thompson",
      role: "Data Analytics Lead",
      description: "Expert in time-series data analysis, machine learning for anomaly detection, and performance optimization algorithms.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      color: "from-teal-500 to-cyan-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "#" },
        { icon: <Github className="w-4 h-4" />, url: "#" },
        { icon: <Twitter className="w-4 h-4" />, url: "#" }
      ]
    },
    {
      name: "David Park",
      role: "Security & Compliance Officer",
      description: "Ensures enterprise-grade security and compliance standards. Expert in GDPR, SOC2, and cybersecurity frameworks.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      color: "from-red-500 to-orange-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "#" },
        { icon: <Github className="w-4 h-4" />, url: "#" },
        { icon: <Twitter className="w-4 h-4" />, url: "#" }
      ]
    }
  ];

  return (
    <section id="team" className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our team of infrastructure monitoring experts is dedicated to keeping your systems running smoothly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-xl mx-auto object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1 text-center">
                  {member.name}
                </h3>
                <div className={`text-sm font-medium mb-3 text-center bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                  {member.role}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                
                <div className="flex justify-center space-x-3">
                  {member.social.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url}
                      className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-700/20 backdrop-blur-sm border border-slate-600 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-slate-300">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-slate-300">Expert Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">1000+</div>
              <div className="text-slate-300">Enterprise Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
