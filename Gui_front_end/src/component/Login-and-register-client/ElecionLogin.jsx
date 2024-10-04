import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginProfesor from './LoginProfesor';
import LoginInstitucion from './LoginInstitucion';
import LoginPadres from './LoginPadres';
import { getStaff,getStudents,getInstitutions } from '../../service/LoginGui';

function ElecionLogin() {
    const [changeComponent, setChangeComponent] = useState('Institución'); // Estado para manejar el rol seleccionado
    const username = useSelector((state) => state.login.username);
    const password = useSelector((state) => state.login.password); // Solo con fines de demostración (no recomendable mostrar contraseñas).

    const handleSubmit = async () => {
        const data = await getStaff()
        // const data2 = await getStudents()
        // const data3 = await getInstitutions()
        console.log(data);
        // console.log(data2);
        // console.log(data3);
        
        // Aquí podrías enviar los datos al backend para iniciar sesión
        // Esta línea solo simula el envío de datos
        console.log('enviando datos...', username, password);
        // Aquí podrías manejar el resultado del envío
    }
            
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
