// import React, { useEffect, useState } from "react";
// import { getStudents } from "../../service/LoginGui";
// import { fetchGroups } from "../../Redux/Slices/SliceGroup";
// import { useDispatch, useSelector } from "react-redux";
// import { postGroupsAssignment, getGroupsAssignment } from '../../service/LoginGui'; 
// import "../../css/list_group.css";

// function ListGroups() {
//   const [groups, setGroups] = useState([]);
//   const [seeMore, setSeeMore] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [GroupsAssignment, setGroupsAssignment] = useState([]);
//   const [showStudents, setShowStudents] = useState(false);
//   const [showStudents2, setShowStudents2] = useState(false);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const institution_id = useSelector((state) => state.ids.institutionId);
//   const dispatch = useDispatch();

//   const items = useSelector((state) => state.group.items);
//   const loading = useSelector((state) => state.group.loading);
//   const error = useSelector((state) => state.group.error);

//   useEffect(() => {
//     dispatch(fetchGroups());
//   }, [dispatch]);

//   useEffect(() => {
//     const filteredGroups = items.filter(item => item.institution === parseInt(institution_id, 10));
//     setGroups(filteredGroups);
//   }, [items, institution_id]);

//   const openModal = (group) => {
//     setSelectedGroup(group);
//     setSeeMore(true);
//     setShowStudents(false);
//     setSelectedStudents([]);
//   };

//   const closeModal = () => {
//     setSeeMore(false);
//     setSelectedGroup(null);
//   };

//   const fetchStudents = async (groupId) => {
//     const studentsData = await getStudents(groupId);
    
//     // Filtrar estudiantes que no están en el grupo
//     const unassignedStudents = studentsData.filter(
//       (student) => !GroupsAssignment.some(assignment => assignment.student === student.id)
//     );

//     setStudents(unassignedStudents); // Solo estudiantes no asignados
//     setShowStudents(true);
//   };

//   const getStudentsGroup = async (groupId) => {
//     const studentsData = await getGroupsAssignment(groupId);
//     setGroupsAssignment(studentsData); // Aquí cargamos los estudiantes asignados al grupo
//     setShowStudents2(true); // Mostramos el modal de estudiantes asignados
//   };

//   const toggleStudentSelection = (studentId) => {
//     setSelectedStudents((prevSelected) =>
//       prevSelected.includes(studentId)
//         ? prevSelected.filter(id => id !== studentId)
//         : [...prevSelected, studentId]
//     );
//   };

//   const cerrarShowStudents = () => {
//     setShowStudents2(false);
//     setSelectedStudents([]);
//   };

//   const addStudentsToGroup = async () => {
//     if (selectedStudents.length === 0) return;
//     const groupId = selectedGroup.id;

//     for (const studentId of selectedStudents) {
//       const assignment = {
//         student: studentId,
//         group: groupId,
//       };

//       try {
//         await postGroupsAssignment(assignment); 
//       } catch (error) {
//         console.error(`Error al asignar el estudiante ${studentId} al grupo ${groupId}`, error);
//       }
//     }

//     const updatedGroup = {
//       ...selectedGroup,
//       current_students: selectedGroup.current_students + selectedStudents.length,
//     };

//     setSelectedGroup(updatedGroup);
//     console.log("succcessfully");
//   };

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container_list">
//       <h1>Grupos</h1>
//       <div className="students">
//         {groups.length > 0 ? (
//           groups.map((group, i) => (
//             <div className="container_students_list" key={i}>
//               <div className="student_inf">
//                 <h2>
//                   {group.name} {group.last_name}
//                 </h2>
//                 <h6>{group.educational_level}</h6>
//                 <input
//                   onClick={() => openModal(group)}
//                   type="button"
//                   value="Ver más"
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No hay grupos registrados.</p>
//         )}
//       </div>

//       {seeMore && selectedGroup && (
//         <div className="modal">
//           <h2>Información del grupo</h2>
//           <div className="group-info">
//             <p><strong>Nombre del grupo:</strong> {selectedGroup.group_name}</p>
//             <p><strong>Nivel de educación:</strong> {selectedGroup.educational_level}</p>
//             <p><strong>Capacidad máxima:</strong> {selectedGroup.capacity}</p>
//             <p><strong>Número de clase:</strong> {selectedGroup.classroom}</p>
//             <p>
//               <strong>Estudiantes activos:</strong> {selectedGroup.current_students}
//               <button onClick={() => getStudentsGroup(selectedGroup.id)}>
//                 Ver todos los estudiantes
//               </button>
//             </p>
//             <p>
//             <strong>Agregar estudiantes:</strong>
//               <button onClick={() => fetchStudents(selectedGroup.id)}>
//                 Seleccionar Estudiantes
//               </button>
//             </p>
//           </div>
//           <button className="close-btn" onClick={closeModal}>Cerrar</button>
//         </div>
//       )}
      
