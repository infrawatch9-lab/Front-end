import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../login/Login.css";
import AppLoader from "../components/AppLoader";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Validação básica de senha
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return t("reset_password.password_min_length", "A senha deve ter pelo menos 8 caracteres");
    }
    if (!hasUpperCase || !hasLowerCase) {
      return t("reset_password.password_case_requirement", "A senha deve conter letras maiúsculas e minúsculas");
    }
    if (!hasNumbers) {
      return t("reset_password.password_number_requirement", "A senha deve conter pelo menos um número");
    }
    if (!hasSpecialChar) {
      return t("reset_password.password_special_requirement", "A senha deve conter pelo menos um caractere especial");
    }
    return null;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validações
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t("reset_password.fill_all_fields", "Por favor, preencha todos os campos"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("reset_password.passwords_dont_match", "As senhas não coincidem"));
      return;
    }

    if (currentPassword === newPassword) {
      setError(t("reset_password.same_password", "A nova senha deve ser diferente da atual"));
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (passwordValidation) {
      setError(passwordValidation);
      return;
    }

    setSubmitting(true);

    try {
        
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(error.message || t("reset_password.error", "Erro ao alterar senha. Verifique sua senha atual."));
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center divimg">
      <div className="bg-white p-10 rounded-md shadow-md w-full max-w-sm content-login">
        {/* Header com botão voltar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <img
            src="/img/logo_white.png"
            alt="Logo"
            className="w-16 h-16"
          />
          <div className="w-5"></div> {/* Spacer para centralizar o logo */}
        </div>

        <h2 className="text-center text-[#ffffff] font-semibold text-xl mb-6">
          {t("reset_password.title", "Alterar Senha")}
        </h2>

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-sm text-center">
            {t("reset_password.success", "Senha alterada com sucesso!")}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* Senha Atual */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Lock size={16} />
            </span>
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={t("reset_password.current_password", "Senha Atual")}
              className="w-full pr-10 py-2 border border-gray-300 rounded-sm text-sm login-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Nova Senha */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Lock size={16} />
            </span>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t("reset_password.new_password", "Nova Senha")}
              className="w-full pr-10 py-2 border border-gray-300 rounded-sm text-sm login-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirmar Nova Senha */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Lock size={16} />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("reset_password.confirm_password", "Confirmar Nova Senha")}
              className="w-full pr-10 py-2 border border-gray-300 rounded-sm text-sm login-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Indicador de força da senha */}
          {newPassword && (
            <div className="space-y-2">
              <div className="text-xs text-gray-300">
                {t("reset_password.password_strength", "Força da senha:")}
              </div>
              <div className="flex space-x-1">
                <div className={`h-1 flex-1 rounded ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <div className={`h-1 flex-1 rounded ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <div className={`h-1 flex-1 rounded ${/\d/.test(newPassword) ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <div className={`h-1 flex-1 rounded ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              </div>
            </div>
          )}

          <button
            disabled={submitting || success}
            style={
              submitting || success
                ? {
                    cursor: "not-allowed",
                    transform: "initial",
                    backgroundColor: "silver",
                  }
                : {}
            }
            type="submit"
            className="w-full bg-[#080F2A] py-2 rounded-sm text-sm font-semibold button-login"
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <AppLoader size={15} />
                <span className="ml-2">{t("reset_password.updating", "Atualizando...")}</span>
              </div>
            ) : success ? (
              t("reset_password.success", "Senha Alterada!")
            ) : (
              t("reset_password.submit", "Alterar Senha")
            )}
          </button>

          {/* Requisitos da senha */}
          <div className="mt-4 text-xs text-gray-400 space-y-1">
            <p>{t("reset_password.requirements", "A senha deve conter:")}</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>{t("reset_password.req_length", "Pelo menos 8 caracteres")}</li>
              <li>{t("reset_password.req_case", "Letras maiúsculas e minúsculas")}</li>
              <li>{t("reset_password.req_number", "Pelo menos um número")}</li>
              <li>{t("reset_password.req_special", "Pelo menos um caractere especial")}</li>
            </ul>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={goBack}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t("reset_password.back_to_login", "Voltar ao login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
