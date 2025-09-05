import React from 'react';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ isOpen }) => {
  const navigate = useNavigate();
  const { userProfile, loading } = useUserPermissions();

  if (loading || !userProfile) {
    return null;
  }

  const getRoleColor = (role) => {
    const colors = {
      ADMIN: 'bg-red-600',
      USER: 'bg-blue-600',
      VIEWER: 'bg-green-600',
    };
    return colors[role] || 'bg-gray-600';
  };

  const getRoleLabel = (role) => {
    const labels = {
      ADMIN: 'Administrador',
      USER: 'Usuário',
      VIEWER: 'Visualizador',
    };
    return labels[role] || role;
  };

  return (
    <div className="border-t border-slate-700 pt-4 mb-4">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        
        {/* Info do usuário */}
        {isOpen && (
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">
              {userProfile.name}
            </div>
            <div className="flex items-center space-x-2">
              <span 
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${getRoleColor(userProfile.role)}`}
              >
                {getRoleLabel(userProfile.role)}
              </span>
      <button onClick={() => navigate('/admin/edit_profile')}
        className="p-2 text-slate-500 hover:text-yellow-400 hover:bg-slate-700 rounded transition-all duration-200"
        title="Editar usuário">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
