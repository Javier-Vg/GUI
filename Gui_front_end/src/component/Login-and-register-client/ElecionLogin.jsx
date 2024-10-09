import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import LoginProfesor from "./LoginProfesor";

import LoginInstitucion from "./LoginInstitucion";
import LoginPadres from "./LoginPadres";

import "../../css/Eleccion_login.css";
import axios from "axios";

function ElecionLogin() {
  const [changeComponent, setChangeComponent] = useState("Institución");
  const [message, setMessage] = useState("ㅤㅤㅤㅤㅤㅤ"); 

  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const domain = window.location.hostname;

  // Validación de los campos
  const validateInputs = () => {
    if (!username.trim() || !password.trim()) {
      setMessage("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    // Definir la URL en función del componente seleccionado
    let redirectRoute;
    let apiEndpoint;
    switch (changeComponent) {
      case "Institución":
        apiEndpoint = `http://${domain}:8000/api/institutions/login/`;
        redirectRoute = "/institutions"; 
        break;
      case "Profesor":
        apiEndpoint = `http://${domain}:8000/api/staff/login`; // Cambia este endpoint según tu backend
        redirectRoute = "/institutions"; // Redirigir a la página de profesores
        break;
      case "Padre":
        apiEndpoint = `http://${domain}:8000/api/students/login/`; // Cambia este endpoint según tu backend
        redirectRoute = "/home_padres"; // Redirigir a la página de padres
        break;
      default:
        setMessage("Rol no válido");
        return;
    }
  
    try {
      const response = await axios.post(
        apiEndpoint,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.token) {
        // Almacenar el token y el id de la institución en localStorage
        localStorage.setItem("InstitutionID", response.data.institution);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token });
        setMessage("Login exitoso");
        // Redirigir según el rol seleccionado
        setTimeout(() => {
          navigate(redirectRoute);
        }, 1000);
      }
    } catch (error) {
      setMessage("Credenciales inválidas");
      setTimeout(() => setMessage(""), 5000);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="flex-options">
          <div onClick={() => setChangeComponent("Institución")}>Institución</div>
          <div onClick={() => setChangeComponent("Profesor")}>Profesor</div>
          <div onClick={() => setChangeComponent("Padre")}>Padre</div>
        </div>

        <div className="grid-login">
          {changeComponent === "Profesor" && <LoginProfesor />}
          {changeComponent === "Institución" && <LoginInstitucion />}
          {changeComponent === "Padre" && <LoginPadres />}
        </div>
        <div className="input-msg">
          <div className="div-inp-1">{message && <p>{message}</p>}</div>
          <div className="div-inp-2">
            <button onClick={handleSubmit} className="btn-login" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElecionLogin;

