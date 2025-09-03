import React, { useState } from 'react';

const ConfigService = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    url: '',
    interval: '5'
  });

  const monitoringTypes = [
    { id: 'servidores', name: 'Servidores', icon: '🖥️' },
    { id: 'api', name: 'API', icon: '⚡' },
    { id: 'webhooks', name: 'Web hooks', icon: '🔗' },
    { id: 'redes', name: 'Redes', icon: '🌐' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Serviço criado:', formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      type: '',
      description: '',
      url: '',
      interval: '5'
    });
  };

  const isStep1Valid = formData.name.trim() && formData.type && formData.description.trim();
  const isStep2Valid = true;

  return (
    <div className="relative w-[600px] max-h-[75vh] mx-auto bg-[#0B1440] rounded p-8 shadow-2xl overflow-y-auto">
      {/* Botão de fechar */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
          aria-label="Fechar"
        >
          ×
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-2 tracking-wide">ADICIONAR SERVIÇO</h2>
        <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full"></div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
              ${step === currentStep 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                : step < currentStep 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-900 text-slate-300'
              }
            `}>
              {step < currentStep ? '✓' : step}
            </div>
            {step < 3 && (
              <div className={`
                w-12 h-0.5 mx-2 transition-all duration-300
                ${step < currentStep ? 'bg-green-500' : 'bg-slate-900'}
              `}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Informações Básicas */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl text-blue-400 font-medium">Informações do Serviço</h3>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Nome do Serviço
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Digite o nome do serviço"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-3">
              Tipo de Monitoramento
            </label>
            <div className="grid grid-cols-2 gap-3">
              {monitoringTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleInputChange('type', type.id)}
                  className={`
                    p-4 rounded cursor-pointer transition-all duration-200 text-center border-2
                    ${formData.type === type.id
                      ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/30'
                      : 'border-slate-600 bg-slate-900/30 hover:border-blue-400 hover:bg-slate-900/50'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-white font-medium text-sm">{type.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Ex: Serviço de Monitoramento de Roteadores HUAWEI AX2"
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className={`
                px-6 py-3 rounded font-medium transition-all duration-200
                ${isStep1Valid
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/30'
                  : 'bg-slate-900 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Configuração */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl text-blue-400 font-medium">Configuração</h3>
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Intervalo de Verificação
            </label>
            <select
              value={formData.interval}
              onChange={(e) => handleInputChange('interval', e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="1">1 minuto</option>
              <option value="5">5 minutos</option>
              <option value="10">10 minutos</option>
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-900 text-white rounded font-medium transition-all duration-200"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!isStep2Valid}
              className={`
                px-6 py-3 rounded font-medium transition-all duration-200
                ${isStep2Valid
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/30'
                  : 'bg-slate-900 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmação */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl text-blue-400 font-medium">Confirmar Configuração</h3>
          </div>

          <div className="bg-slate-900/30 rounded p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-300">Nome:</span>
              <span className="text-white font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Tipo:</span>
              <span className="text-white font-medium">
                {monitoringTypes.find(t => t.id === formData.type)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Intervalo:</span>
              <span className="text-white font-medium">{formData.interval} minutos</span>
            </div>
            <div className="pt-2 border-t border-slate-600">
              <span className="text-slate-300">Descrição:</span>
              <p className="text-white mt-1">{formData.description}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-900 text-white rounded font-medium transition-all duration-200"
            >
              Voltar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded font-medium transition-all duration-200 shadow-lg hover:shadow-green-500/30"
            >
              Criar Serviço
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigService;