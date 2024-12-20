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
import GradesTeacher from "./Teachers/GradesTeacher";
import ManageSubjects from "./manageSubjects"; // Ajusta la ruta según sea necesario
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../Redux/Slices/searchSlice";
import { useNavigate } from "react-router-dom";
import ChatProfesor from "../moduloProfesor/ChatProfesor";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Eventos from "./Eventos";
import ListaEventos from "../moduloProfesor/listaEventos";
import '../../css/Institutions/HomeInstitutionsForm.css'
import ScheduleForm from "./createSchedule";
import CreateContract from "./createContract";
function HomeInstitutionsForm() {
  const [changeComponent, setChangeComponent] = useState("profesor  ");
  const [isDeployed, setIsDeployed] = useState(false);

  const [NameInstitution,setNameInstitution]=useState(null);
  const [InfInstitution,setInfInstitution] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setRole] = useState(null);
  const [auth, setAuth] = useState(null);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Despacha la acción de búsqueda
  };
  const toggleAside  = () => {
    setIsDeployed(!isDeployed);
  };
  useEffect(() => {
    const token = Cookies.get('AuthCookie');

    if (!token) {
      // Redirigir inmediatamente si no hay token
      navigate("/error");
      return;
    }

    try {
      // Desencriptar el token
      const decodedToken = jwtDecode(token);

      // Extraer valores del token
      const auth = decodedToken.info?.auth;
      const rol = decodedToken.info?.rol;
      const nameInstitution = decodedToken.info?.username;
      const imgurl = decodedToken.info?.imgInstitution;
      
      // Setear valores si existen
      if (nameInstitution) setNameInstitution(nameInstitution);
      if (imgurl) setInfInstitution(imgurl);
      if (auth !== true) {
        navigate("/error");
      }

      setRole(rol);
      setAuth(auth);
    } catch (error) {
      console.error('Error al decodificar el token', error);
      navigate("/error");
    }
  }, [navigate]);

  //Lo lleva al login en caso de que cierre sesion.
  const Logout = async () => {
    navigate("/login");
  };

  return (
    <div>
     
      <nav className="navbar">
        {/* <button id="open-close" onClick={toggleAside}> */}
          <span id="open-close" onClick={toggleAside}>
            <i className="bx bx-menu" >≡</i>
          </span>
        {/* </button> */}
        <div className="right-section">
          <input type="text" placeholder="Buscar..." onChange={handleSearch} />
          <h2>{NameInstitution}</h2>
          <img src={InfInstitution} alt="Logo de la institución" />
        </div>
      </nav>

      <aside id="aside" className={isDeployed ? "desplegar" : ""}>
        <div className="container-svg">
          {userRole === "Teacher" || userRole === "Profesor" ? (
            <>
              <div
                onClick={() => setChangeComponent("teacherStudents")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="teacherStudents"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="teacherStudents">Estudiantes</label>
              </div>
              <div
                onClick={() => setChangeComponent("teacherGrupos")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="teacherGrupos"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"   htmlFor="teacherGrupos">Grupos</label>
              </div>
              <div
                onClick={() => setChangeComponent("teacherNotas")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="teacherNotas"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"   htmlFor="teacherNotas">Notas</label>
              </div>
              <div
                onClick={() => setChangeComponent("ChatEstudiante")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="ChatEstudiante"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"   htmlFor="ChatEstudiante">Chat Estudiante</label>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setChangeComponent("crear personal")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="crearPersonal"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"   htmlFor="crearPersonal">Crear Personal</label>
              </div>
              <div
                onClick={() => setChangeComponent("crear estudiante")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="crearEstudiante"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="crearEstudiante">Crear Estudiante</label>
              </div>
              <div
                onClick={() => setChangeComponent("Crear Grupo")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="crearGrupo"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="crearGrupo">Crear Grupo</label>
              </div>
              <div
                onClick={() => setChangeComponent("crear materias")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="materias"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="materias">Crear Materias</label>
              </div>
              
              <hr />
              <div
                onClick={() => setChangeComponent("profesor")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="crearPersonal"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="personal">Personal</label>
              </div>










              <div
                onClick={() => setChangeComponent("Horario")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="Horario"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="Horario">Horario</label>
              </div>
              <div
                onClick={() => setChangeComponent("Contratos")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="Contratos"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="Contratos">Contratos</label>
              </div>












              <div
                onClick={() => setChangeComponent("eventos")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="eventos"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="eventos">Programar eventos</label>
              </div>

              <div
                onClick={() => setChangeComponent("listeventos")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="listeventos"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="listeventos">Calendario eventos</label>
              </div>

              <div
                onClick={() => setChangeComponent("estudiante")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="estudiantes"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="estudiantes">Estudiantes</label>
              </div>
              <div
                onClick={() => setChangeComponent("grupos")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="grupos"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="grupos">Grupos</label>
              </div>
              <div
                onClick={() => setChangeComponent("gastos")}
                className="inputBoton"
              >
                <input
                  type="radio"
                  id="gastos"
                  name="changeComponent"
                  style={{ display: "none" }}
                />
                <label className="label-home-inst"  htmlFor="gastos">Gastos</label>
              </div>
            </>
            
          )}

          <div
            onClick={() => setChangeComponent("soporte de sistema")}
            className="inputBoton"
          >
            <input
              type="radio"
              id="soporteSistema"
              name="changeComponent"
              style={{ display: "none" }}
            />
            <label className="label-home-inst"  htmlFor="soporteSistema">Soporte de Sistema</label>
          </div>
          <div onClick={Logout}>
            <input
              type="radio"
              id="cerrarSesion"
              name="changeComponent"
              style={{ display: "none" }}
            />
            <label className="label-home-inst"  htmlFor="cerrarSesion">Cerrar Sesión</label>
          </div>
        </div>

        <img
          src="https://static.vecteezy.com/system/resources/previews/009/126/808/non_2x/gui-logo-gui-letter-gui-letter-logo-design-initials-gui-logo-linked-with-circle-and-uppercase-monogram-logo-gui-typography-for-technology-business-and-real-estate-brand-vector.jpg"
          alt=""
        />
      </aside>

      <div className="div-component-institutions ">
          {changeComponent === "crear personal" && <CreateStaff />}
          {changeComponent === "crear estudiante" && <CreateStudent />}
          {changeComponent === "Crear Grupo" && <CreateGroup />}
          {changeComponent === "crear materias" && <ManageSubjects />}
          {changeComponent === "eventos" && <Eventos />}
          {changeComponent === "listeventos" && <ListaEventos />}
          {changeComponent === "profesor" && <ListStaff />}
          {changeComponent === "estudiante" && <ListStudent />}
          {changeComponent === "gastos" && <Gastos />}
          {changeComponent === "grupos" && <ListGroups />}
          {changeComponent === "teacherStudents" && <StudentsTeacher />}
          {changeComponent === "teacherGrupos" && <GroupsTeacher />}
          {changeComponent === "teacherNotas" && <GradesTeacher />}
          {changeComponent === "ChatEstudiante" && <ChatProfesor />}
          {changeComponent === "Horario" && <ScheduleForm />}
          {changeComponent === "Contratos" && <CreateContract />}

      </div>
    </div>
  );
}

export default HomeInstitutionsForm;
