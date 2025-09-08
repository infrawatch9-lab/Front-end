import { api } from '../confg';
import { createSnmpHost, updateSnmpHost, deleteSnmpHost } from './snmp';

// Get all monitored services
export const getServices = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await api.get('/services');
    console.log('getServices response:', response.data);
    return response.data.services || response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Get service by ID
export const getServiceById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await api.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
};

// Create new service
export const createService = async (serviceData) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    console.log('Creating service with data:', serviceData);
    
    // Criar serviço principal no backend
    const response = await api.post('/services', serviceData);
    const createdService = response.data;
    
    // Se for SNMP, criar também na API SNMP dedicada
    if (serviceData.type === 'SNMP' && serviceData.snmpConfig) {
      try {
        console.log('[SNMP Integration] Creating SNMP host for service:', createdService);
        
        // Preparar dados para API SNMP incluindo o ID do serviço criado
        const snmpServiceData = {
          ...serviceData,
          id: createdService.id || createdService.service?.id
        };
        
        const snmpResult = await createSnmpHost(snmpServiceData);
        console.log('[SNMP Integration] SNMP host created successfully:', snmpResult);
        
        // Adicionar informações do SNMP na resposta
        if (createdService.service) {
          createdService.service.snmpHostId = snmpResult.snmpHostId;
          createdService.service.zabbixHostId = snmpResult.zabbixHostId;
        } else {
          createdService.snmpHostId = snmpResult.snmpHostId;
          createdService.zabbixHostId = snmpResult.zabbixHostId;
        }
        
      } catch (snmpError) {
        console.error('[SNMP Integration] Failed to create SNMP host:', snmpError);
        
        // Tentar remover o serviço criado se SNMP falhou
        try {
          await api.delete(`/services/${createdService.id || createdService.service?.id}`);
          console.log('[SNMP Integration] Service rolled back due to SNMP failure');
        } catch (rollbackError) {
          console.error('[SNMP Integration] Failed to rollback service:', rollbackError);
        }
        
        throw new Error(`Serviço criado mas falhou na configuração SNMP: ${snmpError.message}`);
      }
    }
    
    return createdService;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update service
export const updateService = async (id, serviceData) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    console.log('Updating service with data:', serviceData);
    
    // Buscar serviço atual para obter informações do SNMP se existir
    let currentService = null;
    try {
      const currentResponse = await api.get(`/services/${id}`);
      currentService = currentResponse.data;
    } catch (fetchError) {
      console.warn('Could not fetch current service data:', fetchError);
    }
    
    // Atualizar serviço principal no backend
    const response = await api.put(`/services/${id}`, serviceData);
    const updatedService = response.data;
    
    // Se for SNMP e houver configuração SNMP, atualizar na API SNMP dedicada
    if (serviceData.type === 'SNMP' && serviceData.snmpConfig) {
      try {
        // Procurar snmpHostId do serviço atual
        const snmpHostId = currentService?.snmpHostId || 
                          currentService?.service?.snmpHostId ||
                          updatedService?.snmpHostId ||
                          updatedService?.service?.snmpHostId;
        
        if (snmpHostId) {
          console.log('[SNMP Integration] Updating SNMP host ID:', snmpHostId);
          
          const snmpServiceData = {
            ...serviceData,
            id: id
          };
          
          const snmpResult = await updateSnmpHost(snmpHostId, snmpServiceData);
          console.log('[SNMP Integration] SNMP host updated successfully:', snmpResult);
        } else {
          console.warn('[SNMP Integration] No SNMP host ID found, creating new SNMP host');
          
          // Se não tiver snmpHostId, criar um novo host SNMP
          const snmpServiceData = {
            ...serviceData,
            id: id
          };
          
          const snmpResult = await createSnmpHost(snmpServiceData);
          console.log('[SNMP Integration] New SNMP host created:', snmpResult);
          
          // Atualizar serviço com o novo snmpHostId
          if (updatedService.service) {
            updatedService.service.snmpHostId = snmpResult.snmpHostId;
            updatedService.service.zabbixHostId = snmpResult.zabbixHostId;
          } else {
            updatedService.snmpHostId = snmpResult.snmpHostId;
            updatedService.zabbixHostId = snmpResult.zabbixHostId;
          }
        }
        
      } catch (snmpError) {
        console.error('[SNMP Integration] Failed to update SNMP host:', snmpError);
        // Para atualização, não fazemos rollback, apenas logamos o erro
        console.warn('[SNMP Integration] Service updated but SNMP configuration failed:', snmpError.message);
      }
    }
    
    return updatedService;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    console.log('Deleting service ID:', id);
    
    // Buscar serviço para verificar se é SNMP
    let serviceToDelete = null;
    try {
      const serviceResponse = await api.get(`/services/${id}`);
      serviceToDelete = serviceResponse.data;
    } catch (fetchError) {
      console.warn('Could not fetch service before deletion:', fetchError);
    }
    
    // Se for SNMP, deletar da API SNMP primeiro
    if (serviceToDelete && serviceToDelete.type === 'SNMP') {
      const snmpHostId = serviceToDelete.snmpHostId || 
                        serviceToDelete.service?.snmpHostId;
      
      if (snmpHostId) {
        try {
          console.log('[SNMP Integration] Deleting SNMP host ID:', snmpHostId);
          const snmpResult = await deleteSnmpHost(snmpHostId);
          console.log('[SNMP Integration] SNMP host deleted successfully:', snmpResult);
        } catch (snmpError) {
          console.error('[SNMP Integration] Failed to delete SNMP host:', snmpError);
          // Continuar com a deleção do serviço mesmo se SNMP falhar
          console.warn('[SNMP Integration] Continuing with service deletion despite SNMP error');
        }
      }
    }
    
    // Deletar serviço principal
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Get service status/SLA metrics
export const getServiceStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await api.get(`/services/${id}/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service status:', error);
    throw error;
  }
};

// Re-export SNMP functions for convenience
export { 
  createSnmpHost, 
  updateSnmpHost, 
  deleteSnmpHost, 
  getSnmpHosts, 
  checkSnmpApiHealth, 
  getSnmpStatus, 
  restartSnmpMonitoring,
  testSnmpApiConnectivity,
  debugSnmpApi
} from './snmp';
