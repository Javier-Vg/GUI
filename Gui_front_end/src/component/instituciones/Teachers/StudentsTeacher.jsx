import React, { useEffect } from 'react';
import { fetchStudent } from '../../../Redux/Slices/SliceStudent';
import { useDispatch, useSelector } from 'react-redux';
import '../../../css/students_view_teacher.css';
function StudentsTeacher() {
  const [Student, setStudent] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

   //Redux
   const itemsStudent = useSelector((state) => state.student.items); // Obtén el ID de la institución

  useEffect(() => {
    setStudent([]);
    for (let i = 0; i < itemsStudent.length; index++) {
      if (itemsStudent) { //Valida nombre del profe y institucion
        // Actualiza el valor de la clave correspondiente
        setStudent((prevFiltred) => [...prevFiltred, items[i]]);
      }; 
    };
  },[])
  
  //Ancho y alto de las columnas de la tabla
  const cellWidth = 300;
  const cellHeight = 45;
  
  return (
    <>
    <h1>Estudiantes</h1>
    <div className='div-svg'>
      
      <br />

    <svg className='svg-1' width={cellWidth * 12} height={cellHeight * (itemsStudent.length + 1)}>
      {/* Header */}
      <rect x="0" y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 2} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 3} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 4} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 5} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 6} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 7} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 8} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 9} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 11} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 12} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 13} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 14} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <text x={cellWidth / 2} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Nombre</text>
      <text x={cellWidth * 1.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Apellido</text>
      <text x={cellWidth * 2.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">ID</text>
      <text x={cellWidth * 3.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Fecha de Nacimiento</text>
      <text x={cellWidth * 4.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Grado</text>
      <text x={cellWidth * 5.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Estatus Academico</text>
      <text x={cellWidth * 6.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Informacion de alergias</text>
      <text x={cellWidth * 7.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Correo</text>
      <text x={cellWidth * 8.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Numero del encargado del niño</text>
      <text x={cellWidth * 9.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Nombre del encargado</text>
      <text x={cellWidth * 10.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Pago mensual del estudiante</text>

      {/* Rows */}
      {itemsStudent.map((item, index) => (
        <g key={index} transform={`translate(0, ${cellHeight * (index + 1)})`}>
          <rect x="0" y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 2} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 3} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 4} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 5} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 6} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 7} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 8} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 9} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 10} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 11} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <text x={cellWidth / 2} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.username}</text>
          <text x={cellWidth * 1.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.last_name}</text>
          <text x={cellWidth * 2.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.identification_number}</text>
          <text x={cellWidth * 3.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.birthdate_date}</text>
          <text x={cellWidth * 4.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.grade}</text>
          <text x={cellWidth * 5.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.academic_status}</text>
          <text x={cellWidth * 6.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.allergy_information}</text>
          <text x={cellWidth * 7.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.contact_information}</text>
          <text x={cellWidth * 8.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.email}</text>
          <text x={cellWidth * 9.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.guardian_phone_number}</text>
          <text x={cellWidth * 10.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.monthly_payent_students}</text>
        </g>
      ))}
    </svg>

    </div>
    </>
  )
}

export default StudentsTeacher
