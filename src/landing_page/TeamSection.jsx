import {
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Team Section
const TeamSection = () => {
  const { t } = useTranslation();
  const teamMembers = [
    {
      name: "Gildo Komba",
      role: `${t('landing.team.roles.project_manager')} | ${t('landing.team.roles.backend_leader')}`,
      description: "Líder e Gestor do Projeto — responsável por coordenar as atividades, planejar o fluxo do projeto, manter a comunicação ativa entre os membros da equipe e oferecer suporte em todas as fases do desenvolvimento.",
      image: "/team_images/Gildo.jpeg",
      color: "from-indigo-500 to-blue-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/gildo-komba-gkomba" },
        { icon: <Github className="w-4 h-4" />, url: "https://github.com/gkomba" }
      ]
    },
    {
      name: "Melzira Ebo",
      role: `${t('landing.team.roles.frontend_dev')} | ${t('landing.team.roles.frontend_leader')}`,
      description: "Programadora Frontend – responsável pela implementação e consumo da interface gráfica e experiência do usuário, bem como suporte e inovação nas áreas de design do projecto.",
      image: "/team_images/Melzira.jpeg",
      color: "from-purple-500 to-pink-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/orisa-melzira-ebo-aab95a267" },
        { icon: <Github className="w-4 h-4" />, url: "https://github.com/ShelbyEbo" }
      ]
    },
    {
      name: "Victor Leonel",
      role: t('landing.team.roles.backend_dev'),
      description: "Engenheiro Backend — responsável pela modelagem do banco de dados, implementação de autenticação e roles, automação de SLAs e desenvolvimento dos microserviços de monitoramento (ping e http).",
      image: "/team_images/Victor.jpeg",
      color: "from-teal-500 to-cyan-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/victor-leonel-the13" },
        { icon: <Github className="w-4 h-4" />, url: "https://github.com/leonel-the13" }
      ]
    },
    {
      name: "Carmo da Gama",
      role: t('landing.team.roles.fullstack_dev'),
      description: "Programador Full Stack — responsável pela implementação dos microserviços de monitoramento (webhook e snmp).",
      image: "/team_images/Carmo.jpeg",
      color: "from-red-500 to-orange-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/carmodagama/" },
        { icon: <Github className="w-4 h-4" />, url: "https://github.com/CarmoDaGama" }
      ]
    },
    {
      name: "Zacarias Casimiro",
      role: t('landing.team.roles.ui_ux_designer'),
      description: "Designer de interfaces com foco em UX, contribuí ativamente para o projeto como um dos responsáveis pela parte visual e também como auxiliar em frontend e backend, garantindo versatilidade e apoio em todas as fases do desenvolvimento.",
      image: "/team_images/Zacarias.jpeg",
      color: "from-green-500 to-emerald-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/zacariascasimiro/" },
        { icon: <Github className="w-4 h-4" />, url: "https://github.com/zacarias39" }
      ]
    },
    {
      name: "Kelson Pedro",
      role: t('landing.team.roles.deploy_specialist'),
      description: "Desenvolvedor com foco em desenvolvimento backend e cibersegurança. No projeto InfraWatch, atuei na configuração do processo de deploy automatizado, estruturando workflows no GitHub Actions para build e publicação das imagens Docker.",
      image: "/team_images/Kelson.jpeg",
      color: "from-yellow-500 to-amber-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/kelson-pedro-760a16381/" },
        { icon: <Github className="w-4 h-4" />, url: "https://github.com/Kelson-D-Pedro" }
      ]
    },
    {
      name: "Reinaldo Sambinga",
      role: t('landing.team.roles.frontend_dev'),
      description: "Desenvolvedor Frontend especializado em criação de interfaces modernas e responsivas, contribuindo para a experiência do usuário e implementação de funcionalidades front-end do projeto.",
      image: "/team_images/Reinaldo.jpeg",
      color: "from-blue-500 to-indigo-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "#" },
        { icon: <Github className="w-4 h-4" />, url: "#" }
      ]
    },
    {
      name: "Dadivaldo Mendonca",
      role: t('landing.team.roles.ui_ux_designer'),
      description: "Designer UI/UX focado na criação de experiências intuitivas e interfaces atrativas, trabalhando em conjunto com a equipe para garantir a melhor usabilidade do sistema.",
      image: "/team_images/Dadivaldo.jpeg",
      color: "from-pink-500 to-rose-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "#" },
        { icon: <Github className="w-4 h-4" />, url: "#" }
      ]
    },
    {
      name: "Leonardo Jorge",
      role: t('landing.team.roles.frontend_dev'),
      description: "Desenvolvedor Frontend com experiência em tecnologias modernas, contribuindo para o desenvolvimento da interface e funcionalidades do sistema de monitoramento.",
      image: "/team_images/Leonardo.jpeg", // Você precisará adicionar esta imagem
      color: "from-cyan-500 to-teal-500",
      social: [
        { icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/leonardo-jorge-65aaab269" },
        { icon: <Github className="w-4 h-4" />, url: "#" }
      ]
    }
  ];

  return (
    <section id="team" className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('landing.team.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('landing.team.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
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
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">
                  {member.description}
                </p>
                
                <div className="flex justify-center space-x-3 mt-auto">
                  {member.social.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">9</div>
              <div className="text-slate-300">Membros Especializados</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-slate-300">Monitoramento Ativo</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-slate-300">Dedicação ao Projeto</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
