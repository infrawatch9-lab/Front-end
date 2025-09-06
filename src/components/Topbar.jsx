import { Bell, HelpCircle, Search } from "lucide-react";
import { useTranslation } from 'react-i18next';
import "./Topbar.styles.css"
import CustomDiv from "./CustomComponents/CustomDiv";
import { useTheme } from "../hooks/useTheme/useTheme";
import { useState } from "react";
import NotificationView from "./CustomComponents/NotificationView";

export default function TopBar() {
  const { t } = useTranslation();
  const [ hideNotify, setHideNotify ] = useState(false)

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
      <CustomDiv className="flex items-center space-x-4 ml-4 "
      >
        <button onClick={() => setHideNotify((old) => !old)} className="p-2 rounded-full bg-white/10 hover:bg-white/20" style={{ backgroundColor: theme == 'dark'? "": "#ddddddff" }}>
          <div style={{ position: 'absolute', marginLeft: '20px', marginTop: "-10px", backgroundColor: 'red', width: '20px', height: '20px', borderRadius: "100%" }}>
            <span style={{fontWeight: 'bold'}}
            className={" text-colors-light " }
            >6</span>
          </div>
          <Bell className={ theme == 'dark' ? "text-white" + " w-5 h-5" : "" + " w-5 h-5"} />
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20" style={{ backgroundColor: theme == 'dark'? "": "#ddddddff" }}>
          <HelpCircle className={ theme == 'dark' ? "items-colors-light" + " w-5 h-5" : "items-colors-dark" + " w-5 h-5"} />
        </button>
      </CustomDiv>
      {
        hideNotify && (
           <NotificationView />
        )
      }
    </CustomDiv>
  );
}
