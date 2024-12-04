import React, { useEffect, useState } from "react";
import { postGrades } from "../../../service/LoginGui";
import { fetchStudent } from "../../../Redux/Slices/SliceStudent";
import { fetchGroups } from "../../../Redux/Slices/SliceGroup";
import { fetchAssignmentGroup } from "../../../Redux/Slices/sliceAssignmentGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../../../Redux/Slices/SliceGrades";
// import "../../../css/grades_teacher.css";
import '../../../css/Institutions/teachers/GradesTeacher.css'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


function GradesTeacher() {
  const [studentsWithGroups, setStudentsWithGroups] = useState([]);
  const [NameTeacher, setNameTeacher] = useState("")
  const [IdTeacher, setIdTeacher] = useState("")
  // const NameTeacher = sessionStorage.getItem("NameTeacher");
  // const IdTeacher = sessionStorage.getItem("StaffID");

  // Redux
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const itemsGroups = useSelector((state) => state.group.items);
  const itemsGrades = useSelector((state) => state.grades.items);
  
  const dispatch = useDispatch();

  //Muestra el div del semestre seleccionado
  
  const [RenderTrimestre, setRenderTrimestre] = useState("");
  const [renderSubjects, setRenderSubjects] = useState(false);

  //Guardan estados para el objeto
  const [StudentId, setStudentId] = useState("");
  const [GroupId, setGroupId] = useState("");
  const [Trimestre, setTrimestre] = useState("");

  const [isOpenRegistro, setIsOpenRegistro] = useState(false);//Estado de modal de registro
  
  //Modal calificaciones
  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setObjectGrades([]);
    // setSubjectsTeacher([]);//Se setean las materias
  }

  // Modal registro calificaciones.
  const openModalR = () => {
    setRenderSubjects(true)
    setIsOpenRegistro(true);
  }
  
  useEffect(() => {
    return;
  },[renderSubjects, isOpenRegistro]);
  
  const closeModalR = () => {
    setIsOpenRegistro(false);
  }

  
  const [isOpen, setIsOpen] = useState(false);
  //Crea el objeto con la vinculacion de la nota y asignaturas:
  const [ObjectGrades, setObjectGrades] = useState([]);
  let [estadoBusqueda, setEstadoBusqueda] = useState("");

  //Filtra por medio de las clases, ocultandolas segun sus caracteres o mostrandolas.
  document.querySelectorAll(".keyDiv").forEach(card => {
    card.textContent.toLowerCase().includes(estadoBusqueda.toLowerCase())
    ? card.classList.remove("filtro")
    : card.classList.add("filtro")
  });

  useEffect(() => {
    console.log("ED");
    
}, [ObjectGrades]);

  useEffect(() => {
    const token = Cookies.get('AuthCookie');

     if (token) {
       try {
         // Desencriptar el token
         const decodedToken = jwtDecode(token);
         setIdTeacher(decodedToken.info.id)
         setNameTeacher(decodedToken.info.username)
         
       } catch (error) {
         console.error('Error al decodificar el token', error);
       }
     }
    dispatch(fetchStudent());
    dispatch(fetchAssignmentGroup());
    dispatch(fetchGroups());
    dispatch(fetchGrades());
  }, [dispatch]);

  const MostrarMaterias = (subjects, trimestre, idGroup) => {
    setTrimestre(trimestre);
    setGroupId(idGroup);
    const filteredSubjects = [];
    openModal(!isOpen);
    for (const key in subjects) {
      if (subjects.hasOwnProperty(key)) {
        if (NameTeacher == subjects[key]) {
          filteredSubjects.push(key);
        };
      };
    };

    //Crea el objeto final:
    filteredSubjects.forEach((i) => {
      //Usar la versión anterior del estado con el callback
      setObjectGrades((prevState) => ({
        ...prevState, // Mantener el estado previo
        [i]: "", // Agregar o modificar la nueva clave y valor
      }));
    });
  };

  const Post = () => {
    // e.preventDefault();
    const teacherId = Number(IdTeacher);

    let json = {
      grade_results: ObjectGrades,
      student: StudentId,
      group: GroupId,
      teacher: teacherId,
      period: Trimestre
    }

   // Post grades and then dispatch a reload
    postGrades(json).then(() => {
      dispatch(fetchGrades()); // Esto activará una recarga de calificaciones.
      closeModal(); // Cierra el modal de registro de calificacion
    }).catch((error) => {
      console.error("Error posting grades:", error);
    });

  };

  //Renderiza el trimestre
  const handleTrimesterChange = (studentId, semester) => {
    setStudentId(studentId);
    
    setRenderTrimestre((prev) => ({
        ...prev,
        [studentId]: semester,
    }));
  };

  useEffect(() => {
    let tempStudents = [];
    tempStudents = []; //Lo setea para que no lo integre 2 veces
    for (const group of itemsGroups) {
      const isTeacherGroup = Object.values(
        group.communication_of_subjects_and_teacher
      ).includes(NameTeacher);

      if (isTeacherGroup) {
        for (const assignment of itemsAssignmentG) {
          if (assignment.group === group.id) {
            //Filtra por si el id de estudiante y el id de la asignacion de estudiante, si cumple este lo añade.
            const student = itemsStudent.find(
              (s) => s.id === assignment.student
            );
            
            if (student) {
              tempStudents.push({ ...student, group: group }); //Guarda el el objeto con el estudiante y grupo correspondiente en el array.
            };
          };
        };
      };
    };
    
    setStudentsWithGroups(tempStudents); //Setea el estado que guarda los estados 
  }, [itemsGroups, itemsAssignmentG, itemsStudent, NameTeacher]);
  
  // Manejar cambios en los inputs
  const handleSelectChange = (e, materiaKey) => {
    const value = e.target.value;

    // Actualiza el objeto en el estado con la clave y valor correspondiente
    setObjectGrades((prevState) => ({
      ...prevState, // Mantén el estado previo
      [materiaKey]: value, // Actualiza el valor de la clave correspondiente
    }));
  };

  return (
    <>
    {/* <div className="tres-div"> */}
    <div className="container-grades-teacher">

      <div>
        <h2>Gestion de notas.</h2>
      </div>
      <div>
        <label>
          Busqueda de alumnos:
          <input type="text" onChange={((e) => setEstadoBusqueda(e.target.value))} placeholder="Ingrese el nombre del estudiante." />
        </label>
      </div>
      <div>
        <button onClick={(() => openModalR())}>Ver registro de Calificacion</button>
      </div>
    </div>
      <br />
      <hr />
      <br />
      {studentsWithGroups.length === 0 ? (
        <p>No hay estudiantes.</p>
      ) : (
        <div className="div2">

          {studentsWithGroups.map((student) => (
            <div className="keyDiv" id="categoria" key={student.id}>
            <div className="content-container">
              <h4 className="title-grades">
                Nombre del estudiante: <br />- {student.username} {student.last_name}.
              </h4>
              <p className="paragraph">
                Grupo donde pertenece: {student.group.group_name}
              </p>
              <p className="paragraph">
                Nivel de educación: {student.group.educational_level}
              </p>
              <select
                onChange={(e) => handleTrimesterChange(student.id, e.target.value)}
                className="custom-select"
              >
                <option value="null" disabled selected>
                  Seleccione el trimestre para asignar nota
                </option>
                <option value="1°Trimestre">1°Trimestre</option>
                <option value="2°Trimestre">2°Trimestre</option>
                <option value="3°Trimestre">3°Trimestre</option>
              </select>
              <br />
              <br />
          
              {RenderTrimestre[student.id] && (
                <div className="div-grades-students">
                  <button className="buttonCalific" onClick={() => MostrarMaterias(student.group.communication_of_subjects_and_teacher, RenderTrimestre[student.id], student.group.id)}>
                    Calificar notas {RenderTrimestre[student.id]}
                  </button>
                </div>
              )}
            </div>
          
            {/* Muestra el modal para la calificación de notas */}
            {isOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Formulario</h2>
          
                  {ObjectGrades.length !== 0 && (
                    <div>
                      <p>Calificación de notas</p>
                      {/* Mapeo de lista para generar los selects */}
                      {Object.keys(ObjectGrades).map((materiaKey, index) => (
                        <div className="div-calific" key={index}>
                          <label className="label-subject">{materiaKey}</label>
                          <input
                            onChange={(e) => handleSelectChange(e, materiaKey)}
                            placeholder="Ingrese la nota aquí..."
                            type="number"
                          />
                        </div>
                      ))}
                      <br />
                    </div>
                  )}
          
                  <div>
                    <button onClick={Post}>Enviar</button>
                    <button type="button" onClick={closeModal}>Cerrar</button>
                  </div>
                </div>
              </div>
            )}
          
            {/* Muestra el modal para el registro de calificaciones */}
            {isOpenRegistro && renderSubjects &&(
              <div className="modal-overlayTwo">
                <div className="modalTwo">
                  <h2>Registro de calificaciones</h2>
                  <table className="table-grades">
                    <thead>
                      <tr className="tr-grades">
                        <th className="th-grades">Nombre de estudiante</th>
                        <th className="th-grades">Nombre de grupo</th>
                        <th className="th-grades">Período que se calificó</th>
                        <th className="th-grades">Estatus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsWithGroups.map((studnt, i) =>
                        itemsGrades.map((grad, m) =>
                          studnt.id === grad.student && (
                            <tr className="tr-grades" key={`${i}-${m}`}>
                              <td className="td-grades">{studnt.username} {studnt.last_name}</td>
                              <td className="td-grades">{studnt.group.group_name}</td>
                              <td className="td-grades">{grad.period}</td>
                              <td className="td-grades">Calificada✔️</td>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>
                  <div>
                    <button type="button" onClick={closeModalR}>Cerrar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          ))}
        </div>
      )}
    </>
  );
};

export default GradesTeacher;