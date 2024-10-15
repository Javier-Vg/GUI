import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInstitutionInfo } from '../../Redux/Slices/SliceInfInstitution';
import { setStaffId, setInstitutionId } from '../../Redux/Slices/IdSlice';
import { useNavigate } from "react-router-dom";
import LoginProfesor from "./LoginProfesor";
import LoginFormGui from '../Login_and_Register_Gui/LoginFormGui';
import LoginPadres from "./LoginPadres";
import "../../css/Eleccion_login.css";
import axios from "axios";

function ElecionLogin() {
  const [changeComponent, setChangeComponent] = useState('personal');
  const [message, setMessage] = useState(""); 

  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const domain = window.location.hostname;

  // Mapeo de componentes y sus rutas/endpoint
  const componentMap = {
    gui: { component: <LoginFormGui />, endpoint: `http://${domain}:8000/api/gui/login/`, redirect: "/gui_home" },
    personal: { component: <LoginProfesor />, endpoint: `http://${domain}:8000/api/staff/login/`, redirect: "/institutions" },
    parents: { component: <LoginPadres />, endpoint: `http://${domain}:8000/api/students/login/`, redirect: "/home_padres" }
  };

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

    const { endpoint, redirect } = componentMap[changeComponent] || {};

    if (!endpoint) {
      setMessage("Rol no válido");
      return;
    }

    try {
      const response = await axios.post(endpoint, { username, password }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        dispatch(setInstitutionInfo({
          imgInstitution: response.data.imgInstitution,
          nameInstitution: response.data.Name,
          role: response.data.rol,
          auth: response.data.auth,
        }));
        dispatch(setStaffId(response.data.staff_id));
        dispatch(setInstitutionId(response.data.institution));
        sessionStorage.setItem("StudentID", response.data.estudiante); 
        sessionStorage.setItem("token", response.data.token);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token });
        setMessage("Login exitoso");

        // Redirigir según el rol seleccionado
        setTimeout(() => navigate(redirect), 1000);
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
          {Object.keys(componentMap).map((role) => (
            <div key={role} onClick={() => setChangeComponent(role)}>
              {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitaliza el nombre del rol */}
            </div>
          ))}
        </div>

        <div className="grid-login">
          {componentMap[changeComponent]?.component}
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
