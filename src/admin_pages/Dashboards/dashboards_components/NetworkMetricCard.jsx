import React from 'react';
import { Clock } from 'lucide-react';
import CustomDiv from '../../../components/CustomComponents/CustomDiv';
import { useTheme } from '../../../hooks/useTheme/useTheme';

export default function MetricCard({ title, value, subtitle, icon: Icon, iconColor, accentColor }) {
  const { theme } = useTheme()
  return (
    <CustomDiv className="bg-[#0B1440] rounded-lg p-6 border border-[#3B5B75]">
      <div className="flex items-center justify-between mb-4">
        <h3 className={"text-gray-300 text-sm font-medium "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>{title}</h3>
        <div className={`p-2 rounded ${iconColor}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="mb-4">
        <span className={"text-white text-4xl font-bold "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>{value}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock className="w-4 h-4" />
        <span className={( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>2s ago</span>
        <div className="flex items-center gap-1 ml-auto">
          <div className={`w-2 h-2 rounded-full ${accentColor}`}></div>
          <span className={( theme == 'dark' ? " text-colors-light " : " text-colors-dark " )}>{subtitle}</span>
        </div>
      </div>
    </CustomDiv>
  );
}
