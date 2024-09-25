import React, { useState } from "react";
import RegisterFormGui from "../component/Login_and_Register_Gui/RegisterFormGui";
import Institucion_register from "../component/Gui/Institucion_register";
import List_institutions from "../component/Gui/List_institutions";
import "../css/Gui_list_institutions.css";

function Home_Gui() {
  const [changeComponent, setChangeComponent] = useState("");
  return (
    <div className="Gui">
      <div className="Menu">

        <div className="Sidebar">
          <input
            type="button"
            value="Registrar Admin"
            onClick={() => setChangeComponent("Registrar Admin")}
          />
          <input
            type="button"
            value="Crear Instituciones"
            onClick={() => setChangeComponent("Crear Instituciones")}
          />
          <input
            type="button"
            value="Gestionar Instituciones"
            onClick={() => setChangeComponent("Gestionar Instituciones")}
          />
        </div>
        <div>
          <div className="Nav"></div>
          <div className="div-componentes">
            {/* // cambia los componentes dependiendo de el estado */}
            {changeComponent === "Registrar Admin" && <RegisterFormGui />}
            {changeComponent === "Crear Instituciones" && (
              <Institucion_register />
            )}
            {changeComponent === "Gestionar Instituciones" && (
              <List_institutions />
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home_Gui;