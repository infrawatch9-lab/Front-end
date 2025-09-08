import { Mail, Phone, MapPin } from "lucide-react";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfilePersonalForm = ({ formData, handleInputChange }) => {
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Informações Pessoais
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={formData.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo
          </label>
          <input
            type="text"
            value={formData.role}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localização (opcional)
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Cidade, País, etc."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfilePersonalForm;
