import { useTheme } from "../../hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileActions = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <button
        type="button"
        className={`px-4 py-2 border rounded transition-colors ${theme === "dark" ? "bg-slate-600 border-slate-500 text-slate-300 hover:bg-slate-700" : "bg-gray-50 border-gray-300 text-white-700 hover:bg-gray-200"}`}
      >
        {t('button.cancel')}
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {t('profile.save_changes')}
      </button>
    </div>
  );
};

export default ProfileActions;
