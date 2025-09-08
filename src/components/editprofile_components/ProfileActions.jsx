import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileActions = () => {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <button
        type="button"
        className="bg-gray-50 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Salvar Alterações
      </button>
    </div>
  );
};

export default ProfileActions;
