import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiValidateOtp, apiSendOtp } from "../api/users/otp";
import { apiResetPassword, apiResetPasswordWithOtp } from "../api/users/reset_password";
import "../login/Login.css";
import AppLoader from "./AppLoader";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  // Hooks
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Estados
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset password
  const [isForced, setIsForced] = useState(false);
  
  useEffect(() => {
    // Verificar se é reset obrigatório (senha temporária)
    const urlParams = new URLSearchParams(window.location.search);
    const forced = urlParams.get('forced') === 'true';
    
    if (forced) {
      setIsForced(true);
      setStep(3); // Ir direto para reset password
      
      // Verificar se usuário tem senha temporária
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.isTemporaryPassword) {
        navigate('/admin');
      }
    } else {
      setIsForced(false);
      setStep(1); // Começar com email
    }
  }, [navigate]);

  // Step 1: Enviar OTP por email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError(t("reset_password.invalid_email", "Por favor, insira um email válido"));
      setSubmitting(false);
      return;
    }

    try {
      // Chamada para API enviar OTP
      const message = await apiSendOtp({ email });
      setSuccess(message || t("reset_password.otp_sent", "Código enviado para seu email!"));
      setStep(2); // Avançar para validação do OTP
    } catch (error) {
      setError(error.message || t("reset_password.network_error", "Erro de rede. Tente novamente."));
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Validar OTP
  const handleValidateOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!otp || otp.length !== 6) {
      setError(t("reset_password.invalid_otp", "Digite o código de 6 dígitos"));
      setSubmitting(false);
      return;
    }

    try {
      // Chamada para API validar OTP
      const message = await apiValidateOtp({ email, otp });
      setSuccess(message || t("reset_password.otp_valid", "Código validado! Defina sua nova senha."));
      setStep(3); // Avançar para reset de senha
    } catch (error) {
      setError(error.message || t("reset_password.network_error", "Erro de rede. Tente novamente."));
    } finally {
      setSubmitting(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Validações
    if (isForced) {
      // Reset obrigatório - precisa da senha atual
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError(t("reset_password.fill_all_fields", "Por favor, preencha todos os campos"));
        setSubmitting(false);
        return;
      }
      if (currentPassword === newPassword) {
        setError(t("reset_password.same_password", "A nova senha deve ser diferente da atual"));
        setSubmitting(false);
        return;
      }
      if (confirmPassword !== newPassword) {
        setError(t("reset_password.passwords_dont_match", "As senhas não coincidem"));
        setSubmitting(false);
        return; 
      }
    } else {
      // Reset por OTP - não precisa senha atual
      if (!newPassword || !confirmPassword) {
        setError(t("reset_password.fill_password_fields", "Por favor, preencha os campos de senha"));
        setSubmitting(false);
        return;
      }
    }

    if (newPassword !== confirmPassword) {
      setError(t("reset_password.passwords_dont_match", "As senhas não coincidem"));
      setSubmitting(false);
      return;
    }

    // Validar força da senha
    const passwordValidation = validatePassword(newPassword);
    if (passwordValidation) {
      setError(passwordValidation);
      setSubmitting(false);
      return;
    }

    try {
      if (isForced) {
        // Reset obrigatório com senha atual
        const message = await apiResetPassword({ currentPassword, newPassword });
        
        // Atualizar dados do usuário
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.isTemporaryPassword = false;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('needsPasswordReset');
        
        setSuccess(message || t("reset_password.success", "Senha alterada com sucesso!"));
        
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        // ja nao preciso do email e otp
        const message = await apiResetPasswordWithOtp({ email, otp, newPassword });
        setSuccess(message || t("reset_password.success", "Senha alterada com sucesso!"));
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError(error.message || t("reset_password.network_error", "Erro de rede. Tente novamente."));
    } finally {
      setSubmitting(false);
    }
  };

  const validatePassword = (password) => {
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

  const goBack = () => {
    if (isForced) {
      alert(t("reset_password.mandatory_warning", "A alteração de senha é obrigatória"));
      return;
    }
    
    if (step === 1) {
      navigate("/login");
    } else if (step === 2) {
      setStep(1);
    } else {
      setStep(2);
    }
  };

  const getTitle = () => {
    if (isForced) {
      return t("reset_password.mandatory_title", "Alteração de Senha Obrigatória");
    }
    
    switch (step) {
      case 1:
        return t("reset_password.forgot_password", "Esqueceu a Senha?");
      case 2:
        return t("reset_password.validate_code", "Validar Código");
      case 3:
        return t("reset_password.new_password_title", "Nova Senha");
      default:
        return t("reset_password.title", "Alterar Senha");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center divimg">
      <div className="bg-white p-10 rounded-md shadow-md w-full max-w-sm content-login">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!isForced && (
            <button
              onClick={goBack}
              className="text-white hover:text-gray-300 transition-colors"
              disabled={submitting}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <img
            src="/img/logo_white.png"
            alt="Logo"
            className="w-16 h-16"
          />
          <div className="w-5"></div>
        </div>

        <h2 className="text-center text-[#ffffff] font-semibold text-xl mb-6">
          {getTitle()}
        </h2>

        {/* Mensagens de aviso */}
        {isForced && (
          <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded">
            <p className="text-yellow-400 text-xs text-center">
              {t("reset_password.mandatory_message", "Você deve alterar sua senha temporária antes de continuar.")}
            </p>
          </div>
        )}

        {!isForced && step === 1 && (
          <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded">
            <p className="text-blue-400 text-xs text-center">
              {t("reset_password.email_instruction", "Digite seu email para receber o código de recuperação.")}
            </p>
          </div>
        )}

        {!isForced && step === 2 && (
          <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded">
            <p className="text-blue-400 text-xs text-center">
              {t("reset_password.otp_instruction", "Digite o código de 6 dígitos enviado para seu email.")}
            </p>
          </div>
        )}

        {/* Mensagens de sucesso e erro */}
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-sm text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <i className="fas fa-envelope" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("reset_password.email_placeholder", "Digite seu email")}
                className="w-full pr-3 py-2 border border-gray-300 rounded-sm text-sm login-input"
                required
                disabled={submitting}
              />
            </div>

            <button
              disabled={submitting}
              type="submit"
              className="w-full bg-[#080F2A] py-2 rounded-sm text-sm font-semibold button-login"
              style={submitting ? { cursor: "not-allowed", backgroundColor: "silver" } : {}}
            >
              {submitting ? <AppLoader size={15} /> : t("reset_password.send_code", "Enviar Código")}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleValidateOTP} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <i className="fas fa-key" />
              </span>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder={t("reset_password.otp_placeholder", "Código de 6 dígitos")}
                className="w-full pr-3 py-2 border border-gray-300 rounded-sm text-sm login-input text-center tracking-widest"
                required
                disabled={submitting}
                maxLength="6"
              />
            </div>

            <button
              disabled={submitting}
              type="submit"
              className="w-full bg-[#080F2A] py-2 rounded-sm text-sm font-semibold button-login"
              style={submitting ? { cursor: "not-allowed", backgroundColor: "silver" } : {}}
            >
              {submitting ? <AppLoader size={15} /> : t("reset_password.validate_otp", "Validar Código")}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white text-sm hover:underline"
                disabled={submitting}
              >
                {t("reset_password.resend_code", "Reenviar código")}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Senha Atual (apenas para reset obrigatório) */}
            {isForced && (
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
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors"
                  disabled={submitting}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

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
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors"
                disabled={submitting}
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
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors"
                disabled={submitting}
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
                <div className="text-xs text-gray-400 space-y-1">
                  <p>{t("reset_password.requirements", "Requisitos da senha:")}</p>
                  <p className={newPassword.length >= 8 ? 'text-green-400' : 'text-red-400'}>
                    • {t("reset_password.req_length", "Pelo menos 8 caracteres")}
                  </p>
                  <p className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'text-green-400' : 'text-red-400'}>
                    • {t("reset_password.req_case", "Letras maiúsculas e minúsculas")}
                  </p>
                  <p className={/\d/.test(newPassword) ? 'text-green-400' : 'text-red-400'}>
                    • {t("reset_password.req_number", "Pelo menos um número")}
                  </p>
                  <p className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'text-green-400' : 'text-red-400'}>
                    • {t("reset_password.req_special", "Pelo menos um caractere especial")}
                  </p>
                </div>
              </div>
            )}

            <button
              disabled={submitting}
              type="submit"
              className="w-full bg-[#080F2A] py-2 rounded-sm text-sm font-semibold button-login"
              style={submitting ? { cursor: "not-allowed", backgroundColor: "silver" } : {}}
            >
              {submitting ? <AppLoader size={15} /> : t("reset_password.change_password", "Alterar Senha")}
            </button>
          </form>
        )}

        {/* Link para voltar ao login */}
        {!isForced && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-gray-400 hover:text-white text-sm hover:underline"
              disabled={submitting}
            >
              {t("reset_password.back_to_login", "Voltar ao login")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
