import React, { useEffect, useState } from "react";
import { fetchStudent } from "../../../Redux/Slices/SliceStudent";
import { fetchGroups } from "../../../Redux/Slices/SliceGroup";
import { fetchAssignmentGroup } from "../../../Redux/Slices/sliceAssignmentGroup";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/students_view_teacher.css";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
function StudentsTeacher() {
  const [Student, setStudent] = useState([{username: "juan"}]);
  const [NameTeacher, setnameTeacher] = useState("")

  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('AuthCookie'); 

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);; 
        const username = decodedToken.Name;

        setnameTeacher(username);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchAssignmentGroup());
    dispatch(fetchGroups());
  }, [dispatch]);

  //Redux
  const itemsStudent = useSelector((state) => state.student.items);
  const itemsAssignmentG = useSelector((state) => state.groupAssignment.items);
  const itemsGroups = useSelector((state) => state.group.items);

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
                  
                  setStudent(objetosFiltrados);
                  
                };
              };
            };
          };
        };
      });
    };
  }, []);
  
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
      <h1>Estudiantes</h1>
      <br />
      <br />
      {Student && (
        <div className="div-svg">
          {Student.length === 0 ? (
            <p>Todavia no tiene estudiantes que cursen alguna materia suya</p>
          ) : (
            <svg
              className="svg-1"
              width={cellWidth * 12}
              height={cellHeight * (itemsStudent.length + 1)}
            >
              {/* Header */}
              <rect
                x="0"
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 2}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 3}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 4}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 5}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 6}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 7}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 8}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 9}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 10}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 11}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <rect
                x={cellWidth * 12}
                y="0"
                width={cellWidth}
                height={cellHeight}
                fill="#ddd"
              />
              <text
                x={cellWidth / 2}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Nombre
              </text>
              <text
                x={cellWidth * 1.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Apellido
              </text>
              <text
                x={cellWidth * 2.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                ID
              </text>
              <text
                x={cellWidth * 3.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Fecha de Nacimiento
              </text>
              <text
                x={cellWidth * 4.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Grado
              </text>
              <text
                x={cellWidth * 5.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Estatus Academico
              </text>
              <text
                x={cellWidth * 6.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Informacion de alergias
              </text>
              <text
                x={cellWidth * 7.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Correo
              </text>
              <text
                x={cellWidth * 8.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Numero del encargado del niño
              </text>
              <text
                x={cellWidth * 9.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Nombre del encargado
              </text>
              <text
                x={cellWidth * 10.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Pago mensual del estudiante
              </text>
              <text
                x={cellWidth * 11.5}
                y={cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill="black"
              >
                Imagen del estudianteE
              </text>

              {/* Rows */}
              {Student.map((item, index) => (
                <g
                  key={index}
                  transform={`translate(0, ${cellHeight * (index + 1)})`}
                >
                  <rect
                    x="0"
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 2}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 3}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 4}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 5}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 6}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 7}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 8}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 9}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 10}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 11}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <rect
                    x={cellWidth * 12}
                    y="0"
                    width={cellWidth}
                    height={cellHeight}
                    fill="#f9f9f9"
                  />
                  <text
                    x={cellWidth / 2}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.username}
                  </text>
                  <text
                    x={cellWidth * 1.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.last_name}
                  </text>
                  <text
                    x={cellWidth * 2.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.identification_number}
                  </text>
                  <text
                    x={cellWidth * 3.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.birthdate_date}
                  </text>
                  <text
                    x={cellWidth * 4.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.grade}
                  </text>
                  <text
                    x={cellWidth * 5.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.academic_status}
                  </text>
                  <text
                    x={cellWidth * 6.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.allergy_information}
                  </text>
                  <text
                    x={cellWidth * 7.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.email}
                  </text>
                  <text
                    x={cellWidth * 8.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.guardian_phone_number}
                  </text>
                  <text
                    x={cellWidth * 9.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.name_guardian}
                  </text>
                  <text
                    x={cellWidth * 10.5}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                  >
                    {item.monthly_payent_students}
                  </text>
                  <text
                    x={cellWidth * 10.9}
                    y={cellHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="black"
                    className="aImg"
                  >
                    
                    <a onClick={(() =>handleOpenModal(item.imagen_url))}>Ver Imagen</a>
                  </text>
                </g>
              ))}
            </svg>
          )};
        </div>
      )}

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
