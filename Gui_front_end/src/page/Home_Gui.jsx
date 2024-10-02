import React, { useState } from "react";
import RegisterFormGui from "../component/Login_and_Register_Gui/RegisterFormGui";
import Institucion_register from "../component/Gui/Institucion_register";
import List_institutions from "../component/Gui/List_institutions";
import "../css/Gui_list_institutions.css";

function Home_Gui() {
  const [changeComponent, setChangeComponent] = useState("");
  // Definir el estado para controlar el despliegue del aside
  const [isDeployed, setIsDeployed] = useState(false);

  const toggleAside = () => {
    setIsDeployed(!isDeployed);
  };
  return (
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
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/126/808/non_2x/gui-logo-gui-letter-gui-letter-logo-design-initials-gui-logo-linked-with-circle-and-uppercase-monogram-logo-gui-typography-for-technology-business-and-real-estate-brand-vector.jpg"
          alt=""
        />
        <h2>Nombre de la institucion</h2>
      </nav>
      <aside id="aside" className={isDeployed ? "desplegar" : ""}>
        <div className="container-svg">
          <div>
            <input
              type="button"
              value="Registrar Admin"
               className="inputBoton"
              onClick={() => setChangeComponent("Registrar Admin")}
            />
          </div>
          <div>
            <input
              type="button"
              value="Crear Instituciones"
               className="inputBoton"
              onClick={() => setChangeComponent("Crear Instituciones")}
            />
          </div>
          <div>
            <input
              type="button"
              value="Gestionar Instituciones"
              className="inputBoton"
              onClick={() => setChangeComponent("Gestionar Instituciones")}
            />
          </div>
        </div>
        {/* <div className="container-svg">
          <div>
            <input 
                        type="button" 
                        value="Estudiantes" 
                        onClick={() => setChangeComponent("estudiante")} 
                        className = "inputBoton"
                    />
          </div>
          <div>
            <input 
                    type="button" 
                    value="Grupos" 
                    onClick={() => setChangeComponent("grupos")} 
                    className = "inputBoton"
                />
          </div>
          <div>
            <input 
                        type="button" 
                        value="Gastos" 
                        onClick={() => setChangeComponent("gastos")} 
                        className = "inputBoton"
                    />
          </div>
          <div>
            <input 
                        type="button" 
                        value="Soporte de Sistema" 
                        onClick={() => setChangeComponent("soporte de sistema")} 
                        className = "inputBoton"
                    />
          </div>
          <div>
            <input 
                        type="button" 
                        value="Cerrar Sesión" 
                        onClick={() => setChangeComponent("cerrar sesión")} 
                        className = "inputBoton"
                    />
          </div>
          <div></div>
        </div>
        <div className="container-svg">
          <h2>etc</h2>
                <div>
                    
                    <span>YouTube Premium</span>
                </div>
                <div>
                    
                    <span>Videojuegos</span>
                </div>
                <div>
                    
                    <span>Directo</span>
                </div>
                <div>
                    <span>Aprendizaje</span>
                </div>
                <div>
                    <span>Deportes</span>
                </div>
        </div> */}
      </aside>

      <div className="div-components">
        {/* // cambia los componentes dependiendo de el estado */}
        {changeComponent === "Registrar Admin" && <RegisterFormGui />}
        {changeComponent === "Crear Instituciones" && <Institucion_register />}
        {changeComponent === "Gestionar Instituciones" && <List_institutions />}
      </div>
    </div>
  );
}

export default Home_Gui;
