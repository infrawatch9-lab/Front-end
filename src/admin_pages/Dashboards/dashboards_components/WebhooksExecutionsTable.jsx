import React, { useState } from "react";
import ExecutionRow from "./WebhooksExecutionRow";

const ExecutionsTable = () => {
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const mockExecutions = [
    {
      dateTime: '2025-04-12 10:16:01',
      httpCode: 200,
      attempts: 1,
      latency: 320,
      status: 'SUCESSO'
    },
    {
      dateTime: '2025-04-12 14:16:01',
      httpCode: 200,
      attempts: 2,
      latency: 120,
      status: 'SUCESSO'
    },
    {
      dateTime: '2025-04-12 14:16:01',
      httpCode: 200,
      attempts: 2,
      latency: 40,
      status: 'SUCESSO'
    },
    {
      dateTime: '2025-02-10 21:18:00',
      httpCode: 500,
      attempts: 10,
      latency: 1500,
      status: 'ERRO INTERNO DO SERVIDOR'
    }
  ];

  return (
    <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-white text-xl font-semibold">HISTÓRICO DE EXECUÇÕES</h2>
        
        <div className="flex gap-4">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">TIPO</option>
            <option value="webhook">Webhook</option>
            <option value="api">API</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">STATUS</option>
            <option value="sucesso">Sucesso</option>
            <option value="erro">Erro</option>
          </select>
          
          <button className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 hover:bg-gray-600 transition-colors">
            EXPORTAR CSV
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-[#081028]">
          <tr>
            <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">DATA E HORA</th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">HTTP CODE</th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">TENTATIVAS</th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">LATÊNCIA (ms)</th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">DESCRIÇÃO</th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase">AÇÕES</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {mockExecutions.map((execution, index) => (
            <ExecutionRow key={index} execution={execution} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExecutionsTable;
