import React, { useState } from 'react';
import ExpedienteAlumno from '../modulo padres/ExpedienteAlumno';
import Notas from './Notas';
import '../../css/home_institution.css';
import ChatProfesor from './chatProfesor';

function HomeProfesorFunc() {
    const [changeComponent, setChangeComponent] = useState('');
    const [isDeployed, setIsDeployed] = useState(false);

    const toggleAside = () => {
        setIsDeployed(!isDeployed);
    };

    return (
        <div>
            <nav>
                <button id="open-close" onClick={toggleAside}>
                    <span id="open-close"><i className='bx bx-menu'></i></span>
                </button>
                <img src="https://static.vecteezy.com/system/resources/previews/009/126/808/non_2x/gui-logo-gui-letter-gui-letter-logo-design-initials-gui-logo-linked-with-circle-and-uppercase-monogram-logo-gui-typography-for-technology-business-and-real-estate-brand-vector.jpg" alt="" />
                <h2>Nombre de la institución</h2>
            </nav>
            <aside id="aside" className={isDeployed ? 'desplegar' : ''}>
                <div className="container-svg">
                    <div>
                        <input 
                            type="button" 
                            value="Expediente de Alumno" 
                            onClick={() => setChangeComponent("Expediente de Alumno")} 
                            className="inputBoton"
                        />
                    </div>
                    <div>
                        <input 
                            type="button" 
                            value="MENSAJES" 
                            onClick={() => setChangeComponent("MENSAJES")} 
                            className="inputBoton"
                        />
                    </div>
                    <div>
                        <input 
                            type="button" 
                            value="Calificacion del Estudiante" 
                            onClick={() => setChangeComponent("Calificacion del Estudiante")} 
                            className="inputBoton"
                        />
                    </div>
                </div>
            </aside>

            <div className='div-components'>
                {changeComponent === "Expediente de Alumno" && <ExpedienteAlumno />}
                {changeComponent === "MENSAJES" && <ChatProfesor />}
                {changeComponent === "Calificacion del Estudiante" && <Notas />}
            </div>
        </div>
    );
}

export default HomeProfesorFunc;
