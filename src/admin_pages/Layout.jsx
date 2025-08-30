import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../contexts/SidebarContext';
import { useTranslation } from 'react-i18next';
import Topbar from '../components/Topbar'
import CustomDiv from '../components/CustomComponents/CustomDiv';

function LayoutContent() {
  const { isOpen } = useSidebar();

  return (
    <CustomDiv className="flex">
      <Sidebar />
      <main 
        className={`flex-1 bg-gray-100 min-h-screen transition-all duration-100 ${
          isOpen ? 'ml-64' : 'ml-20'
        }`} 
        style={{padding: '0px', margin: '0px', marginLeft: isOpen ? '256px' : '80px'}}
      >
        <Topbar/>
        <Outlet />
      </main>
    </CustomDiv>
  );
}

export default function Layout() {
  const { t } = useTranslation();
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}
