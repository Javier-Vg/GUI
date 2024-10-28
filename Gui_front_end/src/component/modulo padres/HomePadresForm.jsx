import React, { useState } from "react";
import ExpedienteAlumno from "./ExpedienteAlumno";
import Chat from "./Chat";
import CalificacionesEstudiante from "./CalificacionesEstudiante";
import "../../css/home_institution.css";
import { useSelector, useDispatch } from "react-redux";
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

  return (
    <div>
      <div>
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
        </nav>
        <aside id="aside" className={isDeployed ? "desplegar" : ""}>
          <div className="container-svg">
          <div>
              <input
                type="button"
                value="Estado de Cuenta"
                onClick={() => setChangeComponent("Estado de Cuenta")}
                className="inputBoton"
              />
            </div>
            <div>
              <input
                type="button"
                value="Expediente de Alumno"
                onClick={() => setChangeComponent("Expediente de Alumno")}
                className="inputBoton"
              />
            </div>
            <div>
              <input
                type="button"
                value="Comunicacion"
                onClick={() => setChangeComponent("Comunicacion")}
                className="inputBoton"
              />
            </div>
            
            <div>
              <input
                type="button"
                value="Calificaciones del Estudiante"
                onClick={() =>
                  setChangeComponent("Calificacion del Estudiante")
                }
                className="inputBoton"
              />
            </div>
          </div>
        </aside>
        <div className="div-components">
          <div className="div-components">
            {changeComponent === "Expediente de Alumno" && <ExpedienteAlumno />}
            {changeComponent === "Comunicacion" && <Chat />}
            {changeComponent === "Calificacion del Estudiante" && <CalificacionesEstudiante />}
            {/* {changeComponent === "Estado de Cuenta" && <ExpedienteAlumno />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePadresForm;
