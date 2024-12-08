import React, { useEffect, useState } from "react";
import { fetchGrades } from "../../Redux/Slices/SliceGrades";
import { fetchStudent } from "../../Redux/Slices/SliceStudent";
import { fetchAssistenceStudent } from "../../Redux/Slices/SliceAssitenceStudent";
import { Skeleton } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/parents/expediente_notas.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { key } from "../../keys/keys.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function ExpedienteAlumno() {
  const dispatch = useDispatch();

  const [studentID, setStudentID] = useState("");
  const [institutionID, setInstitutionID] = useState("");

  const itemStudent = useSelector((state) => state.student.items);
  const itemGrades = useSelector((state) => state.grades.items);
  const itemAssistence = useSelector((state) => state.assistenceStudent.items);
  

  //objto del grafico
  const [graficRender, setGraficRender] = useState([]);

  useEffect(() => {
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);

        const idStudent = decodedToken.info.id;
        const idInstitution = decodedToken.info.institution;

        // Guardar el ID en una variable local
        setStudentID(idStudent);
        setInstitutionID(idInstitution);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    dispatch(fetchGrades()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchAssistenceStudent()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  const [selectedButton, setSelectedButton] = useState("Enero");

  const buttons = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleButtonClick = (button) => {
    //nombre del mes
    setSelectedButton(button);
  };

  const monthNameToNumber = (monthName) => {
    const monthMap = {
      Enero: "01",
      Febrero: "02",
      Marzo: "03",
      Abril: "04",
      Mayo: "05",
      Junio: "06",
      Julio: "07",
      Agosto: "08",
      Setiembre: "09",
      Octubre: "10",
      Noviembre: "11",
      Diciembre: "12",
    };
    return monthMap[monthName] || "Invalid month";
  };

  //Cambia la grafica:
  useEffect(() => {
    // Objeto para contar las ocurrencias
    const attendanceCount = {
      presente: 0,
      ausente: 0,
      tardia: 0,
    };

    const mes = monthNameToNumber(selectedButton);

    // Filtrar y sobrescribir la misma variable
    let data = itemAssistence.filter((item) => {
    
      const [year, month, day] = item.dateToday.split("-");

      return month === mes && item.institution === institutionID;
    });
  
    // Iterar sobre el array de datos
    data.forEach((item) => {
      // Iterar sobre el JSON de 'daily_attendance'
      Object.keys(item.daily_attendance).map((value, i) => {
        if (value == studentID) {
          // Contar las ocurrencias
          if (item.daily_attendance[value] === "Puntual") {
            attendanceCount.presente += 1;
          } else if (item.daily_attendance[value] === "Inpuntual") {
            attendanceCount.ausente += 1;
          } else if (item.daily_attendance[value] === "Ausente") {
            attendanceCount.tardia += 1;
          }
        }
      });
    });

    

    setGraficRender([
      { category: "Puntualidades", count: attendanceCount.presente },
      { category: "Inpuntualidades", count: attendanceCount.tardia },
      { category: "Ausencias", count: attendanceCount.ausente },
    ]);
  }, [selectedButton, institutionID]);

  return (
    <div className="div-core-expediente">
      {/* <h2>Expediente</h2> */}
      <div className="container2">
        <div className="fade-in">
          <br />
          {itemStudent &&
            itemStudent.map(
              (st, i) =>
                st.id === studentID && (
                  <div className="div-student-show" key={i}>
                    <div className="box1">
                      <img className="img-student" src={st.imagen_url} alt="" />
                      <span className="span-alumno">
                        {st.username} {st.last_name}
                      </span>
                      <span className="span-alumno">
                        Número de identificación: {st.identification_number}
                      </span>
                      <span className="span-alumno">
                        Fecha de nacimiento: <br /> {st.birthdate_date}
                      </span>
                    </div>
                    <div className="box2">
                      <span className="span-alumno">Grado: {st.grade}</span>
                      <span className="span-alumno">
                        Estado académico: {st.academic_status}
                      </span>
                      <span className="span-alumno">
                        Información de alergias: <br />
                        {st.allergy_information}
                      </span>
                      <span className="span-alumno">
                        Información de contacto: {st.contact_information}
                      </span>
                      <span className="span-alumno">Email: {st.email}</span>
                      <span className="span-alumno">
                        Teléfono del tutor: {st.guardian_phone_number}
                      </span>
                      <span className="span-alumno">
                        Nombre del tutor: {st.name_guardian}
                      </span>
                      <span className="span-alumno">
                        Pago mensual: {st.monthly_payent_students}
                      </span>
                      <span className="span-alumno">
                        Tipo de estudiante: {st.type_of_student}
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>

        <div className="fade-in">
          {/* <Mapa/> */}
          
          <iframe
            className="iframe"
            style={{ border: 1 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${9.981642851164809},${-84.75704310364125}&zoom=16`}
            allowFullScreen
          />
        </div>

        <div className="fade-in">
            <p>Filtrado de asistencias:</p>
          <div className="div-grafic">
            <div className="button-container-grafic">
              {buttons.map((button) => (
                <button
                  key={button}
                  className={`btn-grafic ${
                    selectedButton === button ? "selected" : ""
                  }`}
                  onClick={() => handleButtonClick(button)}
                >
                  {button} <CalendarMonthIcon/>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-in">
        <h4 className="info-h3-child">Observe el registro de asistencias aqui:</h4>
        <div>
              <BarChart
                width={435}
                height={270}
                data={graficRender}
                margin={{ top: 20, right: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#48e" animationDuration={500} />
              </BarChart>
            </div>
        </div>
        <br />
    
      </div>
    </div>
  );
}

export default ExpedienteAlumno;
