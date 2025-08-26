import React, { useState } from "react";

export default function UserDetailsModal({
  user,
  onClose,
  onSave,
  onDelete,
  readOnly = false,
}) {
  const [activeTab, setActiveTab] = useState("info");
  const [editedUser, setEditedUser] = useState({ ...user });

  const tabs = [
    { id: "info", label: "INFORMAÇÕES GERAIS" },
    { id: "permissions", label: "PERMISSÕES" },
    { id: "history", label: "HISTÓRICO DE ATIVIDADES" },
  ];

  const handleSave = () => {
    if (!readOnly) onSave(editedUser);
  };

  const handleDelete = () => {
    if (readOnly) return;
    if (onDelete) onDelete(editedUser);
  };

  const handleResetPassword = () => {
    if (readOnly) return;
    if (
      window.confirm("Tem certeza que deseja resetar a senha deste usuário?")
    ) {
      console.log("Resetar senha para:", user.email);
      // Implementar lógica de reset de senha
    }
  };

  const handlePermissionChange = (permission) => {
    if (readOnly) return;
    setEditedUser({
      ...editedUser,
      permissions: {
        ...editedUser.permissions,
        [permission]: !editedUser.permissions[permission],
      },
    });
  };

  const renderInfoTab = () => (
    <div className="space-y-6">
      <h3 className="text-white font-medium text-lg">
        1. Informações de usuário
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            value={editedUser.name}
            onChange={
              readOnly
                ? undefined
                : (e) => setEditedUser({ ...editedUser, name: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            readOnly={readOnly}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={editedUser.email}
            onChange={
              readOnly
                ? undefined
                : (e) => setEditedUser({ ...editedUser, email: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            readOnly={readOnly}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Papel
          </label>
          <select
            value={editedUser.role}
            onChange={
              readOnly
                ? undefined
                : (e) => setEditedUser({ ...editedUser, role: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={readOnly}
          >
            <option value="Admin" className="bg-slate-900">
              ADMINISTRADOR
            </option>
            <option value="User" className="bg-slate-900">
              USUÁRIO
            </option>
            <option value="Viewer" className="bg-slate-900">
              VISUALIZADOR
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            STATUS
          </label>
          <select
            value={editedUser.status}
            onChange={
              readOnly
                ? undefined
                : (e) =>
                    setEditedUser({ ...editedUser, status: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={readOnly}
          >
            <option value="ativo" className="bg-slate-900">
              ATIVO
            </option>
            <option value="inativo" className="bg-slate-900">
              INATIVO
            </option>
          </select>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {!readOnly && (
          <>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              DELETAR CONTA
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleResetPassword}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                RESETAR SENHA
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                SALVAR
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <h3 className="text-white font-medium text-lg">
        2. Permissões de usuário
      </h3>
      <div className="bg-slate-900 border border-slate-600 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800">
              <th className="text-left p-4 text-slate-300 font-medium">
                Descrição
              </th>
              <th className="text-center p-4 text-slate-300 font-medium">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-700">
              <td className="p-4 text-slate-300">Visualizar a Dashboard</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={editedUser.permissions?.dashboard || false}
                  onChange={
                    readOnly
                      ? undefined
                      : () => handlePermissionChange("dashboard")
                  }
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={readOnly}
                />
              </td>
            </tr>
            <tr className="border-t border-slate-700">
              <td className="p-4 text-slate-300">Editar perfil</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={editedUser.permissions?.monitoring || false}
                  onChange={
                    readOnly
                      ? undefined
                      : () => handlePermissionChange("monitoring")
                  }
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={readOnly}
                />
              </td>
            </tr>
            <tr className="border-t border-slate-700">
              <td className="p-4 text-slate-300">Visualizar Logs</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={editedUser.permissions?.reports || false}
                  onChange={
                    readOnly
                      ? undefined
                      : () => handlePermissionChange("reports")
                  }
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={readOnly}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          DELETAR CONTA
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          SALVAR
        </button>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-4">
        <h3 className="text-white font-medium text-lg mb-4">Logs do Sistema</h3>
        {/* Filtro de logs */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filtrar logs ex: DB, ERROR,"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200">
            Atualizar
          </button>
        </div>

        {/* Cabeçalho da tabela */}
        <div className="bg-slate-800 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-4 p-3 text-sm font-medium text-slate-300">
            <div>Data e Hora</div>
            <div>Nível</div>
            <div>Mensagem</div>
          </div>
        </div>

        {/* Lista de logs */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {user.activityLogs && user.activityLogs.length > 0 ? (
            user.activityLogs.map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-3 bg-slate-800 rounded-lg text-sm"
              >
                <div className="text-slate-300">{log.date}</div>
                <div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      log.level === "ERROR"
                        ? "bg-red-600 text-white"
                        : log.level === "WARN"
                        ? "bg-yellow-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {log.level}
                  </span>
                </div>
                <div className="text-slate-300">{log.message}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              Nenhum log encontrado para este usuário
            </div>
          )}
        </div>

        {/* Paginação dos logs */}
        {user.activityLogs && user.activityLogs.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-700">
            <button className="p-2 text-slate-400 hover:text-slate-300 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="text-sm text-slate-400">Página 1 de 6</span>
            <button className="p-2 text-slate-400 hover:text-slate-300 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return renderInfoTab();
      case "permissions":
        return renderPermissionsTab();
      case "history":
        return renderHistoryTab();
      default:
        return renderInfoTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">DETALHES DE USUÁRIO</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "text-blue-500 border-blue-500"
                  : "text-slate-400 border-transparent hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
