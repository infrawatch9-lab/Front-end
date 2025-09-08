import { Eye, EyeOff, Lock, Trash2 } from "lucide-react";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileSecurityForm = ({ formData, handleInputChange, showPassword, setShowPassword }) => {
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações de Segurança</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleInputChange("currentPassword", e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha atual"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua nova senha"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Confirme sua nova senha"
            />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">Zona de Perigo</h4>
          <p className="text-sm text-red-600 mb-3">Esta ação é irreversível e resultará na perda de todos os dados associados à sua conta.</p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Excluir Conta</span>
          </button>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfileSecurityForm;
