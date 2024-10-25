import React, { useEffect, useState } from 'react';
import { fetchGrades } from '../../Redux/Slices/SliceGrades'
import { fetchStudent } from '../../Redux/Slices/SliceStudent'
// import {Skeleton} from "@nextui-org/skeleton";
import {Card, Skeleton} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import '../../css/expediente_notas.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import MapsContainer from '../map/Map';

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
        const idStudent = decodedToken.id;
        
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

      {/* <h2>Expediente</h2> */}
      <Skeleton className="w-2/5 rounded-lg">
        <div class="container2">

          <div class="fade-in">
            <h1 className='h1-info'>Informacion personal:</h1>
              <br />
            {itemStudent && (
             itemStudent.map((st, i) => (
              st.id == studentID && (
                <div className='div-student-show' key={i}>

                  <div className='box1'>
                    <img className='img-student' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYPJMISkUhApPtH3hkTzEftdcmD2IRusYOSidBXgzffIelPjTSM1u2YW5SPrYrgRGhJM&usqp=CAU" alt="" />
                    <p>{st.username} {st.last_name}</p>
                    <p>Numero de identificacion: {st.identification_number}</p>
                  </div>

                  <div className='box2'>
                  
                    <p>birthdate_date: {st.birthdate_date}</p>
                    <p>grade: {st.grade}</p>
                    <p>academic_status: {st.academic_status}</p>
                    <p>allergy_information: {st.allergy_information}</p>
                    <p>contact_information:{ st.contact_information}</p>
                    <p>email: {st.email}</p>
                    <p>guardian_phone_number: {st.guardian_phone_number}</p>
                    <p>name_guardian: {st.name_guardian}</p>
                    <p>institution: {st.institution}</p>
                    <p>group: {st.group}</p>
                    <p>monthly_payment_students: {st.monthly_payent_students}</p>
                    <p>type_of_student: {st.type_of_student}</p>
                    
                  </div>
                </div>
              )
            ))
            )}
          </div>

          <div class="fade-in">
            
            <MapsContainer/>
            
          </div>

          <div class="fade-in">
          </div>

          
        </div>
      </Skeleton>
            
    </div>
  )
}

export default ExpedienteAlumno