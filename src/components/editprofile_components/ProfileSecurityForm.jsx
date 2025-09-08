import { Eye, EyeOff, Lock, Trash2 } from "lucide-react";
import { useTheme } from "../../hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileSecurityForm = ({ formData, handleInputChange, showPassword, setShowPassword }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.security_settings')}</h3>
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.current_password')}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleInputChange("currentPassword", e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder={t('profile.current_password_placeholder')}
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
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.new_password')}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder={t('profile.new_password_placeholder')}
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.confirm_password')}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder={t('profile.confirm_password_placeholder')}
            />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">{t('profile.danger_zone')}</h4>
          <p className="text-sm text-red-600 mb-3">{t('profile.danger_warning')}</p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>{t('profile.delete_account')}</span>
          </button>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfileSecurityForm;
