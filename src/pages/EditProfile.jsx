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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { userProfile, loading, updateUserProfile } = useUserPermissions();
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
  };

  useEffect(() => {
    getProfile();
  }, []);
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    number: userInfo?.number || "",
    role: userInfo?.role || "",
    location: userInfo?.location || "", // localização opcional
  });

  // formData_ removido

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
      <ProfileHeader
        profileImage={profileImage}
        formData={formData}
        onImageUpload={handleImageUpload}
      />
      <ProfileTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Mensagem de feedback */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-900 border-green-600 text-green-300"
              : "bg-red-900 border-red-600 text-red-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{message.text}</span>
            <button
              type="button"
              onClick={() => setMessage({ type: "", text: "" })}
              className="text-current hover:opacity-70"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form
        className="rounded shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          if (isSubmitting) return; // Previne múltiplos submits
          
          setIsSubmitting(true);
          setMessage({ type: "", text: "" });
          
          try {
            const { apiUpdateUser } = await import("../api/users/updateUser");
            await apiUpdateUser(formData);
            setMessage({ 
              type: "success", 
              text: "Perfil atualizado com sucesso!" 
            });
            // Atualizar o cache local usando o hook
            updateUserProfile(formData);
            // Atualizar também o userInfo local
            setUserInfo(prev => ({ ...prev, ...formData }));
          } catch (err) {
            setMessage({ 
              type: "error", 
              text: err.message || "Erro ao atualizar perfil" 
            });
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {activeTab === "personal" && (
          <ProfilePersonalForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {activeTab === "security" && (
          <ProfileSecurityForm
            formData={formData}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
        {activeTab === "notifications" && (
          <ProfileNotificationsForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {activeTab === "preferences" && (
          <ProfilePreferencesForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}

        <ProfileActions isSubmitting={isSubmitting} />
      </form>
    </CustomDiv>
  );
};

export default EditProfile;
