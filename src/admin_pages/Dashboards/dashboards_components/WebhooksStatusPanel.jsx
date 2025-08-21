import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const StatusPanel = ({ total, running, success, failed }) => {
  return (
    <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6">
      <div className="mb-4">
        <span className="text-gray-400 text-sm">status</span>
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-white text-xl font-semibold">ERRO</span>
      </div>
      
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">uptime:</span>
          <span className="text-white">16d 12h 28m</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Última atualização:</span>
          <span className="text-white">10 min ago</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Tentativas:</span>
          <span className="text-white">8</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">HTTP RESPONSE:</span>
          <span className="text-white">500</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">HOST:</span>
          <span className="text-white">192.168.1.0</span>
        </div>
        
        <div className="mt-6">
          <span className="text-gray-400 text-sm">DISPONIBILIDADE:</span>
          
          <div className="flex justify-center mt-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="74.5, 100"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeDasharray="25.5, 100"
                  strokeDashoffset="-74.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-bold">74,5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
