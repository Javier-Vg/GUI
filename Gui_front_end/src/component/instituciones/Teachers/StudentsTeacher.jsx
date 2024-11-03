import React, { useEffect, useState } from "react";
import { fetchStudent } from "../../../Redux/Slices/SliceStudent";
import { fetchGroups } from "../../../Redux/Slices/SliceGroup";
import { fetchAssignmentGroup } from "../../../Redux/Slices/sliceAssignmentGroup";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/students_view_teacher.css";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function StudentsTeacher() {
  const [StudentWithoutF, setStudentWithoutF] = useState([{username: "juan"}]);
  const [Student, setStudent] = useState([]);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [NameTeacher, setnameTeacher] = useState("")

  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('AuthCookie'); 

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);; 
        const username = decodedToken.info.username;

        setnameTeacher(username);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchAssignmentGroup());
    dispatch(fetchGroups());
  }, [dispatch]);


  useEffect(() => {
    // Filtrar los estudiantes que no tienen la letra "F" en el nombre de usuario
    const filtro = StudentWithoutF.filter(student => 
        !student.username.toLowerCase().includes('f') &&
        student.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStudent(filtro);
}, [StudentWithoutF, searchTerm]);
  //Redux
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const itemsGroups = useSelector((state) => state.group.items);

  console.log(itemsStudent);
  

  useEffect(() => {
    setStudent([]); //Lo setea para que no lo integre 2 veces
    let studentsArray = [];

    for (const group in itemsGroups) {
      Object.values(
        itemsGroups[group].communication_of_subjects_and_teacher
      ).forEach((value) => {
        if (value == NameTeacher) {
          for (const key in itemsAssignmentG) {
            //Comparo los ids de grupo de assignment y extraigo el id estudiante
            if (itemsAssignmentG[key].group == itemsGroups[group].id) {
              //Si el id de grupo es igual al de assignment, extrae el idEstudiante.
              for (const student in itemsStudent) {
                // Crear un conjunto de usernames existentes
                if (itemsStudent[student].id == itemsAssignmentG[key].student) {

                  // Crear un conjunto para rastrear usernames únicos
                  let usernamesUnicos = new Set();

                  studentsArray.push(itemsStudent[student]); //Almacena el objeto de estudiante para iterarlo                 
                  
                  // Filtrar los objetos omitiendo duplicados
                  const objetosFiltrados = studentsArray.filter(obj => {
                    if (usernamesUnicos.has(obj.username)) {

                      
                      return false; // Omitir si ya existe
                    } else {
                      usernamesUnicos.add(obj.username); // Agregar al conjunto
                      return true; // Mantener si es único
                    }
                  });

                  
                  setStudentWithoutF(objetosFiltrados);
                  
                };
              };
            };
          };
        };
      });
    };
  }, [NameTeacher]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [ImgValue, setImgValue] = useState(false);
  const handleOpenModal = ((image) => {
    console.log(image);
    
    setModalOpen(true);
    setImgValue(image);
  });
  const handleCloseModal = () => setModalOpen(false);

  //Altura y ancho del svg.
  const cellWidth = 350;
  const cellHeight = 38;

  return (
    <>
      <div className="student-container">
  <h1 className="student-title">Estudiantes</h1>
  <p className="student-description">Total de estudiantes que reciben sus clases:</p>
  
  {Student && (
    <div className="student-svg-wrapper">
      {Student.length === 0 ? (
        <p className="no-students-message">Todavía no tiene estudiantes que cursen alguna materia suya</p>
      ) : (
        <svg className="student-svg" width={cellWidth * 12} height={cellHeight * (Student.length + 1)}>
          {/* Header */}
          <g className="header-row">
            {["Nombre", "Apellido", "ID", "Fecha de Nacimiento", "Grado", "Estatus Académico", "Información de Alergias", "Correo", "Número del Encargado", "Nombre del Encargado", "Pago Mensual", "Imagen"].map((text, index) => (
              <g key={index} transform={`translate(${cellWidth * index}, 0)`}>
                <rect width={cellWidth} height={cellHeight} fill="#ddd" />
                <text x={cellWidth / 2} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">{text}</text>
              </g>
            ))}
          </g>

          {/* Rows */}
          {Student.map((item, index) => (
            <g key={index} transform={`translate(0, ${cellHeight * (index + 1)})`} className="student-row">
              {[
                item.username,
                item.last_name,
                item.identification_number,
                item.birthdate_date,
                item.grade,
                item.academic_status,
                item.allergy_information,
                item.email,
                item.guardian_phone_number,
                item.name_guardian,
                item.monthly_payent_students,
                <a onClick={() => handleOpenModal(item.imagen_url)} className="image-link">Ver Imagen</a>
              ].map((content, colIndex) => (
                <g key={colIndex} transform={`translate(${cellWidth * colIndex}, 0)`}>
                  <rect width={cellWidth} height={cellHeight} fill="#f9f9f9" />
                  <text x={cellWidth / 2} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{content}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      )}
    </div>
  )}
</div>

      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <img src={ImgValue} alt="Imagen Modal" className="modal-image" />
            <button className="close-button" onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )};
    </>
  );
}

export default StudentsTeacher;
