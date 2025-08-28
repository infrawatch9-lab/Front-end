import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { apiLogin } from "../api/users/login";
import {
  ClipLoader,
  CircleLoader,
  BeatLoader,
  ScaleLoader,
  BounceLoader,
} from "react-spinners";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    console.log("Login com", username, password);
    try {
      await apiLogin({ email: username, password });
      if (apiLogin) setSubmiting(false);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setError(true);
      // Optionally, you can add a message state to display the error message
      // setMessage(error.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center divimg">
      <div className="bg-white p-10 rounded-md shadow-md w-full max-w-sm content-login">
        <img
          src="/img/logo_white.png"
          alt="Logo"
          className="w-20 h-20 mx-auto"
        />
        <h2 className="text-center text-[#ffffff] font-semibold text-xl mb-6">
          Bem-vindo
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <i className="fas fa-user" />
            </span>
            <input
              onClick={() => setError(false)}
              style={error ? { borderBottom: "1px solid red" } : {}}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username ou E-mail"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm text-sm  login-input"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <i className="fas fa-lock" />
            </span>
            <input
              onClick={() => setError(false)}
              style={error ? { borderBottom: "1px solid red" } : {}}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-sm text-sm  login-input"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              />
            </span>
          </div>

          <button
            disabled={submiting}
            style={
              submiting
                ? {
                    cursor: "not-allowed",
                    transform: "initial",
                    backgroundColor: "silver",
                  }
                : {}
            }
            type="submit"
            className={`w-full bg-[#080F2A]  py-2 rounded-sm text-sm font-semibold button-login `}
          >
            {submiting ? (
              <BounceLoader color="#010E37" size={15} />
            ) : (
              "Iniciar sessão"
            )}
          </button>

          <div className="text-center mt-2">
            <a style={{ color: "dimgray" }}>Esqueceu a senha?</a>
            <a
              style={{ color: "#ffffff", fontWeight: "bold" }}
              href="#"
              className="ml-2 text-base  hover:underline"
            >
              Recuperar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
