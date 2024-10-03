import React, { useState } from 'react';
import CreateStaff from './CreateStaff';
import CreateStudent from './createStudent';
import ListStaff from './listStaff';
import ListStudent from './listStudent';
import Gastos from './Gastos';
import '../../css/home_institution.css';

function HomeInstitutionsForm() {
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
            <h1>"¡Bienvenido a GUI, [Nombre del Usuario]!

Nos alegra tenerte aquí. Tu experiencia es nuestra prioridad y estamos comprometidos a ofrecerte las mejores herramientas y recursos para que logres tus objetivos.

Explora nuestras funciones  y no dudes en contactarnos si necesitas ayuda. ¡Disfruta de tu viaje con nosotros!"</h1>
        
        </nav>
        <aside id="aside" className={isDeployed ? 'desplegar' : ''}>
            <div className="container-svg">

                <div>
                    <input 
                        type="button" 
                        value="Crear Personal" 
                        onClick={() => setChangeComponent("crear personal")} 
                        className = "inputBoton"
                    />
                </div>
                <div>
                <input 
                    type="button" 
                    value="Crear Estudiante" 
                    onClick={() => setChangeComponent("crear estudiante")} 
                    className = "inputBoton"
                />
                </div>
                <div>
                    <input 
                        type="button" 
                        value="Personal" 
                        onClick={() => setChangeComponent("profesor")} 
                        className = "inputBoton"
                    />
                </div>
            </div>
            <div className="container-svg">
                <div>
                    <input 
                        type="button" 
                        value="Estudiantes" 
                        onClick={() => setChangeComponent("estudiante")} 
                        className = "inputBoton"
                    />
                </div>
                <div>
                <input 
                    type="button" 
                    value="Grupos" 
                    onClick={() => setChangeComponent("grupos")} 
                    className = "inputBoton"
                />
                </div>
                <div>
                    <input 
                        type="button" 
                        value="Gastos" 
                        onClick={() => setChangeComponent("gastos")} 
                        className = "inputBoton"
                    />
                </div>
                <div>
                    <input 
                        type="button" 
                        value="Soporte de Sistema" 
                        onClick={() => setChangeComponent("soporte de sistema")} 
                        className = "inputBoton"
                    />
                </div>
                <div>
                    <input 
                        type="button" 
                        value="Cerrar Sesión" 
                        onClick={() => setChangeComponent("cerrar sesión")} 
                        className = "inputBoton"
                    />
                </div>
                <div>
                
                </div>
            </div>
            <div className="container-svg">
                <h2>etc</h2>
                <div>
                    
                    <span>YouTube Premium</span>
                </div>
                <div>
                    
                    <span>Videojuegos</span>
                </div>
                <div>
                    
                    <span>Directo</span>
                </div>
                <div>
                    <span>Aprendizaje</span>
                </div>
                <div>
                    <span>Deportes</span>
                </div>
            </div>
        </aside>

            

            <div className='div-components'>
                
                {changeComponent === "crear personal" && <CreateStaff />}
                {changeComponent === "crear estudiante" && <CreateStudent />}
                {changeComponent === "profesor" && <ListStaff/>}
                {changeComponent === "estudiante" && < ListStudent/>}
                {changeComponent === "gastos" && < Gastos/>}
            </div>
        </div>
    );
}

export default HomeInstitutionsForm;
