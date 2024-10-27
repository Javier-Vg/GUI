import React, { useEffect, useState } from 'react';
import { fetchGrades } from '../../Redux/Slices/SliceGrades';
import { fetchStudent } from '../../Redux/Slices/SliceStudent';
// import {Skeleton} from "@nextui-org/skeleton";
import {Card, Skeleton} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import '../../css/expediente_notas.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { key } from '../map/keyMap';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function ExpedienteAlumno() {
  const dispatch = useDispatch();

  const [studentID, setStudentID] = useState("")

  // Datos de asistencia
 const data = [
  { week: 'Semana 1', asistencia: 85 },
  { week: 'Semana 2', asistencia: 90 },
  { week: 'Semana 3', asistencia: 75 },
  { week: 'Semana 4', asistencia: 95 },
  { week: 'Semana 5', asistencia: 80 },
  { week: 'Semana 6', asistencia: 98 },
];


  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cambiar el tema basado en la preferencia del usuario
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Función para alternar el tema
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme; // Cambia la clase del body
  };

  
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
    <div className='div-core-expediente'>

      {/* <h2>Expediente</h2> */}
      <Skeleton className="w-2/5 rounded-lg">
        <div className="container2">

          <div className="fade-in">
            <div className="theme-toggle">
              <button onClick={toggleTheme}>
                {isDarkMode ? '🌞 Modo Día' : '🌜 Modo Noche'}
              </button>
            </div>

            
            <br />
            {itemStudent && (
              itemStudent.map((st, i) => (
                st.id === studentID && (
                  <div className='div-student-show' key={i}>
            <div className='box1'>
              <img className='img-student' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYPJMISkUhApPtH3hkTzEftdcmD2IRusYOSidBXgzffIelPjTSM1u2YW5SPrYrgRGhJM&usqp=CAU" alt="" />
              <span className='student-name'>{st.username} {st.last_name}</span>
              <span className='identification-number'>Número de identificación: {st.identification_number}</span>
              <span className='birthdate'>Fecha de nacimiento: <br /> {st.birthdate_date}</span>
            </div>
            <div className='box2'>
              <span className='grades'>Grado: {st.grade}</span>
              <span className='academic-status'>Estado académico: {st.academic_status}</span>
              <span className='allergy-information'>Información de alergias: <br />{st.allergy_information}</span>
              <span className='contact-information'>Información de contacto: {st.contact_information}</span>
              <span className='email'>Email: {st.email}</span>
              <span className='guardian-phone'>Teléfono del tutor: {st.guardian_phone_number}</span>
              <span className='guardian-name'>Nombre del tutor: {st.name_guardian}</span>
              <span className='monthly-payment'>Pago mensual: {st.monthly_payent_students}</span>
              <span className='type-of-student'>Tipo de estudiante: {st.type_of_student}</span>
            </div>
          </div>
                )
              ))
            )}
          </div>

          <div className="fade-in">
            {/* <Mapa/> */}
            <iframe
                className='iframe'
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 1 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${9.981642851164809},${-84.75704310364125}&zoom=17`}
                allowFullScreen
              />

          </div>

          <div className="fade-in">
            <div className='div-grafic'>
              <div>

                <ResponsiveContainer width="80%" height={180}>
                  <LineChart data={data}>
                    <XAxis dataKey="week" stroke="#fff" className="custom-x-axis" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line 
                      type="monotone" 
                      dataKey="asistencia" 
                      stroke="#ff7300" 
                      strokeWidth={3} 
                      dot={{ r: 3, fill: '#ff7300' }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>

              </div>

              <div>
                  <p></p>

              </div>

            </div>
          
          </div>

          
        </div>
      </Skeleton>
            
    </div>
  )
}

export default ExpedienteAlumno