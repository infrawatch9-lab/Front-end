import { useTheme } from "../../hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfilePreferencesForm = ({ formData, handleInputChange }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.preferences')}</h3>
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.language')}</label>
          <select
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="pt">{t('profile.language_pt')}</option>
            <option value="en">{t('profile.language_en')}</option>
            <option value="fr">{t('profile.language_fr')}</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.theme')}</label>
          <select
            value={formData.theme}
            onChange={(e) => handleInputChange("theme", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">{t('profile.theme_light')}</option>
            <option value="dark">{t('profile.theme_dark')}</option>
            <option value="system">{t('profile.theme_system')}</option>
          </select>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfilePreferencesForm;
