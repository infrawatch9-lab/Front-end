import React from 'react';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  requiredPermission, 
  requiredPermissions = [], 
  requireAll = false, 
  fallbackComponent = null 
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, loading } = useUserPermissions();
  const navigate = useNavigate();

  // Se ainda está carregando as permissões
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#081028]">
        <div className="flex items-center gap-2 text-white">
          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Verificando permissões...</span>
        </div>
      </div>
    );
  }

  // Verificar permissões
  let hasAccess = false;

  if (requiredPermission) {
    // Verificar uma permissão específica
    hasAccess = hasPermission(requiredPermission);
  } else if (requiredPermissions.length > 0) {
    // Verificar múltiplas permissões
    if (requireAll) {
      hasAccess = hasAllPermissions(requiredPermissions);
    } else {
      hasAccess = hasAnyPermission(requiredPermissions);
    }
  } else {
    // Se não especificar permissões, permite acesso
    hasAccess = true;
  }

  // Se não tem acesso
  if (!hasAccess) {
    if (fallbackComponent) {
      return fallbackComponent;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#081028]">
        <div className="bg-[#0B1440] border border-red-600 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <svg 
              className="w-16 h-16 text-red-500 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.734-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
            <h2 className="text-xl font-bold text-white mb-2">Acesso Negado</h2>
            <p className="text-slate-300 mb-6">
              Você não tem permissão para acessar esta página.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/admin/homepage_admin')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                Ir para Dashboard
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se tem acesso, renderizar o conteúdo
  return children;
};

export default ProtectedRoute;
