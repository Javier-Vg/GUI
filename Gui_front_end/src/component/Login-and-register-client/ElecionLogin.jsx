import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginProfesor from "./LoginProfesor";
import LoginInstitucion from "./LoginInstitucion";
import LoginPadres from "./LoginPadres";
import { getStaff, getStudents, getInstitutions } from "../../service/LoginGui";
import { useNavigate } from "react-router-dom";
import { setInstitutionId } from "../../store/institutionSlice"; // Acción para almacenar el institutionId
import "../../css/Eleccion_login.css";

function ElecionLogin() {
  const [changeComponent, setChangeComponent] = useState("Institución"); // Estado para manejar el rol seleccionado
  const [message, setMessage] = useState("ㅤㅤㅤㅤㅤㅤ"); // Estado para los mensajes de éxito o error
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password); // No recomendable mostrar contraseñas directamente
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Para actualizar el Redux store

  const handleSubmit = async () => {
    // Validaciones de campos vacíos
    if (!username || !password) {
      setMessage("El nombre de usuario y la contraseña no pueden estar vacíos");
      // Eliminar el mensaje después de 5 segundos
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    try {
      const staffData = await getStaff();
      const studentData = await getStudents();
      const institutionData = await getInstitutions();

      const staffMatch = staffData.find(
        (user) => user.name === username && user.password === password
      );
      const studentMatch = studentData.find(
        (user) => user.name === username && user.password === password
      );
      const institutionMatch = institutionData.find(
        (user) => user.name === username && user.password === password
      );

      if (staffMatch) {
        dispatch(setInstitutionId(staffMatch.id)); // Asegúrate de que el id de la institución esté disponible en staffMatch
        setMessage("Inicio de sesión exitoso como Profesor");

        localStorage.setItem("InstitutionID", staffMatch.Institution);
        navigate("/institutions");
      } else if (studentMatch) {
        dispatch(setInstitutionId(studentMatch.id)); // Asegúrate de que el id de la institución esté disponible en studentMatch
        setMessage("Inicio de sesión exitoso como Padre");

        localStorage.setItem("InstitutionID", studentMatch.institution);
        navigate("/home_padres");
      } else if (institutionMatch) {
        dispatch(setInstitutionId(institutionMatch.id));
        setMessage("Inicio de sesión exitoso como Institución");

        localStorage.setItem("InstitutionID", institutionMatch.id);
        navigate("/Institutions");
      } else {
        setMessage("Credenciales inválidas o no existentes");
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setMessage(
        "Ocurrió un error durante el inicio de sesión, por favor intenta nuevamente."
      );
      // Eliminar el mensaje de error después de 5 segundos
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="flex-options">
          <div onClick={() => setChangeComponent("Institución")}>
            Institución
          </div>
          <div onClick={() => setChangeComponent("Profesor")}>Profesor</div>
          <div onClick={() => setChangeComponent("Padre")}>Padre</div>
        </div>

        <div className="grid-login">
          {changeComponent === "Profesor" && <LoginProfesor />}
          {changeComponent === "Institución" && <LoginInstitucion />}
          {changeComponent === "Padre" && <LoginPadres />}
          {/* Mostrar el mensaje de éxito o error */}
        </div>
        <div className="input-msg">
          <div className="div-inp-1">{message && <p>{message}</p>}</div>
          <div  className="div-inp-2">
            <button onClick={handleSubmit} className="btn-login" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElecionLogin;
