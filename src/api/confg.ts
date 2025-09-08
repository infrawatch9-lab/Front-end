import axios from "axios";

// Configuração flexível da API
const getApiUrl = () => {
  // Prioridade: ENV > localStorage > fallback para localhost
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  const localUrl = localStorage.getItem('api_url');
  const fallbackUrl = "http://localhost:3000/api"; // API local como fallback
  const defaultUrl = "https://infra42luanda.duckdns.org/api";
  
  // Se houver variável de ambiente, use ela
  if (envUrl) {
    console.log('[API Config] Using environment URL:', envUrl);
    return envUrl;
  }
  
  // Se houver URL no localStorage, use ela
  if (localUrl) {
    console.log('[API Config] Using localStorage URL:', localUrl);
    return localUrl;
  }
  
  // Testar se o domínio padrão está acessível
  console.log('[API Config] Using default URL:', defaultUrl);
  return defaultUrl;
};

const url = getApiUrl();
console.log('[API Config] Final API URL:', url);

export const apiUrl = url;

export const api = axios.create({
  baseURL: url,
  timeout: 30000, // 30 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar Authorization automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com erros de conectividade e autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NAME_NOT_RESOLVED' || error.code === 'ENOTFOUND') {
      console.error('[API Config] DNS resolution failed for:', error.config?.baseURL);
      console.error('[API Config] Consider using setApiUrl() to change the API endpoint');
    }
    
    // Tratamento específico para erro 403 Forbidden
    if (error.response?.status === 403) {
      console.error('[API Config] 403 Forbidden - Authentication failed');
      console.error('[API Config] Token:', localStorage.getItem('token') ? 'Token exists' : 'No token found');
      console.error('[API Config] Request URL:', error.config?.url);
      console.error('[API Config] Headers:', error.config?.headers);
      
      // Se o token expirou ou é inválido, limpar localStorage
      if (error.response?.data?.message?.includes('token') || error.response?.data?.message?.includes('expired')) {
        console.warn('[API Config] Token expired or invalid, clearing localStorage');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Redirecionar para login se necessário
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Alterar a URL da API em runtime
 */
export const setApiUrl = (newUrl: string) => {
  console.log('[API Config] Changing API URL to:', newUrl);
  localStorage.setItem('api_url', newUrl);
  api.defaults.baseURL = newUrl;
  return newUrl;
};

/**
 * Obter a URL atual da API
 */
export const getCurrentApiUrl = () => {
  return api.defaults.baseURL;
};

/**
 * Testar conectividade com uma URL
 */
export const testApiConnectivity = async (testUrl?: string) => {
  const urlToTest = testUrl || api.defaults.baseURL;
  try {
    console.log('[API Config] Testing connectivity to:', urlToTest);
    const testApi = axios.create({
      baseURL: urlToTest,
      timeout: 5000
    });
    
    const response = await testApi.get('/health');
    console.log('[API Config] Connectivity test successful:', response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('[API Config] Connectivity test failed:', error.message);
    return { 
      success: false, 
      error: error.message,
      code: error.code
    };
  }
};

/**
 * Configurações predefinidas de URLs
 */
export const API_PRESETS = {
  production: "https://infra42luanda.duckdns.org/api",
  local: "http://localhost:3000/api",
  development: "http://localhost:8000/api"
};

/**
 * Aplicar preset de API
 */
export const useApiPreset = (preset: keyof typeof API_PRESETS) => {
  const url = API_PRESETS[preset];
  console.log(`[API Config] Applying ${preset} preset:`, url);
  return setApiUrl(url);
};

/**
 * Debug de autenticação - verificar se o token está válido
 */
export const debugAuthentication = async () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  console.log('[Auth Debug] Current token:', token ? 'Token exists' : 'No token');
  console.log('[Auth Debug] Current role:', role);
  console.log('[Auth Debug] API URL:', getCurrentApiUrl());
  
  if (!token) {
    return { 
      valid: false, 
      error: 'No token found in localStorage',
      recommendation: 'User needs to login'
    };
  }
  
  try {
    // Testar se o token é válido fazendo uma requisição simples
    const response = await api.get('/users/profile');
    console.log('[Auth Debug] Token validation successful:', response.data);
    return { 
      valid: true, 
      data: response.data,
      token: token
    };
  } catch (error: any) {
    console.error('[Auth Debug] Token validation failed:', error.response?.data || error.message);
    
    if (error.response?.status === 403) {
      return {
        valid: false,
        error: 'Token is invalid or expired',
        recommendation: 'User needs to login again',
        details: error.response?.data
      };
    }
    
    return {
      valid: false,
      error: 'Network or server error',
      recommendation: 'Check API connectivity',
      details: error.message
    };
  }
};

/**
 * Forçar logout e limpeza de dados
 */
export const forceLogout = () => {
  console.log('[Auth Debug] Forcing logout and clearing localStorage');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('api_url'); // Opcional: manter configuração da API
  
  // Remover header de Authorization
  delete api.defaults.headers.common['Authorization'];
  
  return true;
};
