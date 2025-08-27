import { useState, useEffect } from 'react';
import { apiGetUserProfile } from '../api/users/getUserProfile';

// Função para obter permissões baseadas no role
const getPermissionsByRole = (role) => {
  const defaultPermissions = {
    ADMIN: {
      dashboard: true,
      monitoring: true,
      reports: true,
      settings: true,
      users: true,
      history: true,
    },
    USER: {
      dashboard: true,
      monitoring: true,
      reports: true,
      settings: false,
      users: false,
      history: true,
    },
    VIEWER: {
      dashboard: true,
      monitoring: false,
      reports: false,
      settings: false,
      users: false,
      history: false,
    },
  };
  return defaultPermissions[role] || defaultPermissions.VIEWER;
};

export const useUserPermissions = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const profile = await apiGetUserProfile();
      setUserProfile(profile);
      
      // Obter permissões baseadas no role do usuário
      const userPermissions = getPermissionsByRole(profile.role);
      setPermissions(userPermissions);
      
    } catch (err) {
      console.error('Erro ao buscar perfil do usuário:', err);
      setError(err.message);
      
      // Em caso de erro, usar permissões mínimas (VIEWER)
      const fallbackPermissions = getPermissionsByRole('VIEWER');
      setPermissions(fallbackPermissions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Função para verificar se o usuário tem uma permissão específica
  const hasPermission = (permission) => {
    if (!permissions) return false;
    return permissions[permission] === true;
  };

  // Função para verificar se o usuário tem pelo menos uma das permissões
  const hasAnyPermission = (permissionList) => {
    if (!permissions) return false;
    return permissionList.some(permission => permissions[permission] === true);
  };

  // Função para verificar se o usuário tem todas as permissões
  const hasAllPermissions = (permissionList) => {
    if (!permissions) return false;
    return permissionList.every(permission => permissions[permission] === true);
  };

  return {
    userProfile,
    permissions,
    loading,
    error,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    refetch: fetchUserProfile,
  };
};
