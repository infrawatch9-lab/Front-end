import React, { useState } from "react";

export default function AccessPermissionsTab() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      role: "admin",
      permissions: {
        dashboard: true,
        monitoring: true,
        reports: true,
        settings: true,
        users: true
      },
      active: true
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      role: "operator",
      permissions: {
        dashboard: true,
        monitoring: true,
        reports: false,
        settings: false,
        users: false
      },
      active: true
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      role: "viewer",
      permissions: {
        dashboard: true,
        monitoring: false,
        reports: false,
        settings: false,
        users: false
      },
      active: false
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer"
  });

  const [showAddUser, setShowAddUser] = useState(false);

  const roles = [
    { value: "admin", label: "Administrador", color: "bg-red-600" },
    { value: "operator", label: "Operador", color: "bg-yellow-600" },
    { value: "viewer", label: "Visualizador", color: "bg-green-600" }
  ];

  const permissions = [
    { key: "dashboard", label: "Dashboard" },
    { key: "monitoring", label: "Monitoramento" },
    { key: "reports", label: "Relatórios" },
    { key: "settings", label: "Configurações" },
    { key: "users", label: "Usuários" }
  ];

  const updateUserPermission = (userId, permission) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              [permission]: !user.permissions[permission]
            }
          }
        : user
    ));
  };

  const updateUserRole = (userId, newRole) => {
    // Define permissões padrão baseadas no role
    const defaultPermissions = {
      admin: { dashboard: true, monitoring: true, reports: true, settings: true, users: true },
      operator: { dashboard: true, monitoring: true, reports: true, settings: false, users: false },
      viewer: { dashboard: true, monitoring: false, reports: false, settings: false, users: false }
    };

    setUsers(users.map(user => 
      user.id === userId 
        ? {
            ...user,
            role: newRole,
            permissions: defaultPermissions[newRole]
          }
        : user
    ));
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, active: !user.active }
        : user
    ));
  };

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const defaultPermissions = {
        admin: { dashboard: true, monitoring: true, reports: true, settings: true, users: true },
        operator: { dashboard: true, monitoring: true, reports: true, settings: false, users: false },
        viewer: { dashboard: true, monitoring: false, reports: false, settings: false, users: false }
      };

      const user = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...newUser,
        permissions: defaultPermissions[newUser.role],
        active: true
      };

      setUsers([...users, user]);
      setNewUser({ name: "", email: "", role: "viewer" });
      setShowAddUser(false);
    }
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getRoleColor = (role) => {
    return roles.find(r => r.value === role)?.color || "bg-gray-600";
  };

  const getRoleLabel = (role) => {
    return roles.find(r => r.value === role)?.label || role;
  };

  return (
    <div className="space-y-6">
      {/* Header com botão de adicionar */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white font-medium text-lg mb-2">CONTROLE DE ACESSO E PERMISSÕES</h3>
          <p className="text-slate-400 text-sm">Gerencie usuários e suas permissões no sistema</p>
        </div>
        <button
          onClick={() => setShowAddUser(!showAddUser)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Adicionar Usuário
        </button>
      </div>

      {/* Formulário para adicionar usuário */}
      {showAddUser && (
        <div className="bg-[#0B1440] border border-slate-700 rounded-lg p-6">
          <h4 className="text-white font-medium mb-4">Novo Usuário</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="email@empresa.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Perfil</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value} className="bg-slate-900">
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={addUser}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              Adicionar
            </button>
            <button
              onClick={() => setShowAddUser(false)}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabela de usuários */}
      <div className="bg-[#0B1440] border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#081028] border-b border-slate-700">
                <th className="text-left p-4 text-slate-300 font-medium">Usuário</th>
                <th className="text-left p-4 text-slate-300 font-medium">Perfil</th>
                <th className="text-center p-4 text-slate-300 font-medium">Dashboard</th>
                <th className="text-center p-4 text-slate-300 font-medium">Monitor</th>
                <th className="text-center p-4 text-slate-300 font-medium">Relatórios</th>
                <th className="text-center p-4 text-slate-300 font-medium">Config</th>
                <th className="text-center p-4 text-slate-300 font-medium">Usuários</th>
                <th className="text-center p-4 text-slate-300 font-medium">Status</th>
                <th className="text-center p-4 text-slate-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-750">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-slate-400 text-sm">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getRoleColor(user.role)} focus:outline-none`}
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value} className="bg-slate-900">
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  {permissions.map(permission => (
                    <td key={permission.key} className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={user.permissions[permission.key]}
                        onChange={() => updateUserPermission(user.id, permission.key)}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.active 
                          ? "bg-green-600 text-white" 
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {user.active ? "Ativo" : "Inativo"}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-400 transition-colors p-1"
                      title="Remover usuário"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salvar configurações */}
      <div className="flex justify-end">
        <button
          onClick={() => console.log("Salvando permissões:", users)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          SALVAR CONFIGURAÇÕES
        </button>
      </div>
    </div>
  );
}
