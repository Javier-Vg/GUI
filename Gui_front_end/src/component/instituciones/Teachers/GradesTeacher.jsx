import React, { useEffect, useState } from 'react'
import { fetchStudent } from '../../../Redux/Slices/SliceStudent';
import { fetchGroups } from '../../../Redux/Slices/SliceGroup';
import { fetchAssignmentGroup } from '../../../Redux/Slices/sliceAssignmentGroup';
import { useDispatch, useSelector } from 'react-redux';
import '../../../css/grades_teacher.css';

function GradesTeacher() {

    const [StudentId, setStudent] = useState([]);
    const [GroupId, setGroupId] = useState([]);
    const [JSON, setJSON] = useState([]);

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
      setJSON((prevFiltred) => [...prevFiltred,  StudentId]);
    },[]);

    console.log(JSON);
    
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

  return (
    <>
       <div>GradesTeacher</div>

       {JSON.length === 0 && GroupId.length === 0 ? (
  <p>Not student.</p>
) : (

  JSON.map((item, i) => (
      <div className='div-grades-students' key={`${i}`}>
        <p>{item.username}</p>
        <button>Calificar notas</button>
      </div>
  ))
)}
    </>
  )
}

export default GradesTeacher