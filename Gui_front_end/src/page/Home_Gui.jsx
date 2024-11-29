import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección
import RegisterFormGui from "../component/Login_and_Register_Gui/RegisterFormGui";
import Institucion_register from "../component/Gui/Institucion_register";
import List_institutions from "../component/Gui/List_institutions";
import { useSelector } from "react-redux";
import "../css/page/Home_Gui.css";

function Home_Gui() {
  const [changeComponent, setChangeComponent] = useState("Registrar Admin");
  const [isDeployed, setIsDeployed] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook para redirección
  const userRole = useSelector((state) => state.infInstitution.role);

  const toggleAside = () => {
    setIsDeployed(!isDeployed);
  };

  const handleLogout = () => {
    // Borra el token de sessionStorage
    sessionStorage.removeItem("token");
    // Redirige a la página de inicio de sesión
    navigate("/login"); // Cambia "/login" a la ruta de tu página de inicio de sesión
  };

  return (
    <>
      <div>
        <div>
          <head>
            <link
              href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
              rel="stylesheet"
            />
          </head>

          <nav className="GuiHome-nav">
            <div className="GuiHome-nav-i1">
              <button id="GuiHome-open-close" onClick={toggleAside}>
                <span id="GuiHome-open-close-icon">
                  <i className="bx bx-menu" style={{ color: 'black' }}></i>
                </span>
              </button>
            </div>
            <div className="GuiHome-nav-i2">
              <h2 className="GuiHome-title">Gui Admins</h2>
            </div>
          </nav>

          <aside id="aside" className={isDeployed ? "desplegar" : ""}>
            <div className="GuiHome-container-svg">
              <div className="GuiHome-div-inpust">
                <input
                  autoComplete="off"
                  type="button"
                  value="Registrar Admin"
                  className="GuiHome-inputBoton"
                  onClick={() => setChangeComponent("Registrar Admin")}
                />
              </div>
              <div className="GuiHome-div-inpust">
                <input
                  autoComplete="off"
                  type="button"
                  value="Crear Instituciones"
                  className="GuiHome-inputBoton"
                  onClick={() => setChangeComponent("Crear Instituciones")}
                />
              </div>
              <div className="GuiHome-div-inpust">
                <input
                  autoComplete="off"
                  type="button"
                  value="Gestionar Instituciones"
                  className="GuiHome-inputBoton"
                  onClick={() => setChangeComponent("Gestionar Instituciones")}
                />
              </div>
              <div className="GuiHome-div-inpust">
                <input
                  autoComplete="off"
                  type="button"
                  value="Cerrar sesión"
                  className="GuiHome-inputBoton"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </aside>
        </div>

        <div className="div-components-gui-home">
          {changeComponent === "Registrar Admin" && <RegisterFormGui />}
          {changeComponent === "Crear Instituciones" && (
            <Institucion_register />
          )}
          {changeComponent === "Gestionar Instituciones" && (
            <List_institutions />
          )}
        </div>
      </div>
    </>
  );
}

export default Home_Gui;
