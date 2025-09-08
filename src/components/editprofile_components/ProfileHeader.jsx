import { User, Camera } from "lucide-react";
import CustomDiv from "../CustomComponents/CustomDiv";

const ProfileHeader = ({ profileImage, formData, onImageUpload }) => {
  return (
    <CustomDiv type="foreground" className="rounded shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input type="file" accept="image/*" className="hidden" onChange={onImageUpload} />
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="text-gray-600">{formData.position} • {formData.company}</p>
          <p className="text-sm text-gray-500 mt-1">{formData.location}</p>
        </div>
      </div>
    </CustomDiv>
  );
};

export default ProfileHeader;
