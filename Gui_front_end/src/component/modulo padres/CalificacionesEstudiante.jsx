import React, { useEffect, useState } from 'react';
import '../../css/grades_student_result.css';
import { fetchStudent } from '../../Redux/Slices/SliceStudent';
import { fetchGrades } from '../../Redux/Slices/SliceGrades';
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function CalificacionesEstudiante() {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const itemStudent = useSelector(state => state.student.items);
  const itemGrades = useSelector(state => state.grades.items);

  const [studentID, setStudentID] = useState("");
  const [period, setPeriod] = useState("1°Trimestre"); // Valor inicial

  useEffect(() => {
    const token = Cookies.get('AuthCookie');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);  
        const idStudent = decodedToken.info.id;
        setStudentID(idStudent);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    dispatch(fetchStudent());
    dispatch(fetchGrades());
  }, [dispatch]);

  // Filtrar calificaciones para el periodo seleccionado
  const filteredGrades = itemGrades.filter(item => item.student === studentID && item.period === period);

  return (
    <div className="grades-container">
      <h2>Resultados de Calificaciones del
        <select onChange={(e) => setPeriod(e.target.value)} value={period}>
          <option value="1°Trimestre">1°Trimestre</option>
          <option value="2°Trimestre">2°Trimestre</option>
          <option value="3°Trimestre">3°Trimestre</option>
        </select>
      </h2>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.length > 0 ? (
            filteredGrades.map((item, index) => (
              Object.keys(item.grade_results).map((key, i) => (
                <tr key={`${index} - ${i}`}>
                  <td>{key}</td>
                  <td>
                  {item.grade_results[key] <= 20 ? (
                                <div className="likert-scale">
                                    {[<div>😣</div>,<div className='grade' id='jajas'>🫠</div>,<div className='grade'>😲</div>,<div className='grade'>😃</div>,<div className='grade'>😁</div>].map((num) => (
                                        <span
                                        key={num}
                                        className={`likert-option ${num <= item.grade ? 'selected' : ''}`}
                                        >
                                        {num}
                                        </span>
                                    ))}
                                </div>
                            ) : item.grade_results[key] > 20 && item.grade_results[key] <= 40? (
                                <div className="likert-scale">
                                    {[<div className='grade'>😣</div>,<div>🫠</div>,<div className='grade'>😲</div>,<div className='grade'>😃</div>,<div className='grade'>😁</div>].map((num) => (
                                        <span
                                        key={num}
                                        className={`likert-option ${num <= item.grade ? 'selected' : ''}`}
                                        >
                                        {num}
                                        </span>
                                    ))}
                                </div>
                            ) :  item.grade_results[key] > 40 && item.grade_results[key] <= 60? (
                                <div className="likert-scale">
                                    {[<div className='grade'>😣</div>,<div className='grade'>🫠</div>,<div>😲</div>,<div className='grade'>😃</div>,<div className='grade'>😁</div>].map((num) => (
                                        <span
                                        key={num}
                                        className={`likert-option ${num <= item.grade ? 'selected' : ''}`}
                                        >
                                        {num}
                                        </span>
                                    ))}
                            </div>
                            ) : item.grade_results[key] > 60 && item.grade_results[key] <= 80 ? (
                                <div className="likert-scale">
                                    {[<div className='grade'>😣</div>,<div className='grade'>🫠</div>,<div className='grade'>😲</div>,<div>😃</div>,<div className='grade'>😁</div>].map((num) => (
                                        <span
                                        key={num}
                                        className={`likert-option ${num <= item.grade ? 'selected' : ''}`}
                                        >
                                        {num}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div className="likert-scale">
                                    {[<div className='grade'>😣</div>,<div className='grade'>🫠</div>,<div className='grade'>😲</div>,<div className='grade'>😃</div>,<div>😁</div>].map((num) => (
                                        <span
                                        key={num}
                                        className={`likert-option ${num <= item.grade ? 'selected' : ''}`}
                                        >
                                        {num}
                                        </span>
                                    ))}
                                </div>
                            )}
                      
                  </td>
                </tr>
              ))
            ))
          ) : (
            <tr>
              <td colSpan="2">No se han calificado exámenes en este periodo aún.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CalificacionesEstudiante;
