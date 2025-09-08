import React, { useState } from "react";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

export default function CreateUserModal({ onClose, onCreate }) {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    number: "",
    email: "",
    role: "",
    tag: "",
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      // Validação básica do step 1
      if (userData.name && userData.number && userData.email) {
        setCurrentStep(2);
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFinish = () => {
    if (userData.role) {
      // Definir permissões padrão baseadas no role
      const defaultPermissions = {
        Admin: {
          dashboard: true,
          monitoring: true,
          reports: true,
          settings: true,
          users: true,
        },
        User: {
          dashboard: true,
          monitoring: true,
          reports: false,
          settings: false,
          users: false,
        },
        Viewer: {
          dashboard: true,
          monitoring: false,
          reports: false,
          settings: false,
          users: false,
        },
      };

      const newUser = {
        ...userData,
        permissions:
          defaultPermissions[userData.role] || defaultPermissions.Viewer,
      };

      onCreate(newUser);
    } else {
      alert("Por favor, selecione um papel para o usuário.");
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium">
          1
        </div>
        <h3 className={`font-medium text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>INFORMAÇÕES</h3>
        <div className="flex-1 h-px bg-slate-600"></div>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-slate-600 text-slate-400 rounded-full text-sm font-medium">
            2
          </div>
          <span className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>PAPEL</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
            Nome
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Como prefere ser chamado"
            className="w-full px-3 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
            Telefone
          </label>
          <input
            type="tel"
            value={userData.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
            placeholder="Digite seu número de WhatsApp"
            className="w-full px-3 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
            E-mail
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Digite seu e-mail"
            className="w-full px-3 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-medium">
            ✓
          </div>
          <span className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>INFORMAÇÕES</span>
        </div>
        <div className="flex-1 h-px bg-slate-600"></div>
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium">
          2
        </div>
        <h3 className={`font-medium text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>PAPEL</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
            PAPEL
          </label>
          <select
            value={userData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="w-full px-3 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="" className="bg-slate-900">
              Tipo de usuário
            </option>
            <option value="Admin" className="bg-slate-900">
              Administrador
            </option>
            <option value="User" className="bg-slate-900">
              Usuário
            </option>
            <option value="Viewer" className="bg-slate-900">
              Visualizador
            </option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>
            Tag
          </label>
          <input
            type="text"
            value={userData.tag}
            onChange={(e) => handleInputChange("tag", e.target.value)}
            placeholder="Digite uma tag"
            className="w-full px-3 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          VOLTAR
        </button>
        <button
          onClick={handleFinish}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          FINALIZAR
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <CustomDiv type="background" className="border border-slate-700 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-white-700'}`}>CRIAR USUÁRIO</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </CustomDiv>
    </div>
  );
}
