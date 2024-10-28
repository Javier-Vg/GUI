import React, { useEffect, useState } from "react";
import { fetchGroups } from "../../../Redux/Slices/SliceGroup";
import { fetchStaff } from "../../../Redux/Slices/SliceStaff";
import { fetchStudent } from "../../../Redux/Slices/SliceStudent";
import { fetchAssignmentGroup } from "../../../Redux/Slices/sliceAssignmentGroup";
import { postStudentAssistence } from "../../../service/LoginGui";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/groups_teacher.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ListGroups() {
  const [groups, setGroups] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [selectedGroup, setSelectedGroups] = useState(null);
  const dispatch = useDispatch();

  //Estados de Staff:
  const itemsGroup = useSelector((state) => state.group.items);
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const loading = useSelector((state) => state.group.loading);
  const error = useSelector((state) => state.group.error);

  const [attendance, setAttendance] = useState({});

  //Setea la cookie
  const [InstitutionId, setInstitutionId] = useState("");
  const [NameTeacher, setNameTeacher] = useState("");
  const [TeacherId, setTeacherId] = useState("");
  
  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // calenderrrr
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const saveAttendance = () => {
  console.log(attendance); 

    // Obtener el año, mes y día
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(startDate.getDate()).padStart(2, '0');
    // Formatear a yyyy/mm/dd
    const fechaFormateada = `${year}/${month}/${day}`;

    const json = {
      institution: InstitutionId,
      daily_attendance: attendance,
      group: seeMore,
      dateToday: fechaFormateada,
      teacher: TeacherId
    }

    console.log(json);
    

    postStudentAssistence(json);

  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);
        setInstitutionId(decodedToken.institution);
        setNameTeacher(decodedToken.Name);
        setTeacherId(decodedToken.ID);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    dispatch(fetchGroups()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchStaff()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  useEffect(() => {
    setGroups([]);
    let arrayGroups = [];
    for (let i = 0; i < itemsGroup.length; i++) {
      Object.values(
        itemsGroup[i].communication_of_subjects_and_teacher
      ).forEach((value) => {
        if (
          itemsGroup[i].institution === InstitutionId &&
          value == NameTeacher
        ) {
          //Valida nombre del profe y institucion
          // Actualiza el valor de la clave correspondiente

          arrayGroups.push(itemsGroup[i]);
          // Crear un conjunto para rastrear usernames únicos
          let usernamesUnicos = new Set();

          // Filtrar los objetos omitiendo duplicados
          const objetosFiltrados = arrayGroups.filter((obj) => {
            if (usernamesUnicos.has(obj.group_name)) {
              return false; // Omitir si ya existe
            } else {
              usernamesUnicos.add(obj.group_name); // Agregar al conjunto
              return true; // Mantener si es único
            }
          });

          setGroups(objetosFiltrados);
        }
      });
    }
  }, [itemsGroup]);

  
  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra el error si ocurre
  }

  return (
    <>
      <h1>Grupos</h1>
      <p>Grupos donde usted se encuentra asignado:</p>
      <p>La asignacion de asistencia de estudiantes esta en este apartado.</p>
      
      <br />
      <br />
      <div>
        {groups.length > 0 ? (
          <div className="container_list">
            {groups.map((group, i) => (
              <div key={i} className="divField">
                <fieldset>
                  <legend>
                    Detalles del Grupo: <br />
                    {group.group_name}
                  </legend>

                  <div className="info">
                    <span className="label">Nivel de educacion:</span>{" "}
                    {group.educational_level}
                  </div>
                  <div className="info">
                    <span className="label">Capacidad Maxima:</span>{" "}
                    {group.capacity}
                  </div>
                  <div className="info">
                    <span className="label">Numero de clase:</span>{" "}
                    {group.classroom}
                  </div>
                  <div className="info">
                    <span className="label">Estudiantes activos:</span>{" "}
                    {group.current_students}
                  </div>
                  
                    <span className="label">Docentes asignados:</span>

                    <br />
                    <br />
                    
                    {group.communication_of_subjects_and_teacher && (
                      <table className="table_json">
                        <thead>
                          <tr>
                            <th>Asignatura</th>
                            <th>Docente</th>
                          </tr>
                        </thead>

                        {Object.keys(
                          group.communication_of_subjects_and_teacher
                        ).map((key, index) => (
                          <tbody>
                            <tr key={index}>
                              <td>{key}</td>
                              <td>
                                {group.communication_of_subjects_and_teacher[key]}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    )}
                    <br />
                 
                  <button
                    onClick={() => setSeeMore(group.id)}
                    className="btn-asistencia"
                  >
                    Asignar asistencia de los estudiantes
                  </button>
                </fieldset>

                {/* Modal de asignar asistencia */}
                {seeMore && (
                  <div className="modal-overlayTwo">
                    <div className="modalTwo">
                      
                      <div className="container-asistencia">
                      <h1 className="title">Registro de Asistencia</h1>
                      <h2 className="subtitle">Grupo: {seeMore}</h2>
                      

                      {itemsAssignmentG.map((item, k) =>
                        itemsStudent.map((itemStu, s) =>
                          item.group === seeMore && itemStu.id === item.student && (
                            <div key={`${s}-${k}`} 
                              className="student-card">
                              <h3 className="student-name">{itemStu.username} {itemStu.last_name}</h3>
                              <select
                                onChange={(e) => handleAttendanceChange(itemStu.id, e.target.value)}
                                defaultValue="Seleccionar estado"
                                className="select-asis"
                              >
                                <option value="" defaultValue={this}>Seleccionar estado</option>
                                <option value="Puntual">Puntual</option>
                                <option value="Inpuntual">Inpuntual</option>
                                <option value="Ausente">Ausente</option>
                              </select>
                            </div>
                          )
                        )
                      )}
                      <div className="div-btn">
                        <EditCalendarIcon className="icon" onClick={handleButtonClick} style={{ fontSize: '40px', color: 'blue', marginTop: "18px" }}  />
                      
                        <div>
                          {isOpen && (
                              <DatePicker 
                                  selected={startDate} 
                                  onChange={(date) => {
                                      setStartDate(date);
                                      setIsOpen(false); // Cierra el calendario al seleccionar una fecha
                                  }} 
                                  inline // Para mostrar el calendario de forma inline
                              />
                          )}
                        </div>

                        <button onClick={saveAttendance} 
                        className="button-asis">
                          Guardar Asistencia
                        </button>
                        <button
                          className="btn-close-asistencia"
                          onClick={() => setSeeMore(false)}
                        >
                          volver
                        </button>
                      </div>
                      
                    </div>
                  
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Todavia usted no se encuentra en ningun grupo.</p>
        )}
      </div>
    </>
  );
}

export default ListGroups;
