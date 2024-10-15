import React, { useEffect, useState } from "react";
import CreateStaff from "./CreateStaff";
import CreateStudent from "./createStudent";
import ListStaff from "./listStaff";
import ListStudent from "./listStudent";
import Gastos from "./Gastos";
import CreateGroup from "./CreateGroup"; // Ajusta la ruta según sea necesario
import ListGroups from "./listGroups";
import StudentsTeacher from "./Teachers/StudentsTeacher";
import GroupsTeacher from "./Teachers/GroupsTeacher";
import ManageSubjects from "./manageSubjects"; // Ajusta la ruta según sea necesario
import { useSelector } from "react-redux";
import "../../css/home_institution.css";
import { useNavigate } from "react-router-dom";

function HomeInstitutionsForm() {
  const [changeComponent, setChangeComponent] = useState("");
  const [isDeployed, setIsDeployed] = useState(false);

  const NameInstitution = useSelector(
    (state) => state.infInstitution.nameInstitution
  );
  const InfInstitution = useSelector(
    (state) => state.infInstitution.imgInstitution
  );
  const userRole = useSelector((state) => state.infInstitution.role);
  const auth = useSelector((state) => state.infInstitution.auth);
  const navigate = useNavigate();

  const toggleAside = () => {
    setIsDeployed(!isDeployed);
  };

  useEffect(() => {
    // Verificar autenticación
    if (!sessionStorage.getItem("token") || auth !== true) {
      navigate("/error");
    }
  }, [auth, navigate]);

  const Logout = async () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("StudentID");
    sessionStorage.removeItem("persist:root");

    navigate("/login");
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
        <img src={InfInstitution} alt="" />
        <h2>{NameInstitution}</h2>
      </nav>

      <aside id="aside" className={isDeployed ? "desplegar" : ""}>
        <div className="container-svg">
          {userRole === "Teacher" || userRole === "Profesor" ? (
            <>
              <div onClick={() => setChangeComponent("teacherStudents")} className="inputBoton">
                <input type="radio" id="teacherStudents" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="teacherStudents">Estudiantes</label>
              </div>
              <div onClick={() => setChangeComponent("teacherGrupos")} className="inputBoton">
                <input type="radio" id="teacherGrupos" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="teacherGrupos">Grupos</label>
              </div>
              <div onClick={() => setChangeComponent("teacherNotas")} className="inputBoton">
                <input type="radio" id="teacherNotas" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="teacherNotas">Notas</label>
              </div>
            </>
          ) : (
            <>
              <div onClick={() => setChangeComponent("crear personal")} className="inputBoton">
                <input type="radio" id="crearPersonal" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="crearPersonal">Crear Personal</label>
              </div>
              <div onClick={() => setChangeComponent("crear estudiante")} className="inputBoton">
                <input type="radio" id="crearEstudiante" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="crearEstudiante">Crear Estudiante</label>
              </div>
              <div onClick={() => setChangeComponent("Crear Grupo")} className="inputBoton">
                <input type="radio" id="crearGrupo" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="crearGrupo">Crear Grupo</label>
              </div>
              <div onClick={() => setChangeComponent("materias")} className="inputBoton">
                <input type="radio" id="materias" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="materias">Crear Materias</label>
              </div>
              <div onClick={() => setChangeComponent("gastos")} className="inputBoton">
                <input type="radio" id="gastos" name="changeComponent" style={{ display: "none" }} />
                <label htmlFor="gastos">Gastos</label>
              </div>
            </>
          )}

          <div onClick={() => setChangeComponent("soporte de sistema")} className="inputBoton">
            <input type="radio" id="soporteSistema" name="changeComponent" style={{ display: "none" }} />
            <label htmlFor="soporteSistema">Soporte de Sistema</label>
          </div>
          <div onClick={Logout}>
            <input type="radio" id="cerrarSesion" name="changeComponent" style={{ display: "none" }} />
            <label htmlFor="cerrarSesion">Cerrar Sesión</label>
          </div>
        </div>

        <img
          src="https://static.vecteezy.com/system/resources/previews/009/126/808/non_2x/gui-logo-gui-letter-gui-letter-logo-design-initials-gui-logo-linked-with-circle-and-uppercase-monogram-logo-gui-typography-for-technology-business-and-real-estate-brand-vector.jpg"
          alt=""
        />
      </aside>

      <div className="div-components">
        <div className="div-components">
          {changeComponent === "crear personal" && <CreateStaff />}
          {changeComponent === "crear estudiante" && <CreateStudent />}
          {changeComponent === "profesor" && <ListStaff />}
          {changeComponent === "estudiante" && <ListStudent />}
          {changeComponent === "gastos" && <Gastos />}
          {changeComponent === "materias" && <ManageSubjects />}
          {changeComponent === "Crear Grupo" && <CreateGroup />}
          {changeComponent === "grupos" && <ListGroups />}
          {changeComponent === "teacherStudents" && <StudentsTeacher />}
          {changeComponent === "teacherGrupos" && <GroupsTeacher />}
        </div>
      </div>
    </div>
  );
}

export default HomeInstitutionsForm;
