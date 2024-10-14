import React, { useState } from 'react';
import CreateStaff from './CreateStaff';
import CreateStudent from './createStudent';
import ListStaff from './listStaff';
import ListStudent from './listStudent';
import Gastos from './Gastos';
import CreateGroup from './CreateGroup'; // Ajusta la ruta según sea necesario
import ListGroups from './listGroups';
import ManageSubjects from './manageSubjects'; // Ajusta la ruta según sea necesario
import { useSelector} from "react-redux";
import '../../css/home_institution.css';

function HomeInstitutionsForm() {
    const [changeComponent, setChangeComponent] = useState('');

   // Definir el estado para controlar el despliegue del aside
    const [isDeployed, setIsDeployed] = useState(false);
    const NameInstitution = useSelector((state) => state.infInstitution.nameInstitution)
    const InfInstitution = useSelector((state) => state.infInstitution.imgInstitution)
    // Manejador de eventos para alternar el estado
    const toggleAside = () => {
        setIsDeployed(!isDeployed);
    };

    // Verificar si hay un token en sessionStorage
    if (!sessionStorage.getItem('token')) {
        window.location.href = '/login';
    }

    return (

        <div>
           
            <head>
                <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet"/>
            </head>

        <nav>
            <button id="open-close" onClick={toggleAside}>
                <span id="open-close"><i className='bx bx-menu'></i></span>
            </button>
            <img src={InfInstitution} alt="" />
            <h2>{NameInstitution}</h2>
            
        
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
                    value="Crear Grupo" 
                    onClick={() => setChangeComponent("Crear Grupo")} 
                    className = "inputBoton"
                />
                </div>
                <div>
                    <input 
                        type="button" 
                        value="Crear Materias" 
                        onClick={() => setChangeComponent("materias")} 
                        className="inputBoton"
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
            <img src="https://static.vecteezy.com/system/resources/previews/009/126/808/non_2x/gui-logo-gui-letter-gui-letter-logo-design-initials-gui-logo-linked-with-circle-and-uppercase-monogram-logo-gui-typography-for-technology-business-and-real-estate-brand-vector.jpg" alt="" />
        </aside>

            

            <div className='div-components'>
                
            <div className='div-components'>
                {changeComponent === "crear personal" && <CreateStaff />}
                {changeComponent === "crear estudiante" && <CreateStudent />}
                {changeComponent === "profesor" && <ListStaff />}
                {changeComponent === "estudiante" && <ListStudent />}
                {changeComponent === "gastos" && <Gastos />}
                {changeComponent === "materias" && <ManageSubjects />}
                {changeComponent === "Crear Grupo" && <CreateGroup />} 
                {changeComponent === "grupos" && <ListGroups />} 
            </div>

            </div>
        </div>
    );
}

export default HomeInstitutionsForm;
