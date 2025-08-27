import React, { useState, useEffect } from "react";
import SearchAndFilters from "./users_components/SearchAndFilters";
import UserActionsButtons from "./users_components/UserActionsButtons";
import Pagination from "./users_components/Pagination";
import CreateUserModal from "./users_components/CreateUserModal";
import UserDetailsModal from "./users_components/UserDetailsModal";
import { apiGetUsers } from "../api/users/getUsers";
import { apiRegister } from "../api/users/register";
import { apiUpdateUser } from "../api/users/updateUser";
import { apiDeleteUser } from "../api/users/deleteUser";

export default function UsersAdmin() {
  // Estados principais
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  // Modal de confirmação de delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Buscar usuários da API
  useEffect(() => {
    setLoading(true);
    apiGetUsers()
      .then((data) => {
        setUsers(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar usuários");
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  // Adaptar para aceitar 'number' como telefone
  const usersWithPhone = users.map((u) => ({
    ...u,
    phone: u.number || u.phone || "",
  }));
  // Filtragem dos usuários
  const filteredUsers = usersWithPhone.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toString().includes(searchTerm);
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    return matchesSearch && matchesRole && matchesStatus;
  });
  // Paginação
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Handlers
  // Novo estado para controlar modo de edição/visualização
  const [detailsReadOnly, setDetailsReadOnly] = useState(true);
  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setDetailsReadOnly(true);
    setShowDetailsModal(true);
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setDetailsReadOnly(false);
    setShowDetailsModal(true);
  };
  // Handler para abrir modal de criação
  const handleCreateUser = () => {
    setShowCreateModal(true);
  };
  // Handler para abrir modal de confirmação
  const handleDeleteUser = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  // Handler para confirmar exclusão
  const confirmDeleteUser = async () => {
    if (!userIdToDelete) return;
    try {
      await apiDeleteUser(userIdToDelete);
      setMessage({ type: "success", text: "Usuário deletado com sucesso!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      setTimeout(() => setRefresh((r) => !r), 100);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao deletar usuário",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    } finally {
      setShowDeleteModal(false);
      setUserIdToDelete(null);
    }
  };
  const handleCreateUserSubmit = async (data) => {
    // Enviar apenas campos aceitos pela API, status sempre em maiúsculo
    const payload = {
      name: data.name,
      email: data.email,
      number: data.number,
      role: data.role,
      tag: data.tag,
      status: data.status
        ? data.status.toUpperCase() === "INACTIVE"
          ? "INACTIVE"
          : "ACTIVE"
        : "ACTIVE",
    };
    try {
      await apiRegister(payload);
      setShowCreateModal(false);
      setMessage({ type: "success", text: "Usuário criado com sucesso!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      setTimeout(() => setRefresh((r) => !r), 100); // recarrega após feedback
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao criar usuário",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };
  const handleUpdateUserSubmit = async (data) => {
    // Enviar apenas campos aceitos pela API, status sempre em maiúsculo
    const payload = {
      id: data.id,
      name: data.name,
      email: data.email,
      number: data.number,
      role: data.role,
      status: data.status,
    };
    try {
      await apiUpdateUser(payload);
      setShowDetailsModal(false);
      setMessage({ type: "success", text: "Usuário atualizado com sucesso!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      setTimeout(() => setRefresh((r) => !r), 100); // recarrega após feedback
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao atualizar usuário",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };

  // Handlers

  return (
    <div className="p-6 min-h-screen bg-[#081028]">
      <h1 className="text-2xl font-bold text-white mb-4">Usuários</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setRefresh((r) => !r)}
            disabled={loading}
            className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Recarregar usuários"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {loading ? "Carregando..." : "Recarregar"}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-all duration-200 whitespace-nowrap"
            onClick={handleCreateUser}
          >
            CRIAR USUÁRIO
          </button>
        </div>
      </div>
      {/* Mensagem de feedback */}
      {message.text && (
        <div
          className={`p-4 rounded-lg border mb-4 ${
            message.type === "success"
              ? "bg-green-900 border-green-600 text-green-200"
              : "bg-red-900 border-red-600 text-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}
      <div className="mb-4 overflow-x-auto w-full relative z-0 rounded border border-slate-700">
        <table className="w-full bg-[#0B1440] rounded-none overflow-hidden table-fixed shadow-lg relative z-0">
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead style={{ position: "sticky", top: 0, zIndex: 60 }}>
            <tr className="text-slate-400 text-xs uppercase bg-[#16205A] border-b border-blue-900">
              <th className="py-2 px-4 text-left">Nome</th>
              <th className="py-2 px-4 text-left">E-mail</th>
              <th className="py-2 px-4 text-left">Telefone</th>
              <th className="py-2 px-4 text-left">Papel</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left min-w-[120px]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-10">
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-10 w-10 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center text-red-400 py-6">
                  {error}
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-slate-300 py-6">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-700 hover:bg-[#18204d] transition-all"
                >
                  <td className="py-2 px-4 text-white">{user.name}</td>
                  <td className="py-2 px-4 text-white">{user.email}</td>
                  <td className="py-2 px-4 text-white">{user.number || user.phone}</td>
                  <td className="py-2 px-4 text-white">
                    {user.role === "ADMIN"
                      ? "ADMIN"
                      : user.role === "USER"
                      ? "USER"
                      : user.role === "VIEWER"
                      ? "VIEWER"
                      : user.role}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold uppercase
                        ${
                          user.status === "ACTIVE"
                            ? "bg-green-700 text-green-200 border border-green-400"
                            : user.status === "INACTIVE"
                            ? "bg-red-700 text-red-200 border border-red-400"
                            : "bg-slate-700 text-slate-300"
                        }
                      `}
                    >
                      {user.status === "ACTIVE"
                        ? "ATIVO"
                        : user.status === "INACTIVE"
                        ? "INATIVO"
                        : user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 align-middle min-w-[120px]">
                    <div className="flex items-center justify-start gap-2">
                      <UserActionsButtons
                        user={user}
                        onView={handleShowDetails}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modais - garantir z-index alto para ficarem acima da tabela */}
      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ zIndex: 1100, position: "relative" }}>
            <CreateUserModal
              onClose={() => setShowCreateModal(false)}
              onCreate={handleCreateUserSubmit}
            />
          </div>
        </div>
      )}
      {showDetailsModal && selectedUser && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ zIndex: 1100, position: "relative" }}>
            <UserDetailsModal
              user={selectedUser}
              onClose={() => setShowDetailsModal(false)}
              onSave={handleUpdateUserSubmit}
              onDelete={(user) => {
                setShowDetailsModal(false);
                setUserIdToDelete(user.id);
                setShowDeleteModal(true);
              }}
              readOnly={detailsReadOnly}
            />
          </div>
        </div>
      )}
      {/* Modal de confirmação de delete */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-lg font-bold text-white mb-4">
              Confirmar exclusão
            </h2>
            <p className="text-slate-300 mb-6 text-center">
              Tem certeza que deseja excluir este usuário? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium"
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserIdToDelete(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
                onClick={confirmDeleteUser}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
