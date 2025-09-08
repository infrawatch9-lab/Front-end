import { Mail, Phone, Building, MapPin } from "lucide-react";
import { useTheme } from "../../hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfilePersonalForm = ({ formData, handleInputChange }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.personal_info')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.first_name')}</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.last_name')}</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.email')}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.phone')}</label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.company')}</label>
          <div className="relative">
            <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.position')}</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.department')}</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.location')}</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfilePersonalForm;
