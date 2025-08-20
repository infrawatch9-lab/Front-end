import React from "react";

export default function TableHeader() {
  return (
    <thead className="bg-[#081028] border-b border-slate-700">
      <tr>
        <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">DATA</th>
        <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">USER</th>
        <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">TIPO</th>
        <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">DESCRIÇÃO</th>
        <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">AÇÕES</th>
      </tr>
    </thead>
  );
}
