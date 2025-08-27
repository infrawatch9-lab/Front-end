import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PingServiceForm from './ServiceForms/PingServiceForm';
import HttpServiceForm from './ServiceForms/HttpServiceForm';
import SnmpServiceForm from './ServiceForms/SnmpServiceForm';
import WebhookServiceForm from './ServiceForms/WebhookServiceForm';
import { createService, updateService } from '../../api/services';

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

  const [specificConfig, setSpecificConfig] = useState({});
  const [newUserEmail, setNewUserEmail] = useState('');

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

  const serviceTypes = [
    { 
      id: 'PING', 
      name: 'Servidores (PING)', 
      icon: '🖥️',
      description: 'Monitoramento via ping para verificar conectividade'
    },
    { 
      id: 'HTTP', 
      name: 'APIs HTTP', 
      icon: '⚡',
      description: 'Monitoramento de endpoints HTTP/HTTPS'
    },
    { 
      id: 'SNMP', 
      name: 'Redes (SNMP)', 
      icon: '🌐',
      description: 'Monitoramento de dispositivos de rede via SNMP'
    },
    { 
      id: 'WEBHOOK', 
      name: 'Webhooks', 
      icon: '🔗',
      description: 'Configuração de webhooks para notificações'
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
      alert('Por favor, insira um email válido');
    } else if (baseFormData.usersToNotify.includes(email)) {
      alert('Este email já foi adicionado');
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
        ...baseFormData,
        type: selectedType
      };

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
        await updateService(editingService.id, serviceData);
      } else {
        await createService(serviceData);
      }

      onServiceCreated();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Erro ao salvar serviço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const isStep2Valid = () => {
    return baseFormData.name.trim() && baseFormData.description.trim();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Selecione o tipo de serviço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="p-4 border border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-700 transition-all text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <h4 className="text-white font-medium">{type.name}</h4>
                      <p className="text-slate-400 text-sm mt-1">{type.description}</p>
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
            <h3 className="text-lg font-semibold text-white mb-4">
              Informações básicas
            </h3>
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome do serviço *
                </label>
                <input
                  type="text"
                  value={baseFormData.name}
                  onChange={(e) => handleBaseFormChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Servidor Principal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tipo
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
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descrição *
              </label>
              <textarea
                value={baseFormData.description}
                onChange={(e) => handleBaseFormChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descreva o que este serviço monitora..."
              />
            </div>

            {/* Users to Notify */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Usuários para Notificar
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
                    Nenhum usuário adicionado para notificações
                  </div>
                )}
                
                {/* Add new user */}
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    onKeyPress={handleUserEmailKeyPress}
                    placeholder="email@exemplo.com"
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={addUserToNotify}
                    disabled={!newUserEmail.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-xs text-slate-400">
                  Adicione os emails dos usuários que devem receber notificações sobre este serviço
                </p>
              </div>
            </div>

            {/* Monitoring Configuration */}
            <div>
              <h4 className="text-md font-medium text-white mb-3">Configuração de Monitoramento</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Intervalo (segundos)
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Timeout (ms)
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tentativas
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Configuração específica - {serviceTypes.find(t => t.id === selectedType)?.name}
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

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">
            {editingService ? 'Editar Serviço' : 'Novo Serviço'}
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
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-600 text-slate-400'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-slate-400">
              {editingService ? 'Informações' : 'Tipo'}
            </span>
            <span className="text-sm text-slate-400">Básico</span>
            <span className="text-sm text-slate-400">Específico</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700">
          <button
            onClick={currentStep === 1 ? onClose : () => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            disabled={loading}
          >
            {currentStep === 1 ? 'Cancelar' : 'Voltar'}
          </button>

          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 2 && !isStep2Valid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                <span>{editingService ? 'Salvar' : 'Criar Serviço'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
