import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Eye, RotateCcw, ExternalLink, Copy, CheckCircle } from 'lucide-react';

const ExecutionRow = ({ execution, getSeverityColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const getStatusConfig = (status) => {
    if (status === 'SUCESSO') {
      return { color: 'text-green-400', bgColor: 'bg-green-500', dot: 'bg-green-500' };
    } else if (status === 'FALHA') {
      return { color: 'text-yellow-400', bgColor: 'bg-yellow-500', dot: 'bg-yellow-500' };
    } else {
      return { color: 'text-red-400', bgColor: 'bg-red-500', dot: 'bg-red-500' };
    }
  };

  const statusConfig = getStatusConfig(execution.status);

  const handleCopyId = () => {
    navigator.clipboard.writeText(execution.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetry = () => {
    console.log(`Reprocessando evento: ${execution.id}`);
    // Implementar lógica de reprocessamento
  };

  const handleViewDetails = () => {
    console.log(`Visualizando detalhes: ${execution.id}`);
    // Implementar modal de detalhes ou navegação
  };

  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-[#06194D] transition-colors">
        {/* ID do Evento */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono text-sm">{execution.id}</span>
              <button
                onClick={handleCopyId}
                className="text-gray-400 hover:text-white transition-colors"
                title="Copiar ID"
              >
                {copied ? (
                  <CheckCircle className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </td>

        {/* Timestamp */}
        <td className="px-4 py-4 text-white text-sm">{execution.dateTime}</td>

        {/* Origem */}
        <td className="px-4 py-4">
          <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-sm">
            {execution.origin}
          </span>
        </td>

        {/* Tipo */}
        <td className="px-4 py-4">
          <span className="text-gray-300 text-sm">{execution.type}</span>
        </td>

        {/* Status */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
            <span className={`${statusConfig.color} text-sm`}>{execution.status}</span>
          </div>
        </td>

        {/* Severidade */}
        <td className="px-4 py-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(execution.severity)}`}>
            {execution.severity}
          </span>
        </td>

        {/* Latência */}
        <td className="px-4 py-4">
          <div className="text-white text-sm">
            {execution.latency}ms
            <div className="text-gray-500 text-xs">
              {execution.attempts} tentativa{execution.attempts > 1 ? 's' : ''}
            </div>
          </div>
        </td>

        {/* Ações */}
        <td className="px-4 py-4">
          <div className="flex gap-2">
            <button
              onClick={handleViewDetails}
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="Ver detalhes"
            >
              <Eye className="w-4 h-4" />
            </button>
            {execution.status !== 'SUCESSO' && (
              <button
                onClick={handleRetry}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                title="Reprocessar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              className="text-gray-400 hover:text-green-400 transition-colors"
              title="Abrir em nova aba"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Linha expandida com detalhes */}
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#081028] border-b border-gray-700"
          >
            <td colSpan="8" className="px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {/* Detalhes do Dispositivo */}
                <div className="bg-[#0B1440] rounded p-3">
                  <h4 className="text-white font-medium mb-2">Dispositivo</h4>
                  <div className="space-y-1 text-gray-300">
                    <div><span className="text-gray-500">ID:</span> {execution.deviceId}</div>
                    <div><span className="text-gray-500">Status:</span> {execution.details?.statusDetail}</div>
                    <div><span className="text-gray-500">Tempo de Resposta:</span> {execution.details?.responseTime}</div>
                  </div>
                </div>

                {/* Detalhes da Requisição */}
                <div className="bg-[#0B1440] rounded p-3">
                  <h4 className="text-white font-medium mb-2">Requisição</h4>
                  <div className="space-y-1 text-gray-300">
                    <div><span className="text-gray-500">HTTP Code:</span> {execution.httpCode}</div>
                    <div><span className="text-gray-500">Tentativas:</span> {execution.attempts}</div>
                    <div><span className="text-gray-500">Latência:</span> {execution.latency}ms</div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="bg-[#0B1440] rounded p-3">
                  <h4 className="text-white font-medium mb-2">Descrição</h4>
                  <div className="text-gray-300">
                    {execution.description}
                  </div>
                  {execution.severity === 'Alta' && (
                    <div className="mt-2 text-red-400 text-xs">
                      ⚠️ Evento de alta prioridade
                    </div>
                  )}
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExecutionRow;
