import React from 'react';
import CustomDiv from '../../../components/CustomComponents/CustomDiv';
import { useTheme } from '../../../hooks/useTheme/useTheme';

export default function StatusPanel() {
  const { theme } = useTheme()
  return (
    <CustomDiv className="bg-[#0B1440] rounded-lg p-6 border border-[#3B5B75]">
      <h3 className={"text-white text-lg font-semibold mb-4 " + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>ESTADO</h3>
      
      <div className="space-y-4">
        {/* Status Principal */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className={" text-white font-semibold "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>INSTÁVEL</span>
        </div>
        
        {/* Host Info */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className={"text-gray-400 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>HOST:</span>
            <span className={"text-white "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>192.168.1.0:8080</span>
          </div>
          <div className={"text-gray-400 text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>uptime: 1d 12h 28m</div>
          <div className={"text-gray-400 text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>Último atualização: 10 min ago</div>
          <div className={"text-gray-400 text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>Latência Máxima registrada: 12 ms</div>
        </div>
        
        {/* Taxa de Erro */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className={"text-gray-400 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>Taxa de Erro</span>
            <span className={"text-white "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>2%</span>
          </div>
          <div className={"text-gray-400 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>Aceitável:</div>
        </div>
        
        {/* Disponibilidade */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className={"text-gray-400 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>DISPONIBILIDADE:</span>
          </div>
          <div className={"text-gray-400 text-sm mb-4 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>Últimas 24h</div>
          
          {/* Gráfico de Pizza */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#374151" strokeWidth="2"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="74.5, 100"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="25.5, 100" strokeDashoffset="-74.5"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={"text-white text-lg font-bold "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>74,5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomDiv>
  );
}
