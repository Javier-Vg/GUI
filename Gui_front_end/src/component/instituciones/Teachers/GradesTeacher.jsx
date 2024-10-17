import React, { useEffect, useState } from 'react'
import { fetchStudent } from '../../../Redux/Slices/SliceStudent';
import { fetchGroups } from '../../../Redux/Slices/SliceGroup';
import { fetchAssignmentGroup } from '../../../Redux/Slices/sliceAssignmentGroup';
import { useDispatch, useSelector } from 'react-redux';

function GradesTeacher() {

    const [StudentId, setStudent] = useState([]);
    const [GroupId, setGroupId] = useState([]);
    const [Mix, setMix] = useState({ student_id: [], group_id: [] });

    const NameTeacher = useSelector( //Nombre de la institucion traigo de redux
        (state) => state.infInstitution.nameInstitution
    );

    //Redux
   const itemsStudent = useSelector((state) => state.student.items);
   const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
   const itemsGroups = useSelector((state) => state.group.items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
        dispatch(fetchAssignmentGroup());
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        setStudent([]);
        for (const group in itemsGroups) {
          Object.values(itemsGroups[group].communication_of_subjects_and_teacher).forEach((value) => {
            if (value == NameTeacher) { 
              for (const key in itemsAssignmentG) {
                //Comparo los ids de grupo de assignment y extraigo el id estudiante       
                if (itemsAssignmentG[key].group == itemsGroups[group].id) { //Si el id de grupo es igual al de assignment, extrae el idEstudiante.
                  for (const student in itemsStudent) {                
                    if (itemsStudent[student].id == itemsAssignmentG[key].student) {
                      // Actualiza el valor de la clave correspondiente
                      setStudent((prevFiltred) => [...prevFiltred, itemsStudent[student]]);//Agrega al array el estudiante.
                      setGroupId((prevFiltred) => [...prevFiltred,  itemsGroups[group].id]);//Obtiene el id del grupo donde pertenece ese estudiante.
                    };
                  };
                };
              };
            };  
          });
        };
    },[]);

    useEffect(() => { //Une las 2 listas para luego mapearlas
        Mix([]);//Setea el estado para que no renderize 2 veces.
        setMix((prevMix) => ({
            student_id: [...prevMix.student_id, StudentId],
            group_id: [...prevMix.group_id, GroupId], // o como lo necesites
        }));

    },[StudentId]);

  return (
    <>
      <div>GradesTeacher</div>
        {StudentId.length === 0 ? (
            <p>No students found.</p>
        ) : (
        <ul>
            {Mix.map((student, i) => (
            <li key={i}>{student}</li>
            ))}
        </ul>
        )}
    
    </>
  )
}

export default GradesTeacher