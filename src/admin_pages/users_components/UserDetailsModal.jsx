import React, { useState } from "react";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function UserDetailsModal({
  user,
  onClose,
  onSave,
  onDelete,
  readOnly = false,
}) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("info");

  // Função igual AccessPermissionsTab
  const getPermissionsByRole = (role) => {
    const defaultPermissions = {
      ADMIN: {
        dashboard: true,
        monitoring: true,
        reports: true,
        settings: true,
        users: true,
      },
      USER: {
        dashboard: true,
        monitoring: true,
        reports: true,
        settings: false,
        users: false,
      },
      VIEWER: {
        dashboard: true,
        monitoring: false,
        reports: false,
        settings: false,
        users: false,
      },
    };
    return defaultPermissions[role] || defaultPermissions.USER;
  };

  // Inicializa as permissões se não existirem
  const [editedUser, setEditedUser] = useState(() => {
    if (!user.permissions) {
      return { ...user, permissions: getPermissionsByRole(user.role) };
    }
    return { ...user };
  });

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
    }
  };

  const renderInfoTab = () => (
    <div className="space-y-6">
      <h3 className={`font-medium text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
        1. Informações de usuário
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
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
            disabled={readOnly}
            placeholder="Digite o nome completo"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
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
            disabled={readOnly}
            placeholder="Digite o email"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
            Telefone
          </label>
          <input
            type="tel"
            value={editedUser.number || editedUser.phone || ""}
            onChange={
              readOnly
                ? undefined
                : (e) =>
                    setEditedUser({ ...editedUser, number: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            readOnly={readOnly}
            disabled={readOnly}
            placeholder="Digite o número de telemóvel"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
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
            <option value="ADMIN" className="bg-slate-900">
              ADMINISTRADOR
            </option>
            <option value="USER" className="bg-slate-900">
              USUÁRIO
            </option>
            <option value="VIEWER" className="bg-slate-900">
              VISUALIZADOR
            </option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
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
            <option value="ACTIVE" className="bg-slate-900">
              ATIVO
            </option>
            <option value="INACTIVE" className="bg-slate-900">
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

  // Permissões possíveis (igual AccessPermissionsTab)
  const allPermissions = [
    { key: "dashboard", label: "Dashboard" },
    { key: "monitoring", label: "Monitoramento" },
    { key: "reports", label: "Relatórios" },
    { key: "settings", label: "Configurações" },
    { key: "users", label: "Usuários" },
  ];

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <h3 className={`font-medium text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
        2. Permissões de usuário
      </h3>
      <CustomDiv className="bg-slate-900 border border-slate-600 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white-700'}`}>
              <th className={`text-left p-4 font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
                Descrição
              </th>
              <th className={`text-center p-4 font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {allPermissions.map((perm) => (
              <tr className="border-t border-slate-700" key={perm.key}>
                <td className={`p-4 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>{perm.label}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center">
                    {editedUser.permissions?.[perm.key] ? (
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-red-500"
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
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CustomDiv>

      {/* Nenhum botão de ação na aba de permissões */}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-4">
        <h3 className={`font-medium text-lg mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>Logs do Sistema</h3>
        {/* Filtro de logs */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filtrar logs ex: DB, ERROR, ..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={readOnly}
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
            onClick={() => {
              /* TODO: implementar atualização dos logs se necessário */
            }}
            disabled={readOnly}
            title="Atualizar histórico"
          >
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
                d="M4 4v5h.582M20 20v-5h-.581M5.21 17.293A9 9 0 0021 12.082M18.79 6.707A9 9 0 003 11.918"
              />
            </svg>
            Atualizar
          </button>
        </div>
        <div className="divide-y divide-slate-700">
          {Array.isArray(user.activityLogs) && user.activityLogs.length > 0 ? (
            user.activityLogs.map((log, idx) => (
              <div key={idx} className="py-3">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
                    {log.action}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {log.timestamp}
                  </span>
                </div>
                {log.details && (
                  <div className="text-slate-400 text-sm mt-1">
                    {log.details}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-slate-400 text-center py-8">
              Nenhuma atividade encontrada para este usuário.
            </div>
          )}
        </div>
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
      <CustomDiv type="background" className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>DETALHES DE USUÁRIO</h2>
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
      </CustomDiv>
    </div>
  );
}
