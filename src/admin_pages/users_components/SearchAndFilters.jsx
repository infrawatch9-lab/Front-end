import React from "react";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) {
  const roles = [
    { value: "", label: "PAPEL" },
    { value: "ADMIN", label: "Administrador" },
    { value: "USER", label: "Usuário" },
    { value: "VIEWER", label: "Visualizador" },
  ];

  const statuses = [
    { value: "", label: "STATUS" },
    { value: "ACTIVE", label: "Ativo" },
    { value: "INACTIVE", label: "Inativo" },
  ];
  const { theme } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Campo de busca */}
        <div className="relative flex-1 max-w-md">
          <div className={"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"}>
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className={"w-full pl-10 pr-4 py-2 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            + (theme == "dark"
                    ? " div-dark-mode-fg "
                    : " div-light-mode-fg ")}/>
        </div>

        {/* Filtro de Papel */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={"appearance-none bg-[#081028] border border-slate-700 rounded px-4 py-2 pr-8 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer " 
             + ( theme == 'dark' ? " div-dark-mode-bg " : " div-light-mode-bg " )
            }
          >
            {roles.map((role) => (
              <option
                key={role.value}
                value={role.value}
                className="bg-[#081028]"
              >
                {role.label}
              </option>
            ))}
          </select>
          <div className={"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none "}>
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Filtro de Status */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={"appearance-none bg-[#081028] border border-slate-700 rounded px-4 py-2 pr-8 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer " +
              ( theme == 'dark' ? " div-dark-mode-bg " : " div-light-mode-bg " )
            }
          >
            {statuses.map((status) => (
              <option
                key={status.value}
                value={status.value}
                className="bg-slate-900"
              >
                {status.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* ...nenhum botão aqui, só filtros... */}
    </div>
  );
}
