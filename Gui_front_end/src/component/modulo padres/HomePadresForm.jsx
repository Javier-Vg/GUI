import React, { useState, useEffect } from "react";
import ExpedienteAlumno from "./ExpedienteAlumno";
import Chat from "./Chat";
import CalificacionesEstudiante from "./CalificacionesEstudiante";
import "../../css/Institutions/HomeInstitutionsForm.css";
import { useSelector, useDispatch } from "react-redux";
import ScrollIndicator from "../../component/modulo padres/messageScroll";
import ThemeSwitcher from "../../component/modulo padres/changeTheme/ChangeTheme";
import ListaEventos from "../moduloProfesor/listaEventos";

function HomePadresForm() {
  const [changeComponent, setChangeComponent] = useState("");

  // Definir el estado para controlar el despliegue del aside
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

  // Cambiar el tema basado en la preferencia del usuario
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div>
      <ScrollIndicator/>
      <div className="div-core-father">
        <head>
          <link
            href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            rel="stylesheet"
          />
        </head>

        <nav>
          <button id="open-close" onClick={toggleAside}>
            <span id="open-close">
              <i className="bx bx-menu"></i>
            </span>
          </button>
          <img src={InfInstitution} alt="" />
          <h2>{NameInstitution}</h2>

          {/* ahhhhhhh */}
          <ThemeSwitcher/>
        </nav>
        
        <aside id="aside" className={isDeployed ? "desplegar" : ""}>
          <div className="container-svg">
          <div 
          className="inputBoton"
          onClick={() => setChangeComponent("Estado de Cuenta")}
          >
              <input
                type="radio"
                value="Estado de Cuenta"
                className="inputBoton"
                style={{ display: "none" }}
              />
              <label className="label-home-inst"  htmlFor="Estado de Cuenta">Estado de Cuenta</label>

            </div>
            <div 
            className="inputBoton"
            onClick={() => setChangeComponent("Expediente de Alumno")}
            >
              <input
                type="radio"
                value="Expediente de Alumno"
                id="Expediente de Alumno"
                name="changeComponent"
                style={{ display: "none" }}
              />

              <label className="label-home-inst"  htmlFor="Expediente de Alumno">Expediente de Alumno</label>
            </div>

            <div 
            className="inputBoton"
            onClick={() => setChangeComponent("Comunicacion")}
            >
              <input
                type="radio"
                value="Comunicacion"
                id="Comunicacion"
                name="changeComponent"
                style={{ display: "none" }}
         
              />
              <label className="label-home-inst"  htmlFor="comunicacion">Comunicacion</label>
            </div>
            
            <div 
            className="inputBoton"
            onClick={() =>
              setChangeComponent("Calificacion del Estudiante")
            }>
              <input
                type="radio"
                value="Calificaciones del Estudiante"
                id="Calificacion del Estudiante"
                name="changeComponent"
                style={{ display: "none" }}
              />
              <label className="label-home-inst"  htmlFor="Calificacion del Estudiante">Calificacion del Estudiante</label>
            </div>
          </div>
        </aside>
       
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