//       {showStudents2 && (
//         <div className="students-list">
//           <h2>Estudiantes asignados al grupo</h2>

//           {(() => {
//             const assignedStudents = GroupsAssignment
//               .filter(assignment => students.some(student => student.id === assignment.student))
//               .map(assignment => students.find(student => student.id === assignment.student));

//             return (
//               <div className="students-inline">
//                 {assignedStudents.length > 0 ? (
//                   assignedStudents.map((student) => (
//                     student && (
//                       <div className="student-item" key={student.id}>
//                         <h5>{student.username}</h5>
//                         <h6>N° {student.identification_number}</h6>
//                         <input
//                           type="checkbox"
//                           checked={selectedStudents.includes(student.id)}
//                           onChange={() => toggleStudentSelection(student.id)}
//                         />
//                       </div>
//                     )
//                   ))
//                 ) : (
//                   <p>No hay estudiantes asignados.</p>
//                 )}
//               </div>
//             );
//           })()}

//           <button className="close-btn" onClick={() => cerrarShowStudents()}>
//             Cerrar
//           </button>
//         </div>
//       )}
      
//       {showStudents && (
//         <div className="students-list">
//           <h2>Selecciona los estudiantes</h2>
//           <div className="students-inline">
//             {students.length > 0 ? (
//               students.map((student) => (
//                 <div className="student-item" key={student.id}>
//                   <h5>{student.username}</h5>
//                   <h6>N° {student.identification_number}</h6>
//                   <input
//                     type="checkbox"
//                     checked={selectedStudents.includes(student.id)}
//                     onChange={() => toggleStudentSelection(student.id)}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p>No hay estudiantes disponibles.</p>
//             )}
//           </div>
//           <input
//             type="button"
//             value="Agregar seleccionados"
//             onClick={addStudentsToGroup}
//           />
//           <button className="close-btn" onClick={() => setShowStudents(false)}>
//             Cerrar
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ListGroups;
import React, { useEffect, useState } from "react";
import { getStudents, postGroupsAssignment, getGroupsAssignment, deleteGroupsAssignment } from "../../service/LoginGui"; 
import { fetchGroups } from "../../Redux/Slices/SliceGroup";
import { useDispatch, useSelector } from "react-redux";
import "../../css/list_group.css";

function ListGroups() {
  const [groups, setGroups] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [GroupsAssignment, setGroupsAssignment] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showStudents2, setShowStudents2] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const institution_id = useSelector((state) => state.ids.institutionId);
  const dispatch = useDispatch();

  const items = useSelector((state) => state.group.items);
  const loading = useSelector((state) => state.group.loading);
  const error = useSelector((state) => state.group.error);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

    useEffect(() => {
        setGroups([]);
        for (let i = 0; i < items.length; i++) {
            if (items[i].institution === parseInt(institution_id, 10)) {
              // Actualiza el valor de la clave correspondiente
              setGroups((prevFiltred) => [...prevFiltred, items[i]]);
            };
        };
    }, [items]);

  const openModal = (group) => {
    setSelectedGroup(group);
    setSeeMore(true);
    setShowStudents(false);
    setSelectedStudents([]);
  };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedGroups(null);
    };

    const listSubject = () => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
              console.log(`${key}: ${data[key]}`);
            }
        }
    }
    
    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
    };
    
    if (error) {
        return <div>Error: {error}</div>; // Muestra el error si ocurre
    };

  return (
    <div className="container_list">
      <h1>Grupos</h1>
      <div className="students">
        {groups.length > 0 ? (
          groups.map((group, i) => (
            <div className="container_students_list" key={i}>
              <div className="student_inf">
                <h2>
                  {group.name} {group.last_name}
                </h2>
                <h6>{group.educational_level}</h6>
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
            <p><strong>Nombre del grupo:</strong> {selectedGroup.group_name}</p>
            <p><strong>Nivel de educación:</strong> {selectedGroup.educational_level}</p>
            <p><strong>Capacidad máxima:</strong> {selectedGroup.capacity}</p>
            <p><strong>Número de clase:</strong> {selectedGroup.classroom}</p>
            <p>
              <strong>Estudiantes activos:</strong> {selectedGroup.current_students}
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
          </div>
          <button className="close-btn" onClick={closeModal}>Cerrar</button>
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
