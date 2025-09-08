import CustomDiv from "../CustomComponents/CustomDiv";

const ProfilePreferencesForm = ({ formData, handleInputChange }) => {
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferências</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
          <select
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
            <option value="fr">Francês</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
          <select
            value={formData.theme}
            onChange={(e) => handleInputChange("theme", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="system">Sistema</option>
          </select>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfilePreferencesForm;
