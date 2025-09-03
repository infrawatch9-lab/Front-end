import { useState, useEffect } from "react";
import { apiGetUserProfile } from "../api/users/getUserProfile";

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
  const [userProfile, setUserProfile] = useState(() => {
    const cached = localStorage.getItem("userProfileCache");
    return cached ? JSON.parse(cached) : null;
  });
  const [permissions, setPermissions] = useState(() => {
    const cached = localStorage.getItem("userPermissionsCache");
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar perfil do usuário, com opção de forçar refresh
  const fetchUserProfile = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Tenta obter do cache, a menos que forceRefresh
      if (!forceRefresh) {
        const cachedProfile = localStorage.getItem("userProfileCache");
        const cachedPermissions = localStorage.getItem("userPermissionsCache");
        if (cachedProfile && cachedPermissions) {
          setUserProfile(JSON.parse(cachedProfile));
          setPermissions(JSON.parse(cachedPermissions));
          setLoading(false);
          return;
        }
      }

      // Busca da API
      const profile = await apiGetUserProfile();
      setUserProfile(profile);
      localStorage.setItem("userProfileCache", JSON.stringify(profile));

      // Obter permissões baseadas no role do usuário
      const userPermissions = getPermissionsByRole(profile.role);
      setPermissions(userPermissions);
      localStorage.setItem(
        "userPermissionsCache",
        JSON.stringify(userPermissions)
      );
    } catch (err) {
      console.error("Erro ao buscar perfil do usuário:", err);
      setError(err.message);

      // Em caso de erro, usar permissões mínimas (VIEWER)
      const fallbackPermissions = getPermissionsByRole("VIEWER");
      setPermissions(fallbackPermissions);
      localStorage.setItem(
        "userPermissionsCache",
        JSON.stringify(fallbackPermissions)
      );
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
    return permissionList.some(
      (permission) => permissions[permission] === true
    );
  };

  // Função para verificar se o usuário tem todas as permissões
  const hasAllPermissions = (permissionList) => {
    if (!permissions) return false;
    return permissionList.every(
      (permission) => permissions[permission] === true
    );
  };

  // Função para limpar o cache (pode ser usada após logout ou troca de usuário)
  const clearPermissionsCache = () => {
    localStorage.removeItem("userProfileCache");
    localStorage.removeItem("userPermissionsCache");
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
    clearPermissionsCache,
  };
};
