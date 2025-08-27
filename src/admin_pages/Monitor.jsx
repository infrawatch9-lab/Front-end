import React, { useState, useEffect } from "react";
import { Filter, Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ServiceModal from "./internal_components/ServiceModal";
import StatusTable from "./internal_components/MonitorStatusTable";
import Pagination from "./internal_components/MonitorPagination";
import { useTranslation } from 'react-i18next';
import { getServices, deleteService } from '../api/services';

export default function MonitorAdmin() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [cachedData, setCachedData] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const servicesPerPage = 11;
  const navigate = useNavigate();
  
  // Cache duration: 30 minutes
  const CACHE_DURATION = 60 * 60 * 1000;

  // Fetch services from API with cache
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Check if we have valid cached data
        const now = new Date().getTime();
        if (cachedData && lastFetch && (now - lastFetch) < CACHE_DURATION) {
          console.log('Using cached data');
          setServicesData(cachedData);
          setLoading(false);
          return;
        }
        
        console.log('Fetching fresh data from API');
        const data = await getServices();
        // Mapear os dados da API para o formato esperado pelo componente
        const mappedData = mapApiDataToTableFormat(data);
        setServicesData(mappedData);
        
        // Cache the data
        setCachedData(mappedData);
        setLastFetch(now);
        
        setError(null);
      } catch (err) {
        setError('Erro ao carregar serviços');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilter && !event.target.closest('.filter-dropdown')) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilter]);

  const handleCreateService = () => {
    setShowCreateModal(true);
  };

  const handleServiceCreated = async () => {
    // Recarregar a lista de serviços após criar um novo e invalidar cache
    try {
      const data = await getServices();
      const mappedData = mapApiDataToTableFormat(data);
      setServicesData(mappedData);
      
      // Update cache with fresh data
      setCachedData(mappedData);
      setLastFetch(new Date().getTime());
    } catch (err) {
      console.error('Error refreshing services:', err);
    }
    setShowCreateModal(false);
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setEditingService(service.originalData || service);
    setShowCreateModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Tem certeza que deseja deletar este serviço?')) {
      try {
        await deleteService(serviceId);
        // Refresh the list after deletion
        const data = await getServices();
        const mappedData = mapApiDataToTableFormat(data);
        setServicesData(mappedData);
        
        // Update cache with fresh data
        setCachedData(mappedData);
        setLastFetch(new Date().getTime());
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Erro ao deletar serviço. Tente novamente.');
      }
    }
  };

  const mapApiDataToTableFormat = (apiData) => {
    if (!Array.isArray(apiData)) return [];
    
    return apiData.map(service => {
      // Mapear o status
      let status = '';
      switch (service.status) {
        case 'ACTIVE':
        case 'UP':
          status = t('status_badge.fulfilled');
          break;
        case 'PENDING':
          status = 'PENDING';
          break;
        case 'WARNING':
          status = t('status_badge.at_risk');
          break;
        case 'DOWN':
        case 'ERROR':
        case 'FAILED':
          status = t('status_badge.error');
          break;
        default:
          status = t('status_badge.at_risk');
      }

      return {
        id: service.id,
        name: service.name,
        servico: service.type, // Tipo do serviço na coluna TIPO
        sla: service.name, // Nome do serviço na coluna NOME
        limite: t('monitor.two_seconds'),
        medido: service.status === 'ACTIVE' ? t('monitor.one_second') : t('monitor.four_seconds'),
        status: status,
        originalType: service.type,
        originalStatus: service.status,
        serviceType: service.type, // Tipo do serviço para navegação
        description: service.description, // Guardar descrição para referência
        // Keep original service data for editing
        originalData: service
      };
    });
  };

  const serviceTypes = [
    t('monitor.servers'),
    t('monitor.apis'),
    t('monitor.networks'),
    t('monitor.webhooks')
  ];

  // Filtrar dados com base no termo de pesquisa e tipo de serviço
  const filteredData = servicesData.filter(item => {
    const matchesSearch = 
      item.sla?.toLowerCase().includes(searchTerm.toLowerCase()) ||      // Nome do serviço (na coluna NOME)
      item.servico?.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Tipo de serviço (na coluna TIPO)
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) || // Descrição
      item.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()); // Tipo de serviço para navegação
    
    const matchesServiceType = selectedServiceType === '' || 
      item.originalType === selectedServiceType ||
      item.serviceType === selectedServiceType;
    
    return matchesSearch && matchesServiceType;
  });

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredData.length / servicesPerPage);

  // Dados para a página atual
  const startIndex = (currentPage - 1) * servicesPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + servicesPerPage);

  const handleRowClick = (item) => {
    // Usar o tipo original da API se disponível, senão usar o serviceType mapeado
    const serviceType = item.originalType || item.serviceType;
    
    switch (serviceType) {
      case 'HTTP':
      case 'API':
      case t('monitor.apis'):
        navigate("/admin/dashboard_api_admin");
        break;
      case 'PING':
      case 'SERVER':
      case t('monitor.servers'):
        navigate("/admin/dashboard_servers_admin");
        break;
      case 'SNMP':
      case 'NETWORK':
      case t('monitor.networks'):
        navigate("/admin/dashboard_networks_admin");
        break;
      case 'WEBHOOK':
      case t('monitor.webhooks'):
        navigate("/admin/dashboard_webhooks_admin");
        break;
      default:
        console.log('Tipo de serviço não reconhecido:', serviceType);
        // Fallback para servidores
        navigate("/admin/dashboard_servers_admin");
        break;
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      const mappedData = mapApiDataToTableFormat(data);
      setServicesData(mappedData);
      
      // Update cache with fresh data
      setCachedData(mappedData);
      setLastFetch(new Date().getTime());
      
      setError(null);
    } catch (err) {
      setError('Erro ao carregar serviços');
      console.error('Error refreshing services:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueServiceTypes = () => {
    const types = [...new Set(servicesData.map(item => item.originalType))];
    return types.filter(type => type); // Remove undefined values
  };

  return (
    <div className="min-h-screen bg-[#081028] flex flex-col">
      
      <main className="p-4 flex-1 flex flex-col pb-16">
        {/* Page Title and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{t('monitor.title')}</h1>
            <p className="text-slate-400">
              {loading 
                ? 'Carregando serviços...'
                : searchTerm || selectedServiceType
                  ? `${filteredData.length} serviços encontrados${selectedServiceType ? ` (tipo: ${selectedServiceType})` : ''}` 
                  : `${servicesData.length} serviços sendo monitorados`
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-3 relative">
            <div className="relative">
              <input
                type="text"
                placeholder={t('monitor.search_placeholder') || 'Pesquisar serviços...'}
                className="pl-4 pr-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>
            <button 
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative filter-dropdown"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-5 h-5" />
              {selectedServiceType && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </button>
            
            {/* Filter Dropdown */}
            {showFilter && (
              <div className="absolute top-12 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 min-w-48 filter-dropdown">
                <div className="p-3">
                  <h3 className="text-white font-medium mb-2">Filtrar por tipo</h3>
                  <div className="space-y-1">
                    <button
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedServiceType === '' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => {
                        setSelectedServiceType('');
                        setCurrentPage(1);
                        setShowFilter(false);
                      }}
                    >
                      Todos os tipos
                    </button>
                    {getUniqueServiceTypes().map(type => (
                      <button
                        key={type}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          selectedServiceType === type 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                        onClick={() => {
                          setSelectedServiceType(type);
                          setCurrentPage(1);
                          setShowFilter(false);
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <button
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={handleRefresh}
              disabled={loading}
              title="Atualizar dados"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
  onClick={handleCreateService}
>
  <Plus className="w-5 h-5" />
</button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Content area - takes remaining space */}
        <div className="flex-1 flex flex-col">
          {/* Loading state */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-3 text-slate-400">Carregando serviços...</span>
            </div>
          ) : (
            <>
              {/* Status Table */}
              <div className="flex-1">
                <StatusTable
                  data={currentPageData}
                  searchTerm={searchTerm}
                  onRowClick={handleRowClick}
                  onEditService={handleEditService}
                  onDeleteService={handleDeleteService}
                />

                {/* No results message */}
                {filteredData.length === 0 && searchTerm && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">{t('monitor.no_results') || 'Nenhum serviço encontrado'}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Pagination - Always fixed at bottom */}
        {!loading && filteredData.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#081028] py-2 px-4 z-40">
            <div className="max-w-7xl mx-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}

        {/* Service Modal */}
        {showCreateModal && (
          <ServiceModal 
            onClose={() => {
              setShowCreateModal(false);
              setEditingService(null);
            }}
            onServiceCreated={handleServiceCreated}
            editingService={editingService}
          />
        )}
      </main>
    </div>
  );
}
