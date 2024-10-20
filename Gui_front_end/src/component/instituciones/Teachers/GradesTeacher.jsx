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

  useEffect(() => {
    dispatch(fetchStudent());
    dispatch(fetchAssignmentGroup());
    dispatch(fetchGroups());
  }, [dispatch]);

  const MostrarMaterias = (subjects) => {
    for (const key in subjects) {
      if (subjects.hasOwnProperty(key)) {
        // Asegúrate de que la clave es propia del objeto
        console.log(`Clave: ${key}, Valor: ${subjects[key]}`);
        if (NameTeacher == subjects[key]) {
          setSubjectsTeacher((prevFiltred) => [...prevFiltred, subjects[key]]);
        };
      };
    };
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
            }
          }
        }
      }
    }

    setStudentsWithGroups(tempStudents);
  }, [itemsGroups, itemsAssignmentG, itemsStudent, NameTeacher]);

  

  return (
    <>
      <h2>Calificacion de los estudiantes</h2>
      <br />
      {studentsWithGroups.length === 0 ? (
        <p>No hay estudiantes.</p>
      ) : (
        <div className="div2">

           {studentsWithGroups.map((student, i) => (
          <div key={student.id} >
            <div className="content-container">
              <h3 className="title">
                Nombre del estudiante: {student.username} {student.last_name}.
              </h3>
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
                  <fieldset>
                    <legend>{RenderSemestre[student.id]}</legend>
                    <div className="info">
                      <button
                        onClick={() =>
                          MostrarMaterias(
                            student.group.communication_of_subjects_and_teacher
                          )
                        }
                      >
                        Calificar notas
                      </button>
                    </div>
                  </fieldset>
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
       
      )}
      ;
    </>
  );
}

export default GradesTeacher;
