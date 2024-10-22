import React, { useEffect, useState } from 'react';
import { fetchGrades } from '../../Redux/Slices/SliceGrades'
import { fetchStudent } from '../../Redux/Slices/SliceStudent'
// import {Skeleton} from "@nextui-org/skeleton";
import {Card, Skeleton} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import '../../css/expediente_notas.css';

function ExpedienteAlumno() {
  const dispatch = useDispatch();

  //Redux
  const itemStudent= useSelector(state => state.student.items);
  const itemGrades= useSelector(state => state.grades.items);

  useEffect(() => {
    dispatch(fetchGrades()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);


  return (
    <div>
      <h2>Expediente</h2>
        <div className="div-core">
          <div className='box1'>


          </div>
          
          <div className='box2'>


          </div>

          <div className='box3'>


          </div>
          {/* <Skeleton className="w-2/5 rounded-lg">   */}
            
            {/* {itemStudent.map((i, m) => (
              <div key={m}>
                <h4>{i.username}</h4>
                <h4>{i.last_name}</h4>
                <h4>{i.identification_number}</h4> 
                <h4>{i.grade}</h4>
              </div>
            ))} */}
          {/* </Skeleton> */}
        </div>
     
    </div>
  )
}

export default ExpedienteAlumno