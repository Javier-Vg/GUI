import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginProfesor from './LoginProfesor';
import LoginInstitucion from './LoginInstitucion';
import LoginPadres from './LoginPadres';
import { getStaff, getStudents, getInstitutions } from '../../service/LoginGui';
import { useNavigate } from 'react-router-dom';
import { setInstitutionId } from '../../store/institutionSlice'; // Acción para almacenar el institutionId

function ElecionLogin() {
  const [changeComponent, setChangeComponent] = useState('Institución'); // Estado para manejar el rol seleccionado
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password); // No recomendable mostrar contraseñas directamente
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Para actualizar el Redux store

  const handleSubmit = async () => {
    try {
      // Obtener los datos de cada función
      const staffData = await getStaff();
      const studentData = await getStudents();
      const institutionData = await getInstitutions();
        
      // Validar en Staff
      const staffMatch = staffData.find(user => user.name === username && user.password === password);
      // Validar en Students
      const studentMatch = studentData.find(user => user.name === username && user.password === password);
      // Validar en Institutions
      const institutionMatch = institutionData.find(user => user.name === username && user.password === password);

      // Comprobar si se encontró una coincidencia en cualquiera de los datos
      if (staffMatch) {
        console.log('Login exitoso como Staff');
        
        // Almacena el institutionId del profesor en el store Redux
        dispatch(setInstitutionId(staffMatch.id
        )); // Asegúrate de que el id de la institución esté disponible en staffMatch
        
        navigate('/institutions');
      } else if (studentMatch) {
        console.log('Login exitoso como Estudiante');
        
        // Almacena el institutionId del estudiante en el store Redux
        dispatch(setInstitutionId(studentMatch.id
        )); // Asegúrate de que el id de la institución esté disponible en studentMatch
        
        navigate('/home_padres');
      } else if (institutionMatch) {

        console.log('Login exitoso como Institución');
        console.log(institutionMatch.id);
        // Almacena institutionId en el store Redux
        dispatch(setInstitutionId(institutionMatch.id
        )); // Asegúrate de que el id esté disponible en institutionMatch
        
        // Navega a la interfaz de institución
        navigate('/Institutions');
      } else {
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="role">Selecciona tu rol:</label>
          <select
            id="role"
            value={changeComponent}
            onChange={(e) => setChangeComponent(e.target.value)} // Cambia el componente basado en el rol seleccionado
          >
            <option value="Institución">Institución</option>
            <option value="Profesor">Profesor</option>
            <option value="Padre">Padre</option>
          </select>
        </div>
      </form>

      <div>
        {changeComponent === "Profesor" && <LoginProfesor />}
        {changeComponent === "Institución" && <LoginInstitucion />}
        {changeComponent === "Padre" && <LoginPadres />}
      </div>

      <button onClick={handleSubmit} type="submit">Iniciar Sesión</button>
    </div>
  );
}

export default ElecionLogin;
