import React, { useEffect, useState } from "react";
import {
  getStudents,
  postGroupsAssignment,
  getGroupsAssignment,
  deleteGroupsAssignment,
} from "../../service/LoginGui";
import { fetchGroups } from "../../Redux/Slices/SliceGroup";
import { useDispatch, useSelector } from "react-redux";
import "../../css/list_group.css";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
 

function ListGroups() {
  const [groups, setGroups] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [GroupsAssignment, setGroupsAssignment] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showStudents2, setShowStudents2] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [institution_id, setInstitutionId] = useState(null);
  const searchTerm = useSelector((state) => state.search.searchTerm); // Obtén el término de búsqueda

  const dispatch = useDispatch();

  const items = useSelector((state) => state.group.items);
  const loading = useSelector((state) => state.group.loading);
  const error = useSelector((state) => state.group.error);


  useEffect(() => {
    const token = Cookies.get('AuthCookie'); 
    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.institution; 
        
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    dispatch(fetchGroups());
  }, [dispatch]);

  // Filter groups based on institution_id
  useEffect(() => {
    const filteredGroups = items
      .filter((item) => item.institution === parseInt(institution_id, 10))
      .filter((group) =>
        group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por el término de búsqueda
      );
    setGroups(filteredGroups);
  }, [items, institution_id, searchTerm]);

  const openModal = (group) => {
    setSelectedGroup(group);
    setSeeMore(true);
    setShowStudents(false);
    setSelectedStudents([]);
  };

  const closeModal = () => {
    setSeeMore(false);
    setSelectedGroup(null);
  };

  // Fetch students not assigned to the selected group
  const fetchStudents = async (groupId) => {
    try {
      const studentsData = await getStudents(groupId);
      const assignmentsData = await getGroupsAssignment(groupId);
      const unassignedStudents = studentsData.filter(
        (student) =>
          !assignmentsData.some((assignment) => assignment.student === student.id)
      );
      setStudents(unassignedStudents);
      setShowStudents(true);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    }
  };

  // Fetch assigned students for the selected group
  const getStudentsGroup = async (groupId) => {
    try {
      const assignmentsData = await getGroupsAssignment(groupId);
      const filteredAssignments = assignmentsData.filter(
        (assignment) => assignment.group === groupId
      );
      const allStudents = await getStudents(groupId);

      const combinedData = filteredAssignments.map((assignment) => {
        const studentDetails = allStudents.find(
          (student) => student.id === assignment.student
        );

        return {
          ...assignment,
          student_name: studentDetails
            ? studentDetails.username
            : "Nombre no encontrado",
          identification_number: studentDetails
            ? studentDetails.identification_number
            : "ID no encontrado",
        };
      });

      setGroupsAssignment(combinedData);
      setShowStudents2(true);
    } catch (error) {
      console.error("Error al obtener los estudiantes del grupo:", error);
    }
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const cerrarShowStudents = () => {
    setShowStudents2(false);
    setSelectedStudents([]);
  };

  const addStudentsToGroup = async () => {
    if (selectedStudents.length === 0) return;
    const groupId = selectedGroup.id;

    for (const studentId of selectedStudents) {
      const assignment = {
        student: studentId,
        group: groupId,
      };

      try {
        await postGroupsAssignment(assignment);
      } catch (error) {
        console.error(
          `Error al asignar el estudiante ${studentId} al grupo ${groupId}`,
          error
        );
      }
    }

    const updatedGroup = {
      ...selectedGroup,
      current_students:
        selectedGroup.current_students + selectedStudents.length,
    };

    setSelectedGroup(updatedGroup);
    const updatedStudents = students.filter(
      (student) => !selectedStudents.includes(student.id)
    );
    setStudents(updatedStudents);
    setSelectedStudents([]);
  };

  const removeStudentFromGroup = async (assignmentId) => {
    try {
      // Primero, eliminamos la asignación en el backend
      await deleteGroupsAssignment(assignmentId);
  
      // Encuentra el grupo seleccionado en la lista de grupos
      const updatedGroups = groups.map((group) => {
        if (group.id === selectedGroup.id) {
          // Verifica que current_students no baje de 0
          return {
            ...group,
            current_students: group.current_students > 0 ? group.current_students - 1 : 0,
          };
        }
        return group; // Mantener los otros grupos sin cambios
      });
  
      // Actualiza el estado con los grupos actualizados
      setGroups(updatedGroups);
  
      // Actualiza la lista de asignaciones de estudiantes en el grupo
      const updatedAssignments = GroupsAssignment.filter(
        (assignment) => assignment.id !== assignmentId
      );
      setGroupsAssignment(updatedAssignments);
    } catch (error) {
      console.error(`Error al eliminar el estudiante del grupo`, error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container_list">
      <h1>Grupos</h1>
      <div className="students">
        {groups.length > 0 ? (
          groups.map((group, i) => (
            <div className="container_students_list" key={i}>
              <div className="student_inf">
                <h2>{group.group_name}</h2>
                <input
                  onClick={() => openModal(group)}
                  type="button"
                  value="Ver más"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No hay grupos registrados.</p>
        )}
      </div>

      {seeMore && selectedGroup && (
        <div className="modal">
          <h2>Información del grupo</h2>
          <div className="group-info">
            <p>
              <strong>Nombre del grupo:</strong> {selectedGroup.group_name}
            </p>
            <p>
              <strong>Nivel de educación:</strong>{" "}
              {selectedGroup.educational_level}
            </p>
            <p>
              <strong>Capacidad máxima:</strong> {selectedGroup.capacity}
            </p>
            <p>
              <strong>Número de clase:</strong> {selectedGroup.classroom}
            </p>
            <p>
              <strong>Estudiantes activos:</strong>{" "}
              {selectedGroup.current_students}
              <button onClick={() => getStudentsGroup(selectedGroup.id)}>
                Ver todos los estudiantes
              </button>
            </p>
            <p>
              <strong>Agregar estudiantes:</strong>
              <button onClick={() => fetchStudents(selectedGroup.id)}>
                Seleccionar Estudiantes
              </button>
            </p>
            {Object.entries(
              selectedGroup.communication_of_subjects_and_teacher
            ).map(([subject, teacher], index) => (
              <div key={index}>
                <p>Materia: {subject}</p>
                <p>Profesor: {teacher}</p>
              </div>
            ))}
          </div>
          <button className="close-btn" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      )}

      {showStudents2 && (
        <div className="students-list">
          <h2>Estudiantes asignados al grupo</h2>
          <div className="students-inline">
            {GroupsAssignment.length > 0 ? (
              GroupsAssignment.map((assignment) => (
                <div className="student-item" key={assignment.id}>
                  <h5>{assignment.student_name}</h5>
                  <h6>N° {assignment.identification_number}</h6>
                  <input
                    type="button"
                    value="Eliminar"
                    onClick={() => removeStudentFromGroup(assignment.id)}
                  />
                </div>
              ))
            ) : (
              <p>No hay estudiantes asignados.</p>
            )}
          </div>
          <button className="close-btn" onClick={() => cerrarShowStudents()}>
            Cerrar
          </button>
        </div>
      )}

      {showStudents && (
        <div className="students-list">
          <h2>Selecciona los estudiantes</h2>
          <div className="students-inline">
            {students.length > 0 ? (
              students.map((student) => (
                <div className="student-item" key={student.id}>
                  <h5>{student.username}</h5>
                  <h6>N° {student.identification_number}</h6>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => toggleStudentSelection(student.id)}
                  />
                </div>
              ))
            ) : (
              <p>No hay estudiantes disponibles.</p>
            )}
          </div>
          <input
            type="button"
            value="Agregar seleccionados"
            onClick={addStudentsToGroup}
          />
          <button className="close-btn" onClick={() => setShowStudents(false)}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default ListGroups;
