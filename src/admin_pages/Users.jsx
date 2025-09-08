import React, { useState, useEffect } from "react";
import AppLoader from "../components/AppLoader";
import SearchAndFilters from "./users_components/SearchAndFilters";
import UserActionsButtons from "./users_components/UserActionsButtons";
import Pagination from "./users_components/Pagination";
import CreateUserModal from "./users_components/CreateUserModal";
import UserDetailsModal from "./users_components/UserDetailsModal";
import { apiGetUsers } from "../api/users/getUsers";
import { apiRegister } from "../api/users/register";
import { apiUpdateUser } from "../api/users/updateUser";
import { apiDeleteUser } from "../api/users/deleteUser";
import CustomDiv from "../components/CustomComponents/CustomDiv";
import CustomTable from "../components/CustomComponents/CustomTable";
import { useTheme } from "../hooks/useTheme/useTheme";

export default function UsersAdmin() {
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
  const { theme, toggleTheme } = useTheme();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  // Modal de confirmação de delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Buscar usuários da API com cache em localStorage
  useEffect(() => {
    setLoading(true);
    const cachedUsers = localStorage.getItem("usersCache");
    if (cachedUsers && !refresh) {
      setUsers(JSON.parse(cachedUsers));
      setLoading(false);
    } else {
      apiGetUsers()
        .then((data) => {
          setUsers(data);
          localStorage.setItem("usersCache", JSON.stringify(data));
          setError("");
        })
        .catch((err) => {
          setError(err.message || "Erro ao buscar usuários");
        })
        .finally(() => setLoading(false));
    }
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
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // ...existing code...

  // Paginação
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handlers
  function handleShowDetails(user, readOnly = true) {
    setSelectedUser(user);
    setShowDetailsModal(true);
    setDetailsReadOnly(readOnly);
  }

  function handleEditUser(user) {
    setSelectedUser(user);
    setShowDetailsModal(true);
    setDetailsReadOnly(false);
  }

  function handleDeleteUser(user) {
    setUserIdToDelete(user.id);
    setShowDeleteModal(true);
  }

  async function handleCreateUserSubmit(newUser) {
    setLoading(true);
    try {
      await apiRegister(newUser);
      setShowCreateModal(false);
      setMessage({ type: "success", text: "Usuário criado com sucesso!" });
      setRefresh((r) => !r);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao criar usuário",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateUserSubmit(updatedUser) {
    setLoading(true);
    try {
      await apiUpdateUser(updatedUser);
      setShowDetailsModal(false);
      setMessage({ type: "success", text: "Usuário atualizado com sucesso!" });
      setRefresh((r) => !r);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao atualizar usuário",
      });
    } finally {
      setLoading(false);
    }
  }

  async function confirmDeleteUser() {
    if (!userIdToDelete) return;
    setLoading(true);
    try {
      await apiDeleteUser(userIdToDelete);
      setShowDeleteModal(false);
      setUserIdToDelete(null);
      setMessage({ type: "success", text: "Usuário excluído com sucesso!" });
      setRefresh((r) => !r);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao excluir usuário",
      });
    } finally {
      setLoading(false);
    }
  }

  const [detailsReadOnly, setDetailsReadOnly] = useState(true);

  return (
    <CustomDiv type="background" className="p-6 min-h-screen">
    <div className="mb-8">
      <h1 className={"text-white text-2xl font-semibold"  + (theme == 'dark' ? " items-colors-light " : " items-colors-dark ")}>Usuários</h1>
    </div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
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
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setRefresh((r) => !r)}
            disabled={loading}
            title="Recarregar usuários"
          >
            <svg
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
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
          </button>
          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setShowCreateModal(true)}
            title="Adicionar usuário"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Tabela de usuários */}
      <div className="overflow-x-auto rounded">
        <CustomTable
          head={["Nome", "E-mail", "Telefone", "Papel", "Status", "Ações"]}
          types={["text", "text", "text", "text", "status", "actions"]}
          extractkeys={["name", "email", "phone", "role", "status"]}
          extractId="id"
          data={paginatedUsers}
          onDelete={handleDeleteUser}
          onShow={handleShowDetails}
          onUpdate={handleEditUser}
        />
        {/* 
        <table className="w-full bg-[#0B1440] rounded overflow-hidden shadow-md">
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
                  <AppLoader size={15} minHeight={40} />
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
                  className="border-b border-blue-900 hover:bg-[#18204d] transition-all"
                >
                  <td className="py-2 px-4 text-white">{user.name}</td>
                  <td className="py-2 px-4 text-white">{user.email}</td>
                  <td className="py-2 px-4 text-white">
                    {user.number || user.phone}
                  </td>
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
        */}
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
          <CustomDiv type="background" className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-sm w-full flex flex-col items-center">
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
          </CustomDiv>
        </div>
      )}
    </CustomDiv>
  );
}
