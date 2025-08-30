import { Bell, HelpCircle, Search } from "lucide-react";
import { useTranslation } from 'react-i18next';
import "./Topbar.styles.css"
import CustomDiv from "./CustomComponents/CustomDiv";
import { useTheme } from "../hooks/useTheme/useTheme";

export default function TopBar() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  return (
    <CustomDiv className="flex items-center justify-between w-full p-4 bg-[#0B1440]">
      
      {/* Barra de pesquisa ocupa o espaço máximo possível */}
      <CustomDiv className="flex items-center bg-white rounded-full px-4 py-2 flex-1 max-w-2xl shadow-md content-search">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          style={{ backgroundColor: "transparent", color: theme == 'dark' ? "white" : "#0B143F" }}
          type="text"
          placeholder={t('navigation.search') || 'Pesquisar...'}
          className="flex-1 outline-none text-gray-700"
        />
      </CustomDiv>

      {/* Ícones e avatar no canto direito */}
      <CustomDiv className="flex items-center space-x-4 ml-4">
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20" style={{ backgroundColor: theme == 'dark'? "": "#ddddddff" }}>
          <Bell className={ theme == 'dark' ? "text-white" + " w-5 h-5" : "" + " w-5 h-5"} />
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20" style={{ backgroundColor: theme == 'dark'? "": "#ddddddff" }}>
          <HelpCircle className={ theme == 'dark' ? "items-colors-light" + " w-5 h-5" : "items-colors-dark" + " w-5 h-5"} />
        </button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // coloca sua imagem na pasta public
          alt="Perfil"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </CustomDiv>
    </CustomDiv>
  );
}
