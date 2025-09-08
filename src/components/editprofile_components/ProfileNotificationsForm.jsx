import { useTheme } from "../../hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileNotificationsForm = ({ formData, handleInputChange }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.notifications')}</h3>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.emailNotifications}
            onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className={`ml-2 text-sm ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.email_notifications')}</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.pushNotifications}
            onChange={(e) => handleInputChange("pushNotifications", e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className={`ml-2 text-sm ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.push_notifications')}</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.smsNotifications}
            onChange={(e) => handleInputChange("smsNotifications", e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className={`ml-2 text-sm ${theme === "dark" ? "text-slate-300" : "text-white-700"}`}>{t('profile.sms_notifications')}</span>
        </label>
      </div>
    </CustomDiv>
  );
};

export default ProfileNotificationsForm;
