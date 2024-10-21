import React, { useEffect, useState } from "react";
import { fetchStudent } from "../../../Redux/Slices/SliceStudent";
import { fetchGroups } from "../../../Redux/Slices/SliceGroup";
import { fetchAssignmentGroup } from "../../../Redux/Slices/sliceAssignmentGroup";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/grades_teacher.css";

function GradesTeacher() {
  const [studentsWithGroups, setStudentsWithGroups] = useState([]);
  const NameTeacher = sessionStorage.getItem("NameTeacher");

  // Redux
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const itemsGroups = useSelector((state) => state.group.items);
  const dispatch = useDispatch();

  //Muestra el div del semestre seleccionado
  const [RenderSemestre, setRenderSemestre] = useState("");

  //Estado donde se almacenan las materias de ese especifico maestro.
  const [SubjectsTeacher, setSubjectsTeacher] = useState([]);

  //Modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    //setSubjectsTeacher([]);//Se setean las materias
  }
  const [isOpen, setIsOpen] = useState(false);

  //Crea el objeto con la vinculacion de la nota y asignaturas:
  const [ObjectGrades, setObjectGrades] = useState([]);

  useEffect(() => {
    dispatch(fetchStudent());
    dispatch(fetchAssignmentGroup());
    dispatch(fetchGroups());
  }, [dispatch]);

  const MostrarMaterias = (subjects) => {
    openModal(!isOpen)
    for (const key in subjects) {
      if (subjects.hasOwnProperty(key)) {
        if (NameTeacher == subjects[key]) {
          console.log(key);
          setSubjectsTeacher((prevFiltred) => [...prevFiltred, key]);
        };
      };
    };

    //Crea el objeto final:
    SubjectsTeacher.forEach((i) => {
      // Usar la versión anterior del estado con el callback
      setObjectGrades((prevState) => ({
        ...prevState, // Mantener el estado previo
        [i]: "", // Agregar o modificar la nueva clave y valor
      }));
    });
  };

  //Renderiza el semestre
  const handleSemesterChange = (studentId, semester) => {
    setRenderSemestre((prev) => ({
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

  //empieza a crear el objeto final del objeto
  const asingGrade = () => {
    SubjectsTeacher.forEach((i) => {
      // Usar la versión anterior del estado con el callback
      setObjectGrades((prevState) => ({
        ...prevState, // Mantener el estado previo
        [i]: "", // Agregar o modificar la nueva clave y valor
      }));
    });
    // `setObjctFinish` es asincrónico.
  };

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
          <input type="text" placeholder="Ingrese el nombre del estudiante." />
        </label>
      </div>
      <div>
        <button>Ver registro de Calificacion</button>
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
            <div className="keyDiv" key={student.id} >
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
                  onChange={(e) => handleSemesterChange(student.id, e.target.value)}
                  className="custom-select"
                >
                  <option value="null" disabled >
                    Seleccione semestre para asignar nota{" "}
                  </option>
                  <option value="1°Semestre">1°Semestre</option>
                  <option value="2°Semestre">2°Semestre</option>
                  <option value="3°Semestre">3°Semestre</option>
                  {/* Ponerle una columna de semetre a grades */}
                </select>
                <br />
                <br />

                {RenderSemestre[student.id] && (
                  <div className="div-grades-students">
                    <button className="buttonCalific" onClick={() => MostrarMaterias( student.group.communication_of_subjects_and_teacher)}
                    >
                      Calificar notas {RenderSemestre[student.id]}
                    </button>
                      
                  </div>
                )}
              </div>

              {/*Muestra el modal para la calificacion de notas*/}
              {isOpen && ObjectGrades && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Formulario</h2>

                    {ObjectGrades.length != [] && (
                      <div>
                        <p>Calificacion de notas</p>
                          {/* Mapeo de lista para generar los selects */}
                          {Object.keys(ObjectGrades).map((materiaKey, index) => (
                            <div key={index}>
                              <label>{materiaKey}</label>
                              <input onChange={(e) => handleSelectChange(e, materiaKey)} placeholder="Ingrese la nota aqui..." type="number" />
                            </div>
                          ))}
                          <br />
                          <form >
                            <button onClick={(()  => Post())} className="btn-save">Asignar Notas</button>
                          </form>
                      </div>
                    )}

                <div>
                <button type="submit">Enviar</button>
                <button type="button" onClick={closeModal}>Cerrar</button>
              </div>

                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
       
      )};
      

    </>
  );
}

export default GradesTeacher;
