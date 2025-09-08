import CustomDiv from "../components/CustomComponents/CustomDiv";
import { useUserPermissions } from "../hooks/useUserPermissions";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { User, Lock, Bell, Settings } from "lucide-react";

import ProfileHeader from "../components/editprofile_components/ProfileHeader";
import ProfileTabs from "../components/editprofile_components/ProfileTabs";
import ProfilePersonalForm from "../components/editprofile_components/ProfilePersonalForm";
import ProfileSecurityForm from "../components/editprofile_components/ProfileSecurityForm";
import ProfileNotificationsForm from "../components/editprofile_components/ProfileNotificationsForm";
import ProfilePreferencesForm from "../components/editprofile_components/ProfilePreferencesForm";
import ProfileActions from "../components/editprofile_components/ProfileActions";
import { apiGetUserProfile } from "../api/users/getUserProfile";
import { useEffect } from "react";

const EditProfile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { userProfile, loading } = useUserPermissions();
  const [userInfo, setUserInfo] = useState(() => {
    const cached = localStorage.getItem("userProfileCache");
    return cached ? JSON.parse(cached) : null;
  });
  const getProfile = async () => {
    try {
      const profile = await apiGetUserProfile();
      console.log("Fetched user profile:", profile);
      setUserInfo(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);
  const [formData, setFormData] = useState({
    firstName: userInfo?.name || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    phone: userInfo?.number || "",
    company: userInfo?.company || "",
    position: userInfo?.role || "",
    department: userInfo?.department || "",
    location: userProfile?.location || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: userProfile?.emailNotifications ?? true,
    pushNotifications: userProfile?.pushNotifications ?? false,
    smsNotifications: userProfile?.smsNotifications ?? false,
  });

  const [formData_, setFormData_] = useState({
    firstName: "Orisa",
    lastName: "Ebo",
    email: "orisa@example.com",
    phone: "+244 900 000 000",
    company: "42 Luanda",
    position: "Estudante",
    department: "Inovação",
    location: "Luanda, Angola",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    language: "pt",
    theme: "light",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: "personal", label: t('profile.tabs.personal'), icon: User },
    { id: "security", label: t('profile.tabs.security'), icon: Lock },
    { id: "notifications", label: t('profile.tabs.notifications'), icon: Bell },
    { id: "preferences", label: t('profile.tabs.preferences'), icon: Settings },
  ];

  return (
    <CustomDiv type="background" className="min-h-screen mx-auto px-4 py-8">
      <ProfileHeader profileImage={profileImage} formData={formData} onImageUpload={handleImageUpload} />
      <ProfileTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <form className="rounded shadow-sm">
        {activeTab === "personal" && <ProfilePersonalForm formData={formData} handleInputChange={handleInputChange} />}
        {activeTab === "security" && (
          <ProfileSecurityForm
            formData={formData}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
        {activeTab === "notifications" && (
          <ProfileNotificationsForm formData={formData} handleInputChange={handleInputChange} />
        )}
        {activeTab === "preferences" && (
          <ProfilePreferencesForm formData={formData} handleInputChange={handleInputChange} />
        )}

        <ProfileActions />
      </form>
    </CustomDiv>
  );
};

export default EditProfile;
