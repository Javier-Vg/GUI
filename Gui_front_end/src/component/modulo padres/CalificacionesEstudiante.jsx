import React, { useEffect, useState } from 'react';
import '../../css/grades_student_result.css';
import { fetchStudent } from '../../Redux/Slices/SliceStudent';
import { fetchGrades } from '../../Redux/Slices/SliceGrades';
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


function CalificacionesEstudiante() {

  const dispatch = useDispatch();
  const itemStudent = useSelector(state => state.student.items);
  const itemGrades = useSelector(state => state.grades.items);

  const [studentID, setStudentID] = useState("");
  const [period, setPeriod] = useState("");

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
    dispatch(fetchStudent()); // Llama a la acción para obtener productos al cargar el componente
    dispatch(fetchGrades()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  return (
    <div className="grades-container">
        {/* <button>¿Como se califica?</button> */}
      <h2>Resultados de Calificaciones del<select onChange={((e) => setPeriod(e.target.value))}>
        <option value="1°Trimestre">1°Trimestre</option>
        <option value="2°Trimestre">2°Trimestre</option>
        <option value="3°Trimestre">3°Trimestre</option>
      
        </select></h2>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>

          {itemGrades.map((item, index) => (
           
                item.student == studentID && item.period == period && (
                   Object.keys(item.grade_results).map((key, i) => (
                    <tr key={`${index} - ${i}`}>
                        <td>{key}</td>
                        <td>
                            <div className="likert-scale">
                            {["😐","😣","🫠","😲","😃","😁"].map((num) => (
                                <span
                                key={num}
                                className={`likert-option ${num <= item.grade ? 'selected' : ''}`}
                                >
                                {num}
                                </span>
                            ))}
                            </div>
                        </td>
                    </tr>
                    ))
                  )
        
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CalificacionesEstudiante