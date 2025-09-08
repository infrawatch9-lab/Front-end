import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PingServiceForm from './ServiceForms/PingServiceForm';
import HttpServiceForm from './ServiceForms/HttpServiceForm';
import SnmpServiceForm from './ServiceForms/SnmpServiceForm';
import WebhookServiceForm from './ServiceForms/WebhookServiceForm';
import ConfirmationModal from './ConfirmationModal';
import { createService, updateService } from '../../api/services';
import CustomDiv from '../../components/CustomComponents/CustomDiv';
import { useTheme } from '../../hooks/useTheme/useTheme';

const ServiceModal = ({ onClose, onServiceCreated, editingService = null }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(editingService?.type || '');
  
  const [baseFormData, setBaseFormData] = useState({
    name: editingService?.name || '',
    description: editingService?.description || '',
    teamId: editingService?.teamId || null,
    usersToNotify: editingService?.usersToNotify || [],
    rules: editingService?.rules || [],
    monitoringConfig: {
      interval: 60,
      timeout: 5000,
      retries: 3,
      delay: 1000,
      alertAfterFailures: 3,
      minAlertInterval: 300,
      ...editingService?.monitoringConfig
    }
  });

  const theme = useTheme();
  const [specificConfig, setSpecificConfig] = useState({});
  const [newUserEmail, setNewUserEmail] = useState('');
  const [createdWebhookEndpoint, setCreatedWebhookEndpoint] = useState(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  useEffect(() => {
    if (editingService) {
      setCurrentStep(2); // Skip type selection for editing
      switch (editingService.type) {
        case 'PING':
          setSpecificConfig(editingService.pingConfig || {});
          break;
        case 'HTTP':
          setSpecificConfig(editingService.httpConfig || {});
          break;
        case 'SNMP':
          setSpecificConfig(editingService.snmpConfig || {});
          break;
        case 'WEBHOOK':
          setSpecificConfig(editingService.webhookConfig || {});
          break;
      }
    }
  }, [editingService]);

  // Limpar campo de email quando mudar de step para evitar interferência do autocomplete
  useEffect(() => {
    if (currentStep !== 2) {
      setNewUserEmail('');
    }
  }, [currentStep]);

  // Limpar campos ao abrir modal para evitar autocomplete
  useEffect(() => {
    // Múltiplas tentativas de limpeza para garantir
    const clearFields = () => {
      setNewUserEmail('');
      // Limpar campos de busca em toda a página
      document.querySelectorAll('input[type="text"]').forEach(input => {
        if (input.value && input.value.includes('@') && input.value !== searchTerm) {
          input.value = '';
        }
      });
    };

    const timers = [
      setTimeout(clearFields, 50),
      setTimeout(clearFields, 100),
      setTimeout(clearFields, 200),
      setTimeout(clearFields, 500),
      setTimeout(clearFields, 1000)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Monitorar mudanças não autorizadas nos campos
  useEffect(() => {
    const interval = setInterval(() => {
      // Verificar se algum campo foi preenchido incorretamente
      document.querySelectorAll('input[name*="anti-autofill"]').forEach(input => {
        if (input.value && input.value.includes('@') && input !== document.activeElement) {
          input.value = '';
          if (input.name.includes('email')) {
            setNewUserEmail('');
          }
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const serviceTypes = [
    { 
      id: 'PING', 
      name: t('service_types.ping.name'), 
      icon: '🖥️',
      description: t('service_types.ping.description')
    },
    { 
      id: 'HTTP', 
      name: t('service_types.http.name'), 
      icon: '⚡',
      description: t('service_types.http.description')
    },
    { 
      id: 'SNMP', 
      name: t('service_types.snmp.name'), 
      icon: '🌐',
      description: t('service_types.snmp.description')
    },
    { 
      id: 'WEBHOOK', 
      name: t('service_types.webhook.name'), 
      icon: '🔗',
      description: t('service_types.webhook.description')
    }
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleBaseFormChange = (field, value) => {
    setBaseFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMonitoringConfigChange = (field, value) => {
    setBaseFormData(prev => ({
      ...prev,
      monitoringConfig: {
        ...prev.monitoringConfig,
        [field]: value
      }
    }));
  };

  const handleSpecificConfigChange = (config) => {
    setSpecificConfig(config);
  };

  const addUserToNotify = () => {
    const email = newUserEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && emailRegex.test(email) && !baseFormData.usersToNotify.includes(email)) {
      setBaseFormData(prev => ({
        ...prev,
        usersToNotify: [...prev.usersToNotify, email]
      }));
      setNewUserEmail('');
    } else if (email && !emailRegex.test(email)) {
      setNotification({
        isOpen: true,
        title: t('common.error'),
        message: t('service_modal.invalid_email'),
        type: 'warning'
      });
    } else if (baseFormData.usersToNotify.includes(email)) {
      setNotification({
        isOpen: true,
        title: t('common.error'),
        message: t('service_modal.email_already_added'),
        type: 'warning'
      });
    }
  };

  const removeUserToNotify = (emailToRemove) => {
    setBaseFormData(prev => ({
      ...prev,
      usersToNotify: prev.usersToNotify.filter(email => email !== emailToRemove)
    }));
  };

  const handleUserEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addUserToNotify();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const serviceData = {
        name: baseFormData.name,
        description: baseFormData.description,
        type: selectedType,
        teamId: baseFormData.teamId,
        usersToNotify: baseFormData.usersToNotify
      };

      // Add monitoring config only for non-webhook services
      if (selectedType !== 'WEBHOOK') {
        serviceData.monitoringConfig = baseFormData.monitoringConfig;
      }

      // Add specific config based on type
      switch (selectedType) {
        case 'PING':
          serviceData.pingConfig = specificConfig;
          break;
        case 'HTTP':
          serviceData.httpConfig = specificConfig;
          break;
        case 'SNMP':
          serviceData.snmpConfig = specificConfig;
          break;
        case 'WEBHOOK':
          serviceData.webhookConfig = specificConfig;
          break;
      }

      if (editingService) {
        const response = await updateService(editingService.id, serviceData);
        
        // Verificar se houve problemas com SNMP na atualização
        if (selectedType === 'SNMP') {
          setNotification({
            isOpen: true,
            title: t('common.success'),
            message: 'Serviço SNMP atualizado com sucesso. Configurações sincronizadas com Zabbix.',
            type: 'success'
          });
          
          // Fechar modal após pequeno delay para mostrar a notificação
          setTimeout(() => {
            onServiceCreated();
          }, 1500);
        } else {
          onServiceCreated();
        }
      } else {
        const response = await createService(serviceData);
        
        // Se for webhook e tiver endpoint na resposta, mostrar para o usuário
        if (selectedType === 'WEBHOOK' && response?.webhookConfig?.endpoint) {
          setCreatedWebhookEndpoint(response.webhookConfig.endpoint);
          setCurrentStep(4); // Novo step para mostrar o endpoint
        } else if (selectedType === 'SNMP') {
          // Notificação específica para SNMP
          setNotification({
            isOpen: true,
            title: t('common.success'),
            message: 'Serviço SNMP criado com sucesso! Host adicionado ao monitoramento Zabbix.',
            type: 'success'
          });
          
          // Fechar modal após pequeno delay para mostrar a notificação
          setTimeout(() => {
            onServiceCreated();
          }, 1500);
        } else {
          onServiceCreated();
        }
      }
    } catch (error) {
      console.error('Error saving service:', error);
      
      // Mensagem de erro específica para SNMP
      let errorMessage = t('common.error');
      if (selectedType === 'SNMP' && error.message) {
        if (error.message.includes('SNMP')) {
          errorMessage = `Erro na configuração SNMP: ${error.message}`;
        } else {
          errorMessage = error.message;
        }
      }
      
      setNotification({
        isOpen: true,
        title: t('common.error'),
        message: errorMessage,
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  const isStep2Valid = () => {
    return baseFormData.name.trim() && baseFormData.description.trim();
  };

  const isStep3Valid = () => {
    switch (selectedType) {
      case 'PING':
        return specificConfig.ipAddress && specificConfig.ipAddress.trim();
      case 'HTTP':
        return specificConfig.endpoint && specificConfig.endpoint.trim() && specificConfig.method;
      case 'SNMP':
        return specificConfig.host && specificConfig.host.trim() && specificConfig.version && specificConfig.oid && specificConfig.oid.trim();
      case 'WEBHOOK':
        const hasProvedor = specificConfig.provedor && specificConfig.provedor.trim();
        const hasCustomProvedor = specificConfig.provedor === 'custom' 
          ? specificConfig.customProvedor && specificConfig.customProvedor.trim()
          : true;
        return hasProvedor && hasCustomProvedor;
      default:
        return true;
    }
  };

  const validateAndSubmit = () => {
    // Validar campos básicos
    if (!baseFormData.name.trim()) {
      setNotification({
        isOpen: true,
        title: t('common.error'),
        message: t('service_modal.service_name') + ' é obrigatório',
        type: 'warning'
      });
      return;
    }

    if (!baseFormData.description.trim()) {
      setNotification({
        isOpen: true,
        title: t('common.error'),
        message: t('service_modal.description') + ' é obrigatória',
        type: 'warning'
      });
      return;
    }

    // Validar campos específicos por tipo
    let missingField = '';
    switch (selectedType) {
      case 'PING':
        if (!specificConfig.ipAddress || !specificConfig.ipAddress.trim()) {
          missingField = t('service_types.ping.ip_address');
        }
        break;
      case 'HTTP':
        if (!specificConfig.endpoint || !specificConfig.endpoint.trim()) {
          missingField = t('service_types.http.endpoint');
        } else if (!specificConfig.method) {
          missingField = t('service_types.http.method');
        }
        break;
      case 'SNMP':
        if (!specificConfig.host || !specificConfig.host.trim()) {
          missingField = t('service_types.snmp.host');
        } else if (!specificConfig.version) {
          missingField = t('service_types.snmp.version');
        } else if (!specificConfig.oid || !specificConfig.oid.trim()) {
          missingField = t('service_types.snmp.oid');
        }
        break;
      case 'WEBHOOK':
        if (!specificConfig.provedor || !specificConfig.provedor.trim()) {
          missingField = 'Provedor';
        } else if (specificConfig.provedor === 'custom' && (!specificConfig.customProvedor || !specificConfig.customProvedor.trim())) {
          missingField = 'Nome do Provedor Personalizado';
        }
        break;
    }

    if (missingField) {
      setNotification({
        isOpen: true,
        title: t('common.error'),
        message: `${missingField} é obrigatório`,
        type: 'warning'
      });
      return;
    }

    // Se chegou até aqui, tudo está válido
    handleSubmit();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
              {t('service_modal.select_type')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={"p-4 border border-slate-600 rounded-lg hover:border-slate-500 transition-all text-left" + (theme === "dark" ? " hover:bg-slate-700 " : " hover:bg-slate-200")}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <h4 className={`font-medium ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{type.name}</h4>
                      <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-white-700"}`}>{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
              {t('service_modal.basic_info')}
            </h3>
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                  {t('service_modal.service_name')} *
                </label>
                <input
                  type="text"
                  value={baseFormData.name}
                  onChange={(e) => handleBaseFormChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('service_modal.service_name_placeholder')}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                  {t('service_modal.type')}
                </label>
                <input
                  type="text"
                  value={serviceTypes.find(t => t.id === selectedType)?.name || selectedType}
                  disabled
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                {t('service_modal.description')} *
              </label>
              <textarea
                value={baseFormData.description}
                onChange={(e) => handleBaseFormChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('service_modal.description_placeholder')}
              />
            </div>

            {/* Users to Notify */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                <Mail className="w-4 h-4 inline mr-2" />
                {t('service_modal.users_to_notify')}
              </label>
              <div className="space-y-2">
                {/* Current users list */}
                {baseFormData.usersToNotify.length > 0 ? (
                  <div className="space-y-2">
                    {baseFormData.usersToNotify.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded-lg">
                        <span className="text-slate-300 text-sm">{email}</span>
                        <button
                          onClick={() => removeUserToNotify(email)}
                          className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-slate-400 text-sm bg-slate-700 rounded-lg border-2 border-dashed border-slate-600">
                    {t('service_modal.no_users_added')}
                  </div>
                )}
                
                {/* Add new user */}
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    {/* Campo decoy apenas para desviar autocomplete */}
                    <input 
                      type="text" 
                      style={{ position: 'absolute', left: '-9999px', height: '0px', width: '0px' }} 
                      tabIndex={-1} 
                      autoComplete="username"
                    />
                    <input
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      onKeyPress={handleUserEmailKeyPress}
                      onFocus={(e) => {
                        // Protege apenas contra preenchimento automático indevido
                        setTimeout(() => {
                          if (e.target.value && !newUserEmail && e.target.value.includes('@')) {
                            // Se um email foi preenchido automaticamente mas o state está vazio
                            e.target.value = '';
                          }
                        }, 50);
                      }}
                      placeholder={t('service_modal.add_email_placeholder')}
                      autoComplete="new-email"
                      name={`email-notification-${Date.now()}`}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={addUserToNotify}
                    disabled={!newUserEmail.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-xs text-slate-400">
                  {t('service_modal.email_help')}
                </p>
              </div>
            </div>

            {/* Monitoring Configuration - Only for non-webhook services */}
            {selectedType !== 'WEBHOOK' && (
              <div>
                <h4 className={`text-md font-medium mb-3 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('service_modal.monitoring_config')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                      {t('service_modal.interval_seconds')}
                    </label>
                    <input
                      type="number"
                      value={baseFormData.monitoringConfig.interval}
                      onChange={(e) => handleMonitoringConfigChange('interval', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                      {t('service_modal.timeout_ms')}
                    </label>
                    <input
                      type="number"
                      value={baseFormData.monitoringConfig.timeout}
                      onChange={(e) => handleMonitoringConfigChange('timeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1000"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                      {t('service_modal.retries')}
                    </label>
                    <input
                      type="number"
                      value={baseFormData.monitoringConfig.retries}
                      onChange={(e) => handleMonitoringConfigChange('retries', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
              {t('service_modal.specific_config')} - {serviceTypes.find(t => t.id === selectedType)?.name}
            </h3>
            
            {selectedType === 'PING' && (
              <PingServiceForm
                config={specificConfig}
                onChange={handleSpecificConfigChange}
              />
            )}
            
            {selectedType === 'HTTP' && (
              <HttpServiceForm
                config={specificConfig}
                onChange={handleSpecificConfigChange}
              />
            )}
            
            {selectedType === 'SNMP' && (
              <SnmpServiceForm
                config={specificConfig}
                onChange={handleSpecificConfigChange}
              />
            )}
            
            {selectedType === 'WEBHOOK' && (
              <WebhookServiceForm
                config={specificConfig}
                onChange={handleSpecificConfigChange}
              />
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                Webhook criado com sucesso!
              </h3>
              <p className="text-slate-400 mb-6">
                Seu endpoint webhook foi gerado. Use este URL no seu provedor:
              </p>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
                Endpoint do Webhook:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={createdWebhookEndpoint || ''}
                  readOnly
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-green-400 font-mono text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdWebhookEndpoint || '');
                    setNotification({
                      isOpen: true,
                      title: 'Copiado!',
                      message: 'Endpoint copiado para a área de transferência',
                      type: 'info'
                    });
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Copiar
                </button>
              </div>
            </div>

            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-200 mb-2">
                📋 Próximos passos:
              </h4>
              <div className="text-sm text-blue-100 space-y-1">
                <p>1. Copie o endpoint acima</p>
                <p>2. Configure este URL no seu provedor ({specificConfig.provedor})</p>
                <p>3. Use o método POST para enviar webhooks</p>
                {specificConfig.secret && <p>4. Configure o secret para validação de segurança</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <CustomDiv type='background' className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
            {editingService ? t('service_modal.edit_service') : t('service_modal.new_service')}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, ...(currentStep === 4 ? [4] : [])].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? step === 4 ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      : 'bg-slate-600 text-slate-400'
                  }`}
                >
                  {step === 4 ? '✓' : step}
                </div>
                {step < (currentStep === 4 ? 4 : 3) && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? (step === 3 && currentStep === 4 ? 'bg-green-600' : 'bg-blue-600') : 'bg-slate-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>
              {editingService ? t('service_modal.basic_info') : t('service_modal.select_type')}
            </span>
            <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('service_modal.basic_info')}</span>
            <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('service_modal.specific_config')}</span>
            {currentStep === 4 && (
              <span className="text-sm text-green-400">Concluído</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700">
          <button
            onClick={currentStep === 1 ? onClose : currentStep === 4 ? onClose : () => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            disabled={loading}
          >
            {currentStep === 1 || currentStep === 4 ? t('service_modal.cancel') : t('service_modal.back')}
          </button>

          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 2 && !isStep2Valid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('service_modal.next')}
              </button>
            ) : currentStep === 3 ? (
              <button
                onClick={validateAndSubmit}
                disabled={loading || !isStep3Valid()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                <span>{editingService ? t('service_modal.save') : t('service_modal.create_service')}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onServiceCreated();
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </CustomDiv>

      {/* Notification Modal */}
      <ConfirmationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ isOpen: false, title: '', message: '', type: 'info' })}
        onConfirm={() => setNotification({ isOpen: false, title: '', message: '', type: 'info' })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        confirmText="OK"
        cancelText=""
      />
    </div>
  );
};

export default ServiceModal;
