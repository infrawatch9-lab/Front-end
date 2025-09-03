import React from 'react';
import { useUserPermissions } from '../hooks/useUserPermissions';

const UserInfo = ({ isOpen }) => {
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
