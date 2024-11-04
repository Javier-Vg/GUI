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
import Tooltip from '@mui/material/Tooltip';
import 'react-datepicker/dist/react-datepicker.css';

function ListGroups() {
  const [groupsWithoutF, setGroupsWithoutF] = useState([]);
  const [groups, setGroups] = useState([]);

  const [seeMore, setSeeMore] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  
  // Redux state
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const itemsGroup = useSelector((state) => state.group.items);
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const loading = useSelector((state) => state.group.loading);
  const error = useSelector((state) => state.group.error);
  
  // Teacher info
  const [institutionId, setInstitutionId] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const closeModal = () => {
    setAttendance({});
    setSeeMore(null);
  };

  useEffect(() => {
    
    // Filtrar los grupos que no tienen la letra "F" en el nombre y que coinciden con el searchTerm
    const filtro = groupsWithoutF.filter(group => 
        group && // Asegúrate de que group no sea undefined
        group.group_name && // Asegúrate de que group.name existe
        !group.group_name.toLowerCase().includes('f') &&  // Filtrar grupos que no tienen "F"
        group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por searchTerm
    );
    setGroups(filtro); // Suponiendo que tienes un estado para almacenar los grupos filtrados
}, [groupsWithoutF, searchTerm]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const saveAttendance = () => {
    const formattedDate = startDate ? startDate.toISOString().split('T')[0] : '';
    const json = {
      institution: institutionId,
      daily_attendance: attendance,
      group: seeMore,
      dateToday: formattedDate,
      teacher: teacherId
    };

    postStudentAssistence(json);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setInstitutionId(decodedToken.info.institution);
        setNameTeacher(decodedToken.info.username);
        setTeacherId(decodedToken.info.id);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    dispatch(fetchGroups());
    dispatch(fetchStaff());
    dispatch(fetchStudent());
  }, [dispatch]);

  useEffect(() => {
    const uniqueGroups = itemsGroup.filter(group =>
      group.institution === institutionId &&
      Object.values(group.communication_of_subjects_and_teacher).includes(nameTeacher)
    );

    setGroupsWithoutF(uniqueGroups);
  }, [itemsGroup, institutionId, nameTeacher]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <h1 className="title">Grupos</h1>
      <p className="description">Grupos donde usted se encuentra asignado:</p>
      <div className="groups-container">
        {groups.length > 0 ? (
          groups.map((group, i) => (
            <div key={i} className="group-card">
              <fieldset className="group-details">
                <legend>Detalles del Grupo: {group.group_name}</legend>
                <div className="group-info">
                  <span> Nivel de educación: {group.educational_level},</span> 
                  <span> Capacidad máxima: {group.capacity},</span> 
                  <span> Número de clase: {group.classroom},</span> 
                  <br />
                  <span> Docentes asignados:</span>
                  {group.communication_of_subjects_and_teacher && (
                    <table className="teachers-table">
                      <thead>
                        <tr>
                          <th>Asignatura</th>
                          <th>Docente</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(group.communication_of_subjects_and_teacher).map(([subject, teacher], index) => (
                          <tr key={index}>
                            <td>{subject}</td>
                            <td>{teacher}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <Tooltip title="Asigne asistencia" placement="bottom">
                  <button onClick={() => setSeeMore(group.id)} className="btn-asistencia">
                  Asignar asistencia de los estudiantes
                </button>
                </Tooltip>


                
              </fieldset>

              {seeMore === group.id && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h2 className="modal-title">Registro de Asistencia - Grupo: {group.group_name}</h2>
                    <div className="student-list">
                      {itemsAssignmentG.map((item, k) =>
                        itemsStudent.map((itemStu) => 
                          item.group === group.id && itemStu.id === item.student && (
                            <div key={`${k}-${itemStu.id}`} className="student-card">
                              <h3 className="student-name">{itemStu.username} {itemStu.last_name}</h3>
                              <select onChange={(e) => handleAttendanceChange(itemStu.id, e.target.value)} className="select-asis">
                                <option value="">Seleccionar estado</option>
                                <option value="Puntual">Puntual</option>
                                <option value="Inpuntual">Inpuntual</option>
                                <option value="Ausente">Ausente</option>
                              </select>
                            </div>
                          )
                        )
                      )}
                    </div>
                    <div className="modal-actions">

                      <Tooltip title="Seleccionar fecha de hoy" placement="bottom">
                        <div className="date-picker">
                          <EditCalendarIcon style={{fontSize: "35px"}} onClick={() => setIsOpen(!isOpen)} className="calendar-icon" />
                          {isOpen && (
                            <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); setIsOpen(false); }} inline />
                          )}
                        </div>
                      </Tooltip>
                     
                      <button onClick={saveAttendance} className="button-save">Guardar Asistencia</button>
                      <button onClick={closeModal} className="button-close">Volver</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))
        ) : (
          <p>No se encuentra en ningún grupo.</p>
        )}
      </div>
    </>
  );
}

export default ListGroups;
