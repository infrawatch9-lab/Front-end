import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          GOOGLE DNS
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-500 transition-colors">
          Hoje
        </button>
        <button className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-500 transition-colors">
          Último 7d
        </button>
        <button className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-500 transition-colors">
          Exportar
        </button>
      </div>
    </div>
  );
}
