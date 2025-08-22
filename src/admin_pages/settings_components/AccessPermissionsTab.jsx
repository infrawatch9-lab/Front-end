import React, { useState, useEffect, useRef } from "react";
import { apiRegister } from "../../api/users/register";
import { apiGetUsers } from "../../api/users/getUsers";
import { apiUpdateUser } from "../../api/users/updateUser";
import { apiDeleteUser } from "../../api/users/deleteUser";

export default function AccessPermissionsTab() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "USER" });
  const [showAddUser, setShowAddUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fetchingRef = useRef(false);

  const roles = [
    { value: "ADMIN", label: "Administrador", color: "bg-red-600" },
    { value: "USER", label: "Usuário", color: "bg-blue-600" }
  ];

  const permissions = [
    { key: "dashboard", label: "Dashboard" },
    { key: "monitoring", label: "Monitoramento" },
    { key: "reports", label: "Relatórios" },
    { key: "settings", label: "Configurações" },
    { key: "users", label: "Usuários" }
  ];

  // Função para obter permissões baseadas no role
  const getPermissionsByRole = (role) => {
    const defaultPermissions = {
      ADMIN: { dashboard: true, monitoring: true, reports: true, settings: true, users: true },
      USER: { dashboard: true, monitoring: true, reports: true, settings: false, users: false }
    };
    return defaultPermissions[role] || defaultPermissions.USER;
  };

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    // Evita chamadas duplicadas usando useRef
    if (fetchingRef.current) {
      return;
    }
    
    try {
      fetchingRef.current = true;
      setLoadingUsers(true);
      const usersData = await apiGetUsers();
      
      // Verifica se usersData é um array
      if (!Array.isArray(usersData)) {
        setUsers([]);
        return;
      }
      // Mapeia os dados da API para o formato esperado pelo componente
      const formattedUsers = usersData
        .map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.status || "ACTIVE", // Usa o valor string diretamente
          permissions: getPermissionsByRole(user.role)
        }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setMessage({ 
        type: "error", 
        text: "Erro ao carregar usuários. Tente recarregar a página." 
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    } finally {
      setLoadingUsers(false);
      fetchingRef.current = false;
    }
  };

  // Carrega os usuários quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []); // Dependências vazias para executar apenas uma vez

  const updateUserRole = async (userId, newRole) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      // Chama a API para atualizar o usuário com o payload completo
      await apiUpdateUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: newRole,
        isTemporaryPassword: false,
        status: user.active
      });
      
      // Atualiza localmente com as novas permissões baseadas no role
      setUsers(users.map(user => 
        user.id === userId 
          ? {
              ...user,
              role: newRole,
              permissions: getPermissionsByRole(newRole)
            }
          : user
      ));

      setMessage({ type: "success", text: "Role do usuário atualizado com sucesso!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);

    } catch (error) {
      console.error("Erro ao atualizar role do usuário:", error);
      setMessage({ 
        type: "error", 
        text: error.message || "Erro ao atualizar role do usuário." 
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };

  const toggleUserStatus = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const newStatus = user.active === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      // Chama a API para atualizar o status do usuário com o payload completo
      await apiUpdateUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isTemporaryPassword: false,
        status: newStatus
      });
      
      // Atualiza localmente
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, active: newStatus }
          : u
      ));

      setMessage({ type: "success", text: "Status do usuário atualizado com sucesso!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);

    } catch (error) {
      console.error("Erro ao atualizar status do usuário:", error);
      setMessage({ 
        type: "error", 
        text: error.message || "Erro ao atualizar status do usuário." 
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };

  const addUser = async () => {
    if (newUser.name && newUser.email) {
      setLoading(true);
      setMessage({ type: "", text: "" });
      
      try {
        // Chama a API para registrar o usuário
        const response = await apiRegister({
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        });

        // Se a API retornar sucesso, recarrega a lista de usuários
        await fetchUsers();
        setNewUser({ name: "", email: "", role: "USER" });
        setShowAddUser(false);
        setMessage({ type: "success", text: response || "Usuário registrado com sucesso!" });
        
        // Limpa a mensagem após 3 segundos
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);

      } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        setMessage({ 
          type: "error", 
          text: error.message || "Erro ao registrar usuário. Tente novamente." 
        });
        
        // Limpa a mensagem de erro após 5 segundos
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Tem certeza que deseja remover este usuário?")) {
      return;
    }

    try {
      console.log("Tentando deletar usuário com ID:", userId); // Debug
      // Chama a API específica de delete
      await apiDeleteUser(userId);
      
      // Remove o usuário da lista local
      setUsers(users.filter(user => user.id !== userId));
      
      setMessage({ type: "success", text: "Usuário removido com sucesso!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);

    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      setMessage({ 
        type: "error", 
        text: "Não foi possível remover o usuário. Tente novamente." 
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
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
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            disabled={loadingUsers}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Recarregar usuários"
          >
            <svg className={`w-4 h-4 ${loadingUsers ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loadingUsers ? "Carregando..." : "Recarregar"}
          </button>
          <button
            onClick={() => setShowAddUser(!showAddUser)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Adicionar Usuário
          </button>
        </div>
      </div>

      {/* Mensagem de feedback */}
      {message.text && (
        <div className={`p-4 rounded-lg border ${
          message.type === "success" 
            ? "bg-green-900 border-green-600 text-green-200" 
            : "bg-red-900 border-red-600 text-red-200"
        }`}>
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}

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
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="email@empresa.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Perfil</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                loading 
                  ? "bg-gray-600 cursor-not-allowed text-gray-300" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </>
              ) : (
                "Adicionar"
              )}
            </button>
            <button
              onClick={() => setShowAddUser(false)}
              disabled={loading}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {loadingUsers ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Carregando usuários...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-400">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                users.map(user => (
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
                      <div className="flex justify-center">
                        {user.permissions[permission.key] ? (
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.active === "ACTIVE"
                          ? "bg-green-600 text-white" 
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {user.active === "ACTIVE" ? "Ativo" : "Inativo"}
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
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
