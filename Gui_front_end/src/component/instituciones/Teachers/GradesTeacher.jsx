import React, { useEffect, useState } from "react";
import { postGrades } from "../../../service/LoginGui";
import { fetchStudent } from "../../../Redux/Slices/SliceStudent";
import { fetchGroups } from "../../../Redux/Slices/SliceGroup";
import { fetchAssignmentGroup } from "../../../Redux/Slices/sliceAssignmentGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../../../Redux/Slices/SliceGrades";
import "../../../css/grades_teacher.css";

function GradesTeacher() {
  const [studentsWithGroups, setStudentsWithGroups] = useState([]);
  const NameTeacher = sessionStorage.getItem("NameTeacher");
  const IdTeacher = sessionStorage.getItem("StaffID");

  // Redux
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const itemsGroups = useSelector((state) => state.group.items);
  const itemsGrades = useSelector((state) => state.grades.items);
  const dispatch = useDispatch();

  //Muestra el div del semestre seleccionado
  
  const [RenderTrimestre, setRenderTrimestre] = useState("");

  //Guardan estados para el objeto
  const [StudentId, setStudentId] = useState("");
  const [GroupId, setGroupId] = useState("");
  const [Trimestre, setTrimestre] = useState("");
  
  //Modal calificaciones
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setObjectGrades([]);
    // setSubjectsTeacher([]);//Se setean las materias
  }

  //Modal registro calificaciones.
  const openModalR = () => setIsOpenRegistro(true);
  const closeModalR = () => {
    setIsOpenRegistro(false);
  }


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegistro, setIsOpenRegistro] = useState(false);//Estado de modal de registro

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
    dispatch(fetchStudent());
    dispatch(fetchAssignmentGroup());
    dispatch(fetchGroups());
    dispatch(fetchGrades());
  }, [dispatch]);

  const MostrarMaterias = (subjects, trimestre, idGroup) => {
    setTrimestre(trimestre);
    setGroupId(idGroup);
    const filteredSubjects = [];
    openModal(!isOpen)
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

  const Post = (e) => {
    e.preventDefault();
    const teacherId = Number(IdTeacher); 

    let json = {
      grade_results: ObjectGrades,
      student: StudentId,
      group: GroupId,
      teacher: teacherId,
      period: Trimestre
    }
    
    postGrades(json);
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
            const student = itemsStudent.find(
              (s) => s.id === assignment.student
            );
            
            if (student) {
              tempStudents.push({ ...student, group: group });
            };
          };
        };
      };
    };
    
    setStudentsWithGroups(tempStudents);
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
    <div className="tres-div">
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
        <button onClick={openModalR}>Ver registro de Calificacion</button>
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
            <div className="keyDiv" id="categoria" key={student.id} >
              <div className="content-container">
                <h4 className="title">
                  Nombre del estudiante: <br />- {student.username} {student.last_name}.
                </h4>
                <p className="paragraph">
                  Grupo donde pertenece: {student.group.group_name}
                </p>
                <p className="paragraph">
                  Nivel de educacion: {student.group.educational_level}.
                </p>
                <select
                  onChange={(e) => handleTrimesterChange(student.id, e.target.value)}
                  className="custom-select"
                >
                  <option value="null" disabled >
                    Seleccione el trimestre para asignar nota
                  </option>
                  <option value="1°Trimestre">1°Trimestre</option>
                  <option value="2°Trimestre">2°Trimestre</option>
                  <option value="3°Trimestre">3°Trimestre</option>
                  {/* Ponerle una columna de trimetre a grades */}
                </select>
                <br />
                <br />

                {RenderTrimestre[student.id] && (
                  <div className="div-grades-students">
                    <button className="buttonCalific" onClick={() => MostrarMaterias( student.group.communication_of_subjects_and_teacher, RenderTrimestre[student.id], student.group.id)} //json / trimestre / idGroup
                    >
                      Calificar notas {RenderTrimestre[student.id]}
                    </button>
                  </div>
                )}
              </div>

              {/*Muestra el modal para la calificacion de notas*/}
              { isOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Formulario</h2>

                    {ObjectGrades.length != [] && (
                      <div>
                        <p>Calificacion de notas</p>
                          {/* Mapeo de lista para generar los selects */}
                          {Object.keys(ObjectGrades).map((materiaKey, index) => (
                            <div className="div-calific" key={index}>
                              <label className="label-subject">{materiaKey}</label>
                              <input onChange={(e) => handleSelectChange(e, materiaKey)} placeholder="Ingrese la nota aqui..." type="number" />
                            </div>
                          ))}
                          <br />
                      </div>
                    )}

                    <div>
                      <form>
                        <button onClick={Post} >Enviar</button>
                        <button type="button" onClick={closeModal}>Cerrar</button>
                      </form>
                      
                    </div>
                  </div>
                </div>
              )};

              {/*Muestra el modal para la calificacion de notas*/}
              { isOpenRegistro && (
                <div className="modal-overlayTwo">
                  <div className="modalTwo">
                    <h2>Registro de calificaciones</h2>
                    <table className="table-grades">
                      <tr className="tr-grades">
                        <th className="th-grades">Nombre de estudiante</th>
                        <th className="th-grades">Nombre de grupo</th>
                        <th className="th-grades">Perido que se califico</th>
                        <th className="th-grades">Estatus</th>
                      </tr>

                      {studentsWithGroups.map((studnt, i) => (
                      itemsGrades.map((grad, m) => (
                      
                        studnt.id == grad.student && (
                          
                          <tr className="tr-grades" key={`${i}-${m}`}>
                            <td className="td-grades">{studnt.username} {studnt.last_name}</td>
                            <td className="td-grades">{studnt.group.group_name}</td>
                            <td className="td-grades">{grad.period}</td>
                            <td className="td-grades">Calificada✔️</td>
                          </tr>
                        )
                      ))
                    ))}
                    </table>

                    <div>
                      <button type="button" onClick={closeModalR}>Cerrar</button>
                    </div>
                   
                  </div>
                </div>
              )};

            </div>
          ))};
        </div>
      )};
    </>
  );
};

export default GradesTeacher;
