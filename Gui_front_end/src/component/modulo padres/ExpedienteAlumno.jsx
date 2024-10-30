import React, { useEffect, useState } from "react";
import { fetchGrades } from "../../Redux/Slices/SliceGrades";
import { fetchStudent } from "../../Redux/Slices/SliceStudent";
import { fetchAssistenceStudent } from "../../Redux/Slices/SliceAssitenceStudent";
import {  Skeleton } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/parents/expediente_notas.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { key } from '../../keys/keys.js';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function ExpedienteAlumno() {
  const dispatch = useDispatch();

  const [studentID, setStudentID] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);
  // Cambiar el tema basado en la preferencia del usuario
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Función para alternar el tema
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme; // Cambia la clase del body
  };

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
        
        // Guardar el ID en una variable local
        setStudentID(idStudent);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    dispatch(fetchGrades()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchAssistenceStudent()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  const [selectedButton, setSelectedButton] = useState("");

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
    setSelectedButton(button);
  };

  //tranforma de mes a numero
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
      Septiembre: "09",
      Octubre: "10",
      Noviembre: "11",
      Diciembre: "12",
    };

    return monthMap[monthName];
  };


  //Cambia la grafica:
  useEffect(() => {
    // Objeto para contar las ocurrencias
    const attendanceCount = {
      presente: 0,
      ausente: 0,
      tardia: 0,
    };

    const targetInstitutionId = 1; // ID de la institución que deseas filtrar
    const mes = monthNameToNumber(selectedButton);

    // Filtrar y sobrescribir la misma variable
    let data = itemAssistence.filter((item) => {
      const [year, month, day] = item.dateToday.split("/");

      return month === mes && item.institution === targetInstitutionId;
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
          };
        };
      });
    });

    setGraficRender([
      { category: 'Puntualidades', count: attendanceCount.presente },
      { category: 'Inpuntualidades', count: attendanceCount.tardia },
      { category: 'Ausencias', count: attendanceCount.ausente },
    ]);
  }, [selectedButton]);


  return (
    <div className="div-core-expediente">
      {/* <h2>Expediente</h2> */}
      <Skeleton className="w-2/5 rounded-lg">
        <div className="container2">

          <div className="fade-in">
          
            <div className="theme-toggle">
              <br />
              <button className="btn-darkLight" onClick={toggleTheme}>
                {isDarkMode ? "🌞 Modo Día" : "🌜 Modo Noche"}
              </button>
            </div>

            <br />
            {itemStudent &&
              itemStudent.map(
                (st, i) =>
                  st.id === studentID && (
                    <div className="div-student-show" key={i}>
                      <div className="box1">
                        <img
                          className="img-student"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYPJMISkUhApPtH3hkTzEftdcmD2IRusYOSidBXgzffIelPjTSM1u2YW5SPrYrgRGhJM&usqp=CAU"
                          alt=""
                        />
                        <span className="student-name">
                          {st.username} {st.last_name}
                        </span>
                        <span className="identification-number">
                          Número de identificación: {st.identification_number}
                        </span>
                        <span className="birthdate">
                          Fecha de nacimiento: <br /> {st.birthdate_date}
                        </span>
                      </div>
                      <div className="box2">
                        <span className="grades">Grado: {st.grade}</span>
                        <span className="academic-status">
                          Estado académico: {st.academic_status}
                        </span>
                        <span className="allergy-information">
                          Información de alergias: <br />
                          {st.allergy_information}
                        </span>
                        <span className="contact-information">
                          Información de contacto: {st.contact_information}
                        </span>
                        <span className="email">Email: {st.email}</span>
                        <span className="guardian-phone">
                          Teléfono del tutor: {st.guardian_phone_number}
                        </span>
                        <span className="guardian-name">
                          Nombre del tutor: {st.name_guardian}
                        </span>
                        <span className="monthly-payment">
                          Pago mensual: {st.monthly_payent_students}
                        </span>
                        <span className="type-of-student">
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
              src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${9.981642851164809},${-84.75704310364125}&zoom=17`}
              allowFullScreen
            />
          </div>

          <div className="fade-in">
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
                    {button}
                  </button>
                ))}
              </div>

              <div>
                <BarChart
                  width={400}
                  height={240}
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
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </Skeleton>
    </div>
  );
}

export default ExpedienteAlumno;
