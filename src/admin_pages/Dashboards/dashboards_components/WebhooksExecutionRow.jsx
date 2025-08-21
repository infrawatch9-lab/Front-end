import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, BarChart3, Eye, RotateCcw } from 'lucide-react';

const ExecutionRow = ({ execution }) => {
  const getStatusConfig = (status) => {
    if (status === 'SUCESSO') {
      return { color: 'text-green-400', bgColor: 'bg-green-500', dot: 'bg-green-500' };
    } else {
      return { color: 'text-red-400', bgColor: 'bg-red-500', dot: 'bg-red-500' };
    }
  };

  const statusConfig = getStatusConfig(execution.status);

  return (
    <tr className="border-b border-gray-700 hover:bg-[#06194D] transition-colors">
      <td className="px-4 py-4 text-white">{execution.dateTime}</td>
      <td className="px-4 py-4 text-white">{execution.httpCode}</td>
      <td className="px-4 py-4 text-white">{execution.attempts}</td>
      <td className="px-4 py-4 text-white">{execution.latency}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
          <span className={statusConfig.color}>{execution.status}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExecutionRow;
