import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginProfesor from './LoginProfesor';
import LoginInstitucion from './LoginInstitucion';
import LoginPadres from './LoginPadres';
import { getStaff,getStudents,getInstitutions } from '../../service/LoginGui';
import { useNavigate } from 'react-router-dom';


function ElecionLogin() {
    const [changeComponent, setChangeComponent] = useState('Institución'); // Estado para manejar el rol seleccionado
    const username = useSelector((state) => state.login.username);
    const password = useSelector((state) => state.login.password); // No recomendable mostrar contraseñas directamente
    const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      // Obtener los datos de cada función
      const staffData = await getStaff();
      const studentData = await getStudents();
      const institutionData = await getInstitutions();
        console.log(studentData);
        
      // Validar en Staff
      const staffMatch = staffData.find(user => user.name === username && user.password === password);
      // Validar en Students
      const studentMatch = studentData.find(user => user.name === username && user.password === password);
      // Validar en Institutions
      const institutionMatch = institutionData.find(user => user.name === username && user.password === password);

      // Comprobar si se encontró una coincidencia en cualquiera de los datos
      if (staffMatch) {
        console.log('Login exitoso como Staff');
        navigate('/institutions');
      } else if (studentMatch) {
        console.log('Login exitoso como Estudiante');
        navigate('/home_padres');
      } else if (institutionMatch) {
        console.log('Login exitoso como Institución');
        navigate('/Ginstitutionsui');
      } else {
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
            
    return (
        <div>
            <form >
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
