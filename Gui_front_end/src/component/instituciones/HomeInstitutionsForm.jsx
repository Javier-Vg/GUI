import React, { useState } from 'react';
import CreateStaff from './CreateStaff';

function Home_institutions_form() {
    const [changeComponent, setChangeComponent] = useState('');
    console.log(changeComponent)
    return (
        <div>
            <h1>Nombre de la institución</h1>
            <p>Correo de la institución</p>
            <button value="crear personal" onClick={() => setChangeComponent("crear personal")}>Crear Personal</button>
            <button>Crear estudiante</button>
            <button>Profesor</button>
            <button>Estudiantes</button>
            <button>Grupos</button>
            <button>Gastos</button>
            <button>Soporte de sistema</button>
            <button>Cerrar sesión</button>

            <div>
                {changeComponent === "crear personal" && <CreateStaff />}
            </div>
        </div>
    );
}

export default Home_institutions_form;
