import React, { useEffect, useState } from 'react';
import { fetchStudent } from '../../../Redux/Slices/SliceStudent';
import { fetchGroups } from '../../../Redux/Slices/SliceGroup';
import { fetchAssignmentGroup } from '../../../Redux/Slices/sliceAssignmentGroup';
import { useDispatch, useSelector } from 'react-redux';
import '../../../css/grades_teacher.css';

function GradesTeacher() {
    const [studentsWithGroups, setStudentsWithGroups] = useState([]);
    const NameTeacher = useSelector((state) => state.infInstitution.nameInstitution);

    // Redux
    const itemsStudent = useSelector((state) => state.student.items);
    const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
    const itemsGroups = useSelector((state) => state.group.items);
    const dispatch = useDispatch();

    //Muestra el div del semestre seleccionado
    const [RenderSemestre, setRenderSemestre] = useState('');

    //Estado donde se almacenan las materias de ese especifico maestro.
    const [SubjectsTeacher, setSubjectsTeacher] = useState([]);


    useEffect(() => {
        dispatch(fetchStudent());
        dispatch(fetchAssignmentGroup());
        dispatch(fetchGroups());
    }, [dispatch]);

    const MostrarMaterias = (subjects) => {
      for (const key in subjects) {
        if (subjects.hasOwnProperty(key)) { // Asegúrate de que la clave es propia del objeto
            console.log(`Clave: ${key}, Valor: ${subjects[key]}`);
            if (NameTeacher == subjects[key]) {
              setSubjectsTeacher((prevFiltred) => [...prevFiltred, subjects[key]]);
            };
        };
      };
    };

    useEffect(() => {
        const tempStudents = [];

        for (const group of itemsGroups) {
            const isTeacherGroup = Object.values(group.communication_of_subjects_and_teacher).includes(NameTeacher);

            if (isTeacherGroup) {
                for (const assignment of itemsAssignmentG) {
                    if (assignment.group === group.id) {
                        const student = itemsStudent.find(s => s.id === assignment.student);
                        if (student) {
                            tempStudents.push({ ...student, group: group });
                            
                        };
                    };
                };
            };
        }; 

        setStudentsWithGroups(tempStudents);
    }, [itemsGroups, itemsAssignmentG, itemsStudent, NameTeacher]);

    return (
        <>
            <h2>Calificacion de los estudiantes</h2>
            <br />
         
              {studentsWithGroups.length === 0 ? (
                  <p>No hay estudiantes.</p>
              ) : (
                  studentsWithGroups.map((student, i) => (
                    <div className='div2'>

                      <div class="content-container">
                          <h3 class="title">Nombre del estudiante: {student.username} {student.last_name}.</h3>
                          <p class="paragraph">Grupo donde pertenece: {student.group.group_name}</p>
                          <p class="paragraph">Nivel de educacion: {student.group.educational_level}.</p>
                          <select onChange={((e) => setRenderSemestre(e.target.value))} class="custom-select">
                              <option value="null" disabled selected>Seleccione semestre para asignar nota </option>
                              <option value="1°Semestre">1°Semestre</option>
                              <option value="2°Semestre">2°Semestre</option>
                              <option value="3°Semestre">3°Semestre</option>
                              {/* Ponerle una columna de semetre a grades */}
                            
                          </select>
                          <br />
                          <br />

                          {RenderSemestre && (
                            <div className='div-grades-students'>
                              
                              <fieldset>
                                <legend>{RenderSemestre}</legend>
                                <div class="info">
                                  <button onClick={(() => MostrarMaterias(student.group.communication_of_subjects_and_teacher))}>Calificar notas</button>
                                </div>
                              </fieldset> 

                            </div>
                          )}
                      </div>

                      {/* {RenderSemestre === "s1" ? (
                        <p>dd</p>
                      ) : RenderSemestre === "s2" ? (
                        <p>ss</p>
                      ) : RenderSemestre === "s3" ? (
                        <p>3° Semestre</p>
                      ) : (
                        <p></p>
                      )} */}
                    </div>
                    
                  ))
              )};
           
        </>
    );
};

export default GradesTeacher;
