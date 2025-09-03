import { 
  BarChart3, 
  Github,
  Linkedin,
  Twitter,
  Youtube
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Footer Component
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-800 border-t border-slate-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">InfraWatch</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('landing.footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('landing.footer.product')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.features')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Dashboard</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Integrations</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.api_reference')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Mobile Apps</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('landing.footer.company')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.about')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.careers')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Press</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Partners</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('landing.footer.support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.help_center')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.documentation')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Community</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.status')}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.privacy')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 InfraWatch. {t('landing.footer.all_rights_reserved')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.terms')}</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.privacy')}</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{t('landing.footer.cookies')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
