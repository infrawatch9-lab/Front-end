import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileNotificationsForm = ({ formData, handleInputChange }) => {
  return (
    <CustomDiv type="foreground" className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Notificações</h3>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.emailNotifications}
            onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Receber notificações por email</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.pushNotifications}
            onChange={(e) => handleInputChange("pushNotifications", e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Receber notificações push</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.smsNotifications}
            onChange={(e) => handleInputChange("smsNotifications", e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Receber notificações por SMS</span>
        </label>
      </div>
    </CustomDiv>
  );
};

export default ProfileNotificationsForm;
