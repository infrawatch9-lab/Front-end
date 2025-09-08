import React, { useState, useEffect } from "react";
import { Filter, Plus, RefreshCw, FileText, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceModal from "./internal_components/ServiceModal";
import StatusTable from "./internal_components/MonitorStatusTable";
import Pagination from "./internal_components/MonitorPagination";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme/useTheme";
import CustomDiv from "../components/CustomComponents/CustomDiv";
import AppLoader from "../components/AppLoader";
import ConfirmationModal from "./internal_components/ConfirmationModal";
import { getServices, deleteService } from "../api/services";
import ExportButtonsFilter from "./internal_components/MonitorExportButtonsFilter";

export default function MonitorAdmin() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false); // Começa como false e será true apenas quando necessário
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  // Removed unused cachedData state
  const [lastFetch, setLastFetch] = useState(null);
  const [cacheKey] = useState("services_cache");

  // const [isInitialLoad, setIsInitialLoad] = useState(false); // Removido: não utilizado
  const [hasCacheLoaded, setHasCacheLoaded] = useState(false); // Controla se já tentou carregar cache
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    loading: false,
  });
  const servicesPerPage = 11;
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Cache duration: 1 hour
  const CACHE_DURATION = 60 * 60 * 1000;

  // Function to invalidate cache and fetch fresh data
  const invalidateCacheAndRefresh = React.useCallback(async () => {
    // Helper to clear cache from localStorage
    function clearCacheFromStorage() {
      try {
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(`${cacheKey}_timestamp`);
      } catch {
        // ignore
      }
    }

    // Helper to save cache to localStorage
    function saveCacheToStorage(data, timestamp) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_timestamp`, String(timestamp));
      } catch {
        // ignore
      }
    }

    // Helper to map API data
    function mapApiDataToTableFormat(apiData) {
      if (!Array.isArray(apiData)) return [];
      return apiData.map((service) => {
        let status = "";
        switch (service.status) {
          case "ACTIVE":
          case "UP":
            status = t("status_badge.fulfilled");
            break;
          case "PENDING":
            status = "PENDING";
            break;
          case "WARNING":
            status = t("status_badge.at_risk");
            break;
          case "DOWN":
          case "ERROR":
          case "FAILED":
            status = t("status_badge.error");
            break;
          default:
            status = t("status_badge.at_risk");
        }
        return {
          id: service.id,
          name: service.name,
          servico: service.type,
          sla: service.name,
          limite: t("monitor.two_seconds"),
          medido:
            service.status === "ACTIVE"
              ? t("monitor.one_second")
              : t("monitor.four_seconds"),
          status: status,
          originalType: service.type,
          originalStatus: service.status,
          serviceType: service.type,
          description: service.description,
          originalData: service,
        };
      });
    }

    try {
      setLoading(true);
      clearCacheFromStorage();

      console.log("Cache invalidated, fetching fresh data");
      const data = await getServices();
      const mappedData = mapApiDataToTableFormat(data);
      setServicesData(mappedData);

      // Update cache with fresh data
      const timestamp = new Date().getTime();
      setLastFetch(timestamp);
      saveCacheToStorage(mappedData, timestamp);

      setError(null);
    } catch (e) {
      setError(t("common.error"));
      console.error("Error refreshing services:", e);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, setLoading, setServicesData, setLastFetch, setError, t]);

  // Load cache from localStorage on component mount
  useEffect(() => {
    if (hasCacheLoaded) return; // Evita execução múltipla

    const loadCacheFromStorage = () => {
      try {
        const storedCache = localStorage.getItem(cacheKey);
        const storedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        if (storedCache && storedTimestamp) {
          const parsedCache = JSON.parse(storedCache);
          const timestamp = parseInt(storedTimestamp, 10);
          const now = new Date().getTime();
          if (now - timestamp < CACHE_DURATION) {
            setServicesData(parsedCache);
            setLastFetch(timestamp);
            // setIsInitialLoad(false); // No longer used
            setError(null);
            setHasCacheLoaded(true);
            return;
          }
        }
        setHasCacheLoaded(true);
      } catch {
        setError(t("common.error"));
        setHasCacheLoaded(true);
      }
    };
    loadCacheFromStorage();
  }, [cacheKey, t, CACHE_DURATION, hasCacheLoaded]);

  // Detect when user returns to page after long time away
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Só atualiza se o cache já foi carregado
      if (hasCacheLoaded && !document.hidden && lastFetch) {
        const now = new Date().getTime();
        const timeAway = now - lastFetch;
        const AWAY_THRESHOLD = 30 * 60 * 1000; // 30 minutos
        if (timeAway > AWAY_THRESHOLD) {
          console.log("User returned after long time away, invalidating cache");
          invalidateCacheAndRefresh();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasCacheLoaded, lastFetch, invalidateCacheAndRefresh]);

  // Proteção contra autocomplete indevido
  useEffect(() => {
    const interval = setInterval(() => {
      // Verificar se o campo de busca foi preenchido incorretamente
      document
        .querySelectorAll('input[name*="service-filter"]')
        .forEach((input) => {
          if (
            input.value &&
            input.value.includes("@") &&
            input !== document.activeElement
          ) {
            input.value = "";
            setSearchTerm("");
          }
        });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilter && !event.target.closest(".filter-dropdown")) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  // ...existing code...

  const handleCreateService = () => {
    setShowCreateModal(true);
  };

  const handleServiceCreated = async () => {
    // Invalidar cache e recarregar dados após criar/editar serviço
    await invalidateCacheAndRefresh();
    setShowCreateModal(false);
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setEditingService(service.originalData || service);
    setShowCreateModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    const serviceToDelete = servicesData.find((s) => s.id === serviceId);

    setConfirmModal({
      isOpen: true,
      title: t("actions.delete"),
      message: `${t("actions.confirm_delete")} "${
        serviceToDelete?.name || serviceToDelete?.sla
      }"?`,
      onConfirm: async () => {
        try {
          setConfirmModal((prev) => ({ ...prev, loading: true }));

          await deleteService(serviceId);

          // Invalidar cache e recarregar dados após deletar
          await invalidateCacheAndRefresh();

          // Close modal
          setConfirmModal({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: null,
            loading: false,
          });
        } catch (err) {
          console.error("Error deleting service:", err);
          // Show error in modal
          setConfirmModal({
            isOpen: true,
            title: t("common.error"),
            message: t("actions.delete_error"),
            onConfirm: () =>
              setConfirmModal({
                isOpen: false,
                title: "",
                message: "",
                onConfirm: null,
                loading: false,
              }),
            loading: false,
          });
        }
      },
      loading: false,
    });
  };

  // removed unused mapApiDataToTableFormat

  // Removido: const serviceTypes = [...]  // Não estava sendo usado

  // Filtrar dados com base no termo de pesquisa e tipo de serviço
  const filteredData = servicesData.filter((item) => {
    const matchesSearch =
      item.sla?.toLowerCase().includes(searchTerm.toLowerCase()) || // Nome do serviço (na coluna NOME)
      item.servico?.toLowerCase().includes(searchTerm.toLowerCase()) || // Tipo de serviço (na coluna TIPO)
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) || // Descrição
      item.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()); // Tipo de serviço para navegação

    const matchesServiceType =
      selectedServiceType === "" ||
      item.originalType === selectedServiceType ||
      item.serviceType === selectedServiceType;

    return matchesSearch && matchesServiceType;
  });

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredData.length / servicesPerPage);

  // Dados para a página atual
  const startIndex = (currentPage - 1) * servicesPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + servicesPerPage
  );

  const handleRowClick = (item) => {
    // Usar o tipo original da API se disponível, senão usar o serviceType mapeado
    const serviceType = item.originalType || item.serviceType;

    switch (serviceType) {
      case "HTTP":
      case "API":
      case t("monitor.apis"):
        navigate("/admin/dashboard_api_admin");
        break;
      case "PING":
      case "SERVER":
      case t("monitor.servers"):
        navigate("/admin/dashboard_servers_admin");
        break;
      case "SNMP":
      case "NETWORK":
      case t("monitor.networks"):
        navigate("/admin/dashboard_networks_admin");
        break;
      case "WEBHOOK":
      case t("monitor.webhooks"):
        // Para webhooks, navega para página individual de monitoramento
        navigate(`/admin/webhook_monitor/${item.id}`);
        break;
      default:
        console.log("Tipo de serviço não reconhecido:", serviceType);
        // Fallback para servidores
        navigate("/admin/dashboard_servers_admin");
        break;
    }
  };

  const handleRefresh = async () => {
    // Forçar atualização mesmo com cache válido
    await invalidateCacheAndRefresh();
  };

  const getUniqueServiceTypes = () => {
    const types = [...new Set(servicesData.map((item) => item.originalType))];
    return types.filter((type) => type); // Remove undefined values
  };

  return (
    <CustomDiv type="background" className="min-h-screen p-6">
      <CustomDiv
        type="background"
        className={
          "mx-auto" +
          (theme == "dark" ? "items-colors-light" : "items-colors-dark")
        }
      >
        {/* Page Title and Actions */}
        <CustomDiv
          type="background"
          className="flex items-center justify-between mb-4"
        >
          <CustomDiv type="background">
            <h1
              className={
                "text-2xl font-bold text-white" +
                (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
              }
            >
              {t("monitor.title")}
            </h1>
            <p
              className={
                "text-slate-400 " +
                (theme == "dark" ? " text-colors-light " : " text-colors-dark ")
              }
            >
              {loading
                ? t("common.loading")
                : searchTerm || selectedServiceType
                ? `${filteredData.length} serviços encontrados${
                    selectedServiceType ? ` (tipo: ${selectedServiceType})` : ""
                  }`
                : `${servicesData.length} serviços sendo monitorados`}
            </p>
          </CustomDiv>
          <CustomDiv className="flex items-center space-x-3 relative"></CustomDiv>

          <CustomDiv
            type="background"
            className="flex items-center space-x-3 relative"
          >
            <CustomDiv type="background" className="relative">
              <input
                type="text"
                placeholder={
                  t("monitor.search_placeholder") || "Pesquisar serviços..."
                }
                autoComplete="off"
                name={`service-filter-${Date.now()}`}
                id={`filter-services-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`}
                className={
                  "pl-4 pr-4 py-2 bg-slate-800 text-white border border-slate-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64 " +
                  (theme == "dark"
                    ? " div-dark-mode-fg "
                    : " div-light-mode-fg ")
                }
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                onFocus={(e) => {
                  // Protege apenas contra preenchimento automático indevido
                  setTimeout(() => {
                    if (
                      e.target.value &&
                      !searchTerm &&
                      e.target.value.includes("@")
                    ) {
                      // Se foi preenchido automaticamente com email
                      setSearchTerm("");
                      e.target.value = "";
                    }
                  }, 50);
                }}
              />
            </CustomDiv>
            <ExportButtonsFilter />
            <button
              className={
                "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative filter-dropdown " +
                (theme == "dark" ? " btn-dark-mode-fg " : " btn-light-mode-fg ")
              }
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-5 h-5" />
              {selectedServiceType && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </button>
            {/* Filter Dropdown */}
            {showFilter && (
              <CustomDiv className="absolute top-12 right-0 bg-slate-800 border border-slate-700 rounded shadow-lg z-50 min-w-48 filter-dropdown">
                <CustomDiv className="p-3">
                  <h3 className="text-white font-medium mb-2">
                    {t("filters.filter_services")}
                  </h3>
                  <CustomDiv className="space-y-1">
                    <button
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedServiceType === ""
                          ? " bg-blue-600 text-white "
                          : " text-slate-300 hover:bg-slate-700 hover:text-white "
                      } ${
                        theme == "dark"
                          ? " btn-dark-mode-fg "
                          : " btn-light-mode-fg "
                      }`}
                      onClick={() => {
                        setSelectedServiceType("");
                        setCurrentPage(1);
                        setShowFilter(false);
                      }}
                    >
                      {t("filters.all")}
                    </button>
                    {getUniqueServiceTypes().map((type) => (
                      <button
                        key={type}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          selectedServiceType === type
                            ? " bg-blue-600 text-white "
                            : " text-slate-300 hover:bg-slate-700 hover:text-white "
                        } ${
                          theme == "dark"
                            ? " btn-dark-mode-fg "
                            : " btn-light-mode-fg "
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
                  </CustomDiv>
                </CustomDiv>
              </CustomDiv>
            )}
            <button
              className={
                "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors " +
                (theme == "dark" ? " btn-dark-mode-fg " : " btn-light-mode-fg ")
              }
              onClick={handleRefresh}
              disabled={loading}
              title={`${t("actions.refresh_data")} (ignorar cache)`}
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              className={
                "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors " +
                (theme == "dark" ? " btn-dark-mode-fg " : " btn-light-mode-fg ")
              }
              onClick={handleCreateService}
            >
              <Plus className="w-5 h-5" />
            </button>
          </CustomDiv>
        </CustomDiv>

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
              <div className="flex items-center">
                <AppLoader size={15} minHeight={0} />
                <span className="ml-3 text-slate-400">
                  {t("common.loading")}
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Status Table */}
              <CustomDiv type="background" className="flex-1">
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
                    <p className="text-slate-400">
                      {t("monitor.no_results") || "Nenhum serviço encontrado"}
                    </p>
                  </div>
                )}
              </CustomDiv>
            </>
          )}
        </div>

        {/* Pagination - Always fixed at bottom */}
        {!loading && filteredData.length > 0 && (
          <CustomDiv className="fixed bottom-0 left-0 right-0 bg-[#081028] py-2 px-4 z-40">
            <CustomDiv className="max-w-7xl mx-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </CustomDiv>
          </CustomDiv>
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

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() =>
            setConfirmModal({
              isOpen: false,
              title: "",
              message: "",
              onConfirm: null,
              loading: false,
            })
          }
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          loading={confirmModal.loading}
          type="danger"
          confirmText={t("common.yes")}
          cancelText={t("service_modal.cancel")}
        />
      </CustomDiv>
    </CustomDiv>
  );
}
