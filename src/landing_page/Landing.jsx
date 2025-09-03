import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DashboardSection from './DashboardSection';
import ServicesSection from './ServicesSection';
import TerminalSection from './TerminalSection';
import AlertIntegrationsSection from './AlertSection';
import APISection from './ApiSection';
import TeamSection from './TeamSection';
import EnterpriseSection from './EnterpriseSection';
import Footer from './Footer';


// Main Landing Page Component
const InfraWatchLanding = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DashboardSection />
      <ServicesSection />
      <TerminalSection />
      <AlertIntegrationsSection />
      <APISection />
      <TeamSection />
      <EnterpriseSection />
      <Footer />
    </div>
  );
};

export default InfraWatchLanding;
