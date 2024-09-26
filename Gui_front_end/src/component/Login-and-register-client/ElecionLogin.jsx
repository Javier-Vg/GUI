import React, { useState } from 'react';
// Asegúrate de que estos componentes estén importados correctamente
import LoginProfesor from './LoginProfesor';
import LoginInstitucion from './LoginInstitucion';
import LoginPadres from './LoginPadres';

function ElecionLogin() {
    const [changeComponent, setChangeComponent] = useState('Institución'); // Estado para manejar el rol seleccionado


    
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
        </div>
    );
}

export default ElecionLogin;
