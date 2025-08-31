import React, { useState } from "react";
import SearchAndFilters from "./users_components/SearchAndFilters";
import UserActionsButtons from "./users_components/UserActionsButtons";
import Pagination from "./users_components/Pagination";
import CreateUserModal from "./users_components/CreateUserModal";
import UserDetailsModal from "./users_components/UserDetailsModal";
import { useTheme } from '../hooks/useTheme/useTheme';
import CustomDiv from '../components/CustomComponents/CustomDiv';

export default function UsersAdmin() {
  // Estados para controlar a abertura dos modais
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { theme, toggleTheme } = useTheme()

  // Exemplo de função para abrir modal de detalhes
  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  return (
    <CustomDiv type="background" className="p-6 min-h-screen bg-[#081028]">
      <h1 className={"text-2xl font-bold text-white mb-4 " + (theme == 'dark' ? " items-colors-light " : " items-colors-dark ")}>Users</h1>
      <div className="mb-4">
        <SearchAndFilters />
      </div>
      {/* Aqui você pode renderizar a lista/tabela de usuários */}
      <div className="mb-4">
        {/* Exemplo: <UsersTable onShowDetails={handleShowDetails} /> */}
        <p className={"text-white "  + (theme == 'dark' ? " items-colors-light " : " items-colors-dark ")}>Conteúdo da lista de usuários aqui...</p>
      </div>
      <Pagination />

    </CustomDiv>
  );
}

{/* Modais 
<CreateUserModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
        <div className="mb-4 flex justify-between items-center">
        <UserActionsButtons onCreate={() => setShowCreateModal(true)} />
      </div>

      <UserDetailsModal open={showDetailsModal} user={selectedUser} onClose={() => setShowDetailsModal(false)} />

  */}