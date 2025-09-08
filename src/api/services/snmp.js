import axios from 'axios';

// Configuração da API SNMP
const SNMP_API_BASE_URL = 'http://infra42luanda.duckdns.org:3003';

// Criar instância do axios para API SNMP
const snmpApi = axios.create({
  baseURL: SNMP_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs de desenvolvimento
snmpApi.interceptors.request.use((config) => {
  console.log(`[SNMP API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
  return config;
});

snmpApi.interceptors.response.use(
  (response) => {
    console.log(`[SNMP API] Response:`, response.data);
    return response;
  },
  (error) => {
    console.error(`[SNMP API] Error:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Mapear configuração do frontend para formato da API SNMP
 */
const mapServiceConfigToSnmpHost = (serviceData) => {
  const { name, description, snmpConfig } = serviceData;
  
  // Garantir que temos os dados necessários
  if (!snmpConfig || !snmpConfig.host || !snmpConfig.version || !snmpConfig.oid) {
    throw new Error('Configuração SNMP incompleta. Host, versão e OID são obrigatórios.');
  }
  
  // Formato esperado pelo backend: {"name": "Router Teste", "host": "10.0.1.1", "oid": "1.3.6.1.2.1.1.3.0", "version": "v2c", "community": "public"}
  const hostData = {
    name: name,
    host: snmpConfig.host,
    oid: snmpConfig.oid,
    version: snmpConfig.version, // Manter versão original (não uppercase)
  };

  // Adicionar porta se diferente do padrão
  if (snmpConfig.port && snmpConfig.port !== 161) {
    hostData.port = parseInt(snmpConfig.port);
  }

  // Adicionar configurações específicas por versão
  if (snmpConfig.version === 'v1' || snmpConfig.version === 'v2c') {
    hostData.community = snmpConfig.community || 'public';
  } else if (snmpConfig.version === 'v3') {
    // Para v3, incluir configurações de autenticação
    if (snmpConfig.username) {
      hostData.username = snmpConfig.username;
    }
    if (snmpConfig.authProtocol) {
      hostData.auth_protocol = snmpConfig.authProtocol;
    }
    if (snmpConfig.authPassword) {
      hostData.auth_password = snmpConfig.authPassword;
    }
    if (snmpConfig.privProtocol) {
      hostData.priv_protocol = snmpConfig.privProtocol;
    }
    if (snmpConfig.privPassword) {
      hostData.priv_password = snmpConfig.privPassword;
    }
  }

  // Adicionar configurações opcionais de monitoramento (não obrigatórias para o backend básico)
  if (snmpConfig.interval) {
    hostData.monitoring_interval = parseInt(snmpConfig.interval);
  }
  
  if (snmpConfig.timeout) {
    hostData.timeout = parseInt(snmpConfig.timeout);
  }

  console.log('[SNMP] Original snmpConfig:', snmpConfig);
  console.log('[SNMP] Mapped hostData (formato backend):', hostData);
  
  return hostData;
};

/**
 * Criar host SNMP via API dedicada
 */
export const createSnmpHost = async (serviceData) => {
  try {
    console.log('[SNMP] Creating host with service data:', serviceData);
    
    // Verificar conectividade primeiro
    console.log('[SNMP] Testing API connectivity...');
    const connectivityTest = await testSnmpApiConnectivity();
    if (!connectivityTest.success) {
      throw new Error(`API SNMP não está acessível: ${connectivityTest.error}`);
    }
    
    // Testar formato do body antes de enviar
    console.log('[SNMP] Testing body format...');
    const formatTest = testServiceBodyFormat(serviceData);
    if (!formatTest.success) {
      throw new Error(`Formato de dados inválido: ${formatTest.error}`);
    }
    
    const hostData = formatTest.mappedData;
    console.log('[SNMP] Body que será enviado para o backend:', JSON.stringify(hostData, null, 2));
    console.log('[SNMP] Body em linha única:', JSON.stringify(hostData));
    
    console.log('[SNMP] Sending POST request to /hosts...');
    const response = await snmpApi.post('/hosts', hostData);
    console.log('[SNMP] API Response:', response.data);
    
    return {
      success: true,
      data: response.data,
      snmpHostId: response.data.host_id || response.data.id,
      zabbixHostId: response.data.zabbix_host_id,
      message: response.data.message
    };
  } catch (error) {
    console.error('[SNMP] Error creating host:', error);
    console.error('[SNMP] Error response:', error.response);
    console.error('[SNMP] Error status:', error.response?.status);
    console.error('[SNMP] Error data:', error.response?.data);
    
    // Melhor tratamento de erros
    let errorMessage = 'Erro ao criar host SNMP';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 404:
          errorMessage = 'Endpoint não encontrado. Verifique se a API SNMP está rodando corretamente.';
          break;
        case 400:
          errorMessage = `Dados inválidos: ${data?.detail || data?.message || 'Verifique os campos obrigatórios'}`;
          console.error('[SNMP] Body enviado:', JSON.stringify(error.config?.data));
          break;
        case 500:
          errorMessage = `Erro interno da API: ${data?.detail || data?.message || 'Problema no servidor SNMP'}`;
          break;
        default:
          errorMessage = data?.detail || data?.message || `Erro HTTP ${status}`;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Atualizar host SNMP via API dedicada
 */
export const updateSnmpHost = async (snmpHostId, serviceData) => {
  try {
    console.log('[SNMP] Updating host ID:', snmpHostId, 'with data:', serviceData);
    
    const hostData = mapServiceConfigToSnmpHost(serviceData);
    
    // Remover campos que não devem ser atualizados na atualização
    delete hostData.service_id;
    
    console.log('[SNMP] Update payload:', hostData);
    
    const response = await snmpApi.put(`/hosts/${snmpHostId}`, hostData);
    
    return {
      success: true,
      data: response.data,
      message: response.data.message
    };
  } catch (error) {
    console.error('[SNMP] Error updating host:', error);
    
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        error.message || 
                        'Erro ao atualizar host SNMP';
    
    throw new Error(errorMessage);
  }
};

/**
 * Deletar host SNMP via API dedicada
 */
export const deleteSnmpHost = async (snmpHostId) => {
  try {
    console.log('[SNMP] Deleting host ID:', snmpHostId);
    
    const response = await snmpApi.delete(`/hosts/${snmpHostId}`);
    
    return {
      success: true,
      data: response.data,
      message: response.data.message
    };
  } catch (error) {
    console.error('[SNMP] Error deleting host:', error);
    
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        error.message || 
                        'Erro ao deletar host SNMP';
    
    throw new Error(errorMessage);
  }
};

/**
 * Buscar hosts SNMP
 */
export const getSnmpHosts = async () => {
  try {
    const response = await snmpApi.get('/hosts');
    return {
      success: true,
      data: response.data.hosts || response.data
    };
  } catch (error) {
    console.error('[SNMP] Error fetching hosts:', error);
    throw new Error('Erro ao buscar hosts SNMP');
  }
};

/**
 * Verificar status da API SNMP
 */
export const checkSnmpApiHealth = async () => {
  try {
    console.log('[SNMP] Checking API health at:', SNMP_API_BASE_URL);
    const response = await snmpApi.get('/health');
    console.log('[SNMP] Health check response:', response.data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('[SNMP] API health check failed:', error);
    console.error('[SNMP] Health check error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return {
      success: false,
      error: error.message,
      details: error.response?.data
    };
  }
};

/**
 * Testar conectividade completa da API SNMP
 */
export const testSnmpApiConnectivity = async () => {
  try {
    console.log('[SNMP] Testing full API connectivity...');
    
    // Teste 1: Health check
    const healthResponse = await snmpApi.get('/health');
    console.log('[SNMP] Health check OK:', healthResponse.data);
    
    // Teste 2: Status completo
    const statusResponse = await snmpApi.get('/status');
    console.log('[SNMP] Status check OK:', statusResponse.data);
    
    // Teste 3: Lista de hosts (deve retornar array vazio se não houver hosts)
    try {
      const hostsResponse = await snmpApi.get('/hosts');
      console.log('[SNMP] Hosts endpoint OK:', hostsResponse.data);
    } catch (hostsError) {
      console.log('[SNMP] Hosts endpoint may not exist yet, skipping...');
    }
    
    return {
      success: true,
      message: 'API SNMP totalmente funcional'
    };
  } catch (error) {
    console.error('[SNMP] Connectivity test failed:', error);
    return {
      success: false,
      error: error.message,
      details: error.response?.data
    };
  }
};

/**
 * Obter status completo dos serviços SNMP
 */
export const getSnmpStatus = async () => {
  try {
    const response = await snmpApi.get('/status');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('[SNMP] Error getting status:', error);
    throw new Error('Erro ao obter status SNMP');
  }
};

/**
 * Reiniciar monitoramento SNMP
 */
export const restartSnmpMonitoring = async () => {
  try {
    const response = await snmpApi.post('/monitoring/restart');
    return {
      success: true,
      data: response.data,
      message: response.data.message
    };
  } catch (error) {
    console.error('[SNMP] Error restarting monitoring:', error);
    throw new Error('Erro ao reiniciar monitoramento SNMP');
  }
};

/**
 * Função de debug para testar a API SNMP
 * Use no console: import { debugSnmpApi } from './snmp'; debugSnmpApi();
 */
export const debugSnmpApi = async () => {
  console.log('🔍 [SNMP DEBUG] Iniciando testes da API SNMP...');
  
  try {
    // Teste 1: Conectividade básica
    console.log('📡 [SNMP DEBUG] Teste 1: Conectividade básica');
    const connectivity = await testSnmpApiConnectivity();
    console.log('✅ [SNMP DEBUG] Conectividade:', connectivity);
    
    // Teste 2: Listar endpoints disponíveis
    console.log('📋 [SNMP DEBUG] Teste 2: Testando endpoints');
    const endpoints = ['/health', '/status', '/hosts', '/monitoring/status'];
    
    for (const endpoint of endpoints) {
      try {
        const response = await snmpApi.get(endpoint);
        console.log(`✅ [SNMP DEBUG] ${endpoint}:`, response.data);
      } catch (error) {
        console.log(`❌ [SNMP DEBUG] ${endpoint}:`, error.response?.status, error.response?.data);
      }
    }
    
    // Teste 3: Dados de exemplo no formato correto do backend
    console.log('📝 [SNMP DEBUG] Teste 3: Formato correto do body para backend');
    const sampleData = {
      name: 'Router Teste',
      snmpConfig: {
        host: '10.0.1.1',
        version: 'v2c',
        oid: '1.3.6.1.2.1.1.3.0',
        community: 'public',
        port: 161,
        interval: 300
      }
    };
    
    const mappedData = mapServiceConfigToSnmpHost(sampleData);
    console.log('🗂️ [SNMP DEBUG] Body esperado pelo backend:', JSON.stringify(mappedData, null, 2));
    console.log('🎯 [SNMP DEBUG] Body em uma linha:', JSON.stringify(mappedData));
    
    // Verificar se corresponde ao formato esperado
    const expectedFormat = {
      "name": "Router Teste",
      "host": "10.0.1.1", 
      "oid": "1.3.6.1.2.1.1.3.0",
      "version": "v2c",
      "community": "public"
    };
    
    console.log('📋 [SNMP DEBUG] Formato esperado:', JSON.stringify(expectedFormat));
    console.log('🔍 [SNMP DEBUG] Comparação de campos obrigatórios:');
    console.log('  - name:', mappedData.name === expectedFormat.name ? '✅' : '❌');
    console.log('  - host:', mappedData.host === expectedFormat.host ? '✅' : '❌');
    console.log('  - oid:', mappedData.oid === expectedFormat.oid ? '✅' : '❌');
    console.log('  - version:', mappedData.version === expectedFormat.version ? '✅' : '❌');
    console.log('  - community:', mappedData.community === expectedFormat.community ? '✅' : '❌');
    
    console.log('✅ [SNMP DEBUG] Testes concluídos!');
    return {
      success: true,
      message: 'Todos os testes executados. Verifique o console para detalhes.',
      mappedData: mappedData,
      expectedFormat: expectedFormat
    };
    
  } catch (error) {
    console.error('❌ [SNMP DEBUG] Erro nos testes:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Testar formato do body para um serviço específico
 * Use para validar o mapeamento antes de enviar para o backend
 */
export const testServiceBodyFormat = (serviceData) => {
  console.log('🧪 [SNMP FORMAT TEST] Testando formato do body...');
  
  try {
    const mappedData = mapServiceConfigToSnmpHost(serviceData);
    
    console.log('📤 [INPUT] Dados do frontend:', serviceData);
    console.log('📥 [OUTPUT] Body para backend:', JSON.stringify(mappedData, null, 2));
    
    // Validar campos obrigatórios
    const requiredFields = ['name', 'host', 'oid', 'version'];
    const missingFields = requiredFields.filter(field => !mappedData[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ [VALIDATION] Campos obrigatórios ausentes:', missingFields);
      return {
        success: false,
        error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
        mappedData
      };
    }
    
    // Validar formato v2c/v1 (deve ter community)
    if ((mappedData.version === 'v1' || mappedData.version === 'v2c') && !mappedData.community) {
      console.warn('⚠️ [VALIDATION] Community string ausente para versão v1/v2c');
      mappedData.community = 'public'; // Valor padrão
    }
    
    console.log('✅ [VALIDATION] Formato válido!');
    return {
      success: true,
      mappedData,
      bodyString: JSON.stringify(mappedData)
    };
    
  } catch (error) {
    console.error('❌ [FORMAT TEST] Erro:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
