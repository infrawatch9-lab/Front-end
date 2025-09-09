import { useTheme } from "../../hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileActions = ({ isSubmitting = false }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <button
        type="button"
        disabled={isSubmitting}
        className={`px-4 py-2 border rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === "dark" ? "bg-slate-600 border-slate-500 text-slate-300 hover:bg-slate-700" : "bg-gray-50 border-gray-300 text-white-700 hover:bg-gray-200"}`}
      >
        {t('button.cancel')}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {isSubmitting && (
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span>
          {isSubmitting ? t('button.saving') || 'Salvando...' : t('profile.save_changes')}
        </span>
      </button>
    </div>
  );
};

export default ProfileActions;
