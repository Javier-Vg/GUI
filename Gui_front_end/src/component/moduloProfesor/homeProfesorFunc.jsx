import React, { useState } from 'react';
import ExpedienteAlumno from './ExpedienteAlumno';
import Chat from './Chat';
import Notas from './Notas';
import '../../css/home_institution.css';

function HomeProfesorFunc() {
    const [changeComponent, setChangeComponent] = useState('');

   // Definir el estado para controlar el despliegue del aside
    const [isDeployed, setIsDeployed] = useState(false);

    // Manejador de eventos para alternar el estado
    const toggleAside = () => {
        setIsDeployed(!isDeployed);
    };

    return (

        <div>
           
            <head>
                <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet"/>
            </head>

        <nav>
            <button id="open-close" onClick={toggleAside}>
                <span id="open-close"><i className='bx bx-menu'></i></span>
            </button>
            <img src="https://static.vecteezy.com/system/resources/previews/009/126/808/non_2x/gui-logo-gui-letter-gui-letter-logo-design-initials-gui-logo-linked-with-circle-and-uppercase-monogram-logo-gui-typography-for-technology-business-and-real-estate-brand-vector.jpg" alt="" />
            <h2>Nombre de la institucion</h2>
            
        
        </nav>
        <aside id="aside" className={isDeployed ? 'desplegar' : ''}>
            <div className="container-svg">

                <div>
                    <input 
                        type="button" 
                        value="Expediente de Alumno" 
                        onClick={() => setChangeComponent("Expediente de Alumno")} 
                        className = "inputBoton"
                    />
                </div>
                <div>
                <input 
                    type="button" 
                    value="MENSAJES" 
                    onClick={() => setChangeComponent("MENSAJES")} 
                    className = "inputBoton"
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
                
            <div className='div-components'>
                {changeComponent === " Expediente de Alumno" && <ExpedienteAlumno />}
                {changeComponent === "Comunicacion" && < Chat />}
                {changeComponent === "Estado de Cuenta" && <ExpedienteAlumno />}
                {changeComponent === "Calificacion del Estudiante" && < Notas />}
            </div>

            </div>
        </div>
    );
}

export default HomeProfesorFunc;
