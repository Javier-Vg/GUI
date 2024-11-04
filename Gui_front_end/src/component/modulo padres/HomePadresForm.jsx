
import React, { useState, useEffect } from "react";
import ExpedienteAlumno from "./ExpedienteAlumno";
import Chat from "./Chat";
import CalificacionesEstudiante from "./CalificacionesEstudiante";
import { useSelector } from "react-redux";
import ScrollIndicator from "../../component/modulo padres/messageScroll";
import ThemeSwitcher from "../../component/modulo padres/changeTheme/ChangeTheme";
import { useNavigate } from "react-router-dom";
import "../../css/ModuloPadres/HomePadresForm.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function HomePadresForm() {
  const [changeComponent, setChangeComponent] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const [imgStudent, setimgStudent] = useState(null);
  const [username, setusername] = useState(null);

  useEffect(() => {
    // Obtener la cookie "AuthCookie"
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        // Decodificar el token
        const decodedToken = jwtDecode(token);
        setTokenData(decodedToken);
        setimgStudent(decodedToken.info.imgInstitution);
        setusername(decodedToken.info.username);
      } catch (error) {
        console.error("Error al decodificar el token");
      }
    } else {
      console.warn("No se encontró la cookie AuthCookie");
    }
  }, []);

  const [isDeployed, setIsDeployed] = useState(false);
  const NameInstitution = useSelector(
    (state) => state.infInstitution.nameInstitution
  );
  const InfInstitution = useSelector(
    (state) => state.infInstitution.imgInstitution
  );
  // Manejador de eventos para alternar el estado
  const toggleAside = () => {
    setIsDeployed(!isDeployed);
  };

  const navigate = useNavigate();
  // Cambiar el tema basado en la preferencia del usuario
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const logout = async () => {
    Cookies.remove("AuthCookie");
    navigate("/");
  };

  return (
    <div>
      <ScrollIndicator />
      <div className="padresh-core">
        <head>
          <link
            href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            rel="stylesheet"
          />
        </head>

        <nav className="padresh-nav">
          <button className="padresh-open-close-button" onClick={toggleAside}>
            <span className="padresh-open-close-icon">
            <i className="bx bx-menu" style={{ color: 'black' }}></i>
            </span>
          </button>

          <div className="padresh-institution-info">
            <img
              src={imgStudent}
              alt="Institution"
              className="padresh-institution-img"
            />
            <h2 className="padresh-institution-name">{username}</h2>
          </div>

          <div
            onClick={toggleTheme}
            className={`theme-switcher ${isDarkMode ? "dark-mode" : "light-mode"}`}
          >
            <ThemeSwitcher />
          </div>
        </nav>

        <aside id="aside" className={isDeployed ? "desplegar" : ""}>
          <div className="padresh-aside-container">
            <div
              className="padresh-aside-button"
              onClick={() => setChangeComponent("Expediente de Alumno")}
            >
              <input
                type="radio"
                value="Expediente de Alumno"
                id="ExpedienteDeAlumno"
                name="changeComponent"
                style={{ display: "none" }}
              />
              <label
                className="padresh-aside-label"
                htmlFor="ExpedienteDeAlumno"
              >
                Expediente de Alumno
              </label>
            </div>

            <div
              className="padresh-aside-button"
              onClick={() => setChangeComponent("Comunicacion")}
            >
              <input
                type="radio"
                value="Comunicacion"
                id="Comunicacion"
                name="changeComponent"
                style={{ display: "none" }}
              />
              <label className="padresh-aside-label" htmlFor="Comunicacion">
                Comunicación
              </label>
            </div>

            <div
              className="padresh-aside-button"
              onClick={() => setChangeComponent("Calificacion del Estudiante")}
            >
              <input
                type="radio"
                value="Calificaciones del Estudiante"
                id="CalificacionDelEstudiante"
                name="changeComponent"
                style={{ display: "none" }}
              />
              <label
                className="padresh-aside-label"
                htmlFor="CalificacionDelEstudiante"
              >
                Calificación del Estudiante
              </label>
            </div>
            <input
              type="button"
              value="Cerrar Sesión"
              onClick={logout}
              className="padresh-logout-button"
            />
          </div>
        </aside>

        {/* <div className="padresh-components"> */}
        <div className="div-components">
            {changeComponent === "Expediente de Alumno" && <ExpedienteAlumno />}
            {changeComponent === "Comunicacion" && <Chat />}
            {changeComponent === "Calificacion del Estudiante" && <CalificacionesEstudiante />}
            {/* {changeComponent === "Estado de Cuenta" && <ExpedienteAlumno />} */}
          </div>
      </div>
    </div>
  );
}

export default HomePadresForm;
