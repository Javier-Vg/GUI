import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección
import RegisterFormGui from "../component/Login_and_Register_Gui/RegisterFormGui";
import Institucion_register from "../component/Gui/Institucion_register";
import List_institutions from "../component/Gui/List_institutions";
import "../css/Gui_list_institutions.css";

function Home_Gui() {
  const [changeComponent, setChangeComponent] = useState("");
  const [isDeployed, setIsDeployed] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook para redirección

  useEffect(() => {
    // Verifica si hay un token en el local storage
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirige a la página de inicio de sesión
      navigate("/gui"); // Cambia "/login" a la ruta de tu página de inicio de sesión
    }
  }, [navigate]);

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
      </aside>

      <div className="div-components">
        {/* Cambia los componentes dependiendo del estado */}
        {changeComponent === "Registrar Admin" && <RegisterFormGui />}
        {changeComponent === "Crear Instituciones" && <Institucion_register />}
        {changeComponent === "Gestionar Instituciones" && <List_institutions />}
      </div>
    </div>
  );
}

export default Home_Gui;
