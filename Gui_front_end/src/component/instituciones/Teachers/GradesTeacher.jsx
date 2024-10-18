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

    useEffect(() => {
        dispatch(fetchStudent());
        dispatch(fetchAssignmentGroup());
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        const tempStudents = [];

        for (const group of itemsGroups) {
            const isTeacherGroup = Object.values(group.communication_of_subjects_and_teacher).includes(NameTeacher);

            if (isTeacherGroup) {
                for (const assignment of itemsAssignmentG) {
                    if (assignment.group === group.id) {
                        const student = itemsStudent.find(s => s.id === assignment.student);
                        if (student) {
                            tempStudents.push({ ...student, groupId: group });
                        }
                    }
                }
            }
        }

        setStudentsWithGroups(tempStudents);
    }, [itemsGroups, itemsAssignmentG, itemsStudent, NameTeacher]);

    return (
        <>
            <div>GradesTeacher</div>

            {studentsWithGroups.length === 0 ? (
                <p>No hay estudiantes.</p>
            ) : (
                studentsWithGroups.map((student, i) => (
                  
                  
                    <div className='div1'>    
                      <div className='div-grades-students'>
                        <fieldset>
                          <legend>1° Semestre</legend>
                         
                          <div class="info">
                            <button>Calificar notas</button>
                          </div>
                         
                        </fieldset> 
                      </div>

                      <div className='div-grades-students'>

                        <fieldset>
                          <legend>2° Semestre</legend>
                          
                          <div class="info">
                            <button>Calificar notas</button>
                          </div>
                          
                        </fieldset>
                      </div>
                                      
                      <div className='div-grades-students'>
                        <fieldset>
                          <legend>3° Semestre</legend>
                         
                          <div class="info">
                            <button>Calificar notas</button>
                          </div>
                         
                        </fieldset>
                      </div> 

                    </div>
                  
                  
                ))
            )}
        </>
    );
}

export default GradesTeacher;
