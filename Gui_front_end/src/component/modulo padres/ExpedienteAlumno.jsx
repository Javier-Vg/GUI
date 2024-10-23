import React, { useEffect, useState } from 'react';
import { fetchGrades } from '../../Redux/Slices/SliceGrades'
import { fetchStudent } from '../../Redux/Slices/SliceStudent'
// import {Skeleton} from "@nextui-org/skeleton";
import {Card, Skeleton} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import '../../css/expediente_notas.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


function ExpedienteAlumno() {
  const dispatch = useDispatch();

  const [studentID, setStudentID] = useState("")
  
  
  const itemStudent = useSelector(state => state.student.items);
  const itemGrades = useSelector(state => state.grades.items);

  //Une los objetos
  const [studentWithGrades, setStudentWithGrades] = useState([]);

  //Maneja los cambios de los periodos.
  const [semestre, setSemestre] = useState("");

  useEffect(() => {
    const token = Cookies.get('AuthCookie'); 

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);  
        const idStudent = decodedToken.ID;
        // Guardar el ID en una variable local
        setStudentID(idStudent);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    dispatch(fetchGrades()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  useEffect(() => {
    const objectStudentWithGroup = [];
    for (const obj in itemGrades) {
      
      objectStudentWithGroup.push({ ...itemStudent[obj], grade: itemGrades[obj] });
    }
    setStudentWithGrades(objectStudentWithGroup);
  },[itemGrades, itemStudent]);

  return (
    <div>
      <h2>Expediente</h2>
      <Skeleton className="w-2/5 rounded-lg">
        <div class="container2">

          <div class="item1">

            {itemStudent.map((std, k) => (
              std.id == studentID && (
                <div key={k}>
                  <div></div>
                </div>
              )
            ))}

            <h1 className='h1-info'>Informacion personal:</h1>
            
            
          </div>

          <div class="item2">
            
            info horarioS
            
          </div>

          <div class="item3">
            {/* <h1 className='h1-info'>Notas del estudiante:</h1> */}
            <div className='div-btn-trimestre'>
              <button onClick={(() => setSemestre("1°Trimestre"))}>1°Trimestre</button>
              <button onClick={(() => setSemestre("2°Trimestre"))}>2°Trimestre</button>
              <button onClick={(() => setSemestre("3°Trimestre"))}>3°Trimetre</button>
            </div>
            
            {semestre == "" ? (
              <p>No hay</p>
            ) : (
              itemGrades ? (
                itemGrades.map((grad, k) => (
                  grad.student == studentID && grad.period == semestre && (
                   Object.keys(grad.grade_results).map((key, i) => (
                      <div key={`${k} - ${i}`}>
                        <p>Key: {key}</p>
                        <p>Value: {grad.grade_results[key]}</p>
                      </div>
                    ))
                  )
                ))
                
              ) : (
                <p>No existen notas revisadas.</p>
              )
            )}

          
          </div>
        </div>
      </Skeleton>
            
    </div>
  )
}

export default ExpedienteAlumno