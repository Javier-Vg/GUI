import React, { useState } from 'react';
import CreateStaff from './CreateStaff';
import CreateStudent from './createStudent';
import ListTeacher from './ListTeacher';
import ListStudent from './listStudent';

function HomeInstitutionsForm() {
    const [changeComponent, setChangeComponent] = useState('');
    console.log(changeComponent);

    return (
        <div>
            <h1>Nombre de la institución</h1>
            <p>Correo de la institución</p>
            <input 
                type="button" 
                value="Crear Personal" 
                onClick={() => setChangeComponent("crear personal")} 
            />
            <input 
                type="button" 
                value="Crear Estudiante" 
                onClick={() => setChangeComponent("crear estudiante")} 
            />
            <input 
                type="button" 
                value="Profesor" 
                onClick={() => setChangeComponent("profesor")} 
            />
            <input 
                type="button" 
                value="Estudiantes" 
                onClick={() => setChangeComponent("estudiantes")} 
            />
            <input 
                type="button" 
                value="Grupos" 
                onClick={() => setChangeComponent("grupos")} 
            />
            <input 
                type="button" 
                value="Gastos" 
                onClick={() => setChangeComponent("gastos")} 
            />
            <input 
                type="button" 
                value="Soporte de Sistema" 
                onClick={() => setChangeComponent("soporte de sistema")} 
            />
            <input 
                type="button" 
                value="Cerrar Sesión" 
                onClick={() => setChangeComponent("cerrar sesión")} 
            />

            <div>
                {changeComponent === "crear personal" && <CreateStaff />}
                {changeComponent === "crear estudiante" && <CreateStudent />}
                {changeComponent === "profesor" && < ListTeacher/>}
                {changeComponent === "estudiante" && < ListStudent/>}
            </div>
        </div>
    );
}

export default HomeInstitutionsForm;
