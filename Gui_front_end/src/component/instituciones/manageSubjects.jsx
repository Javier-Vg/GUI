import React, { useState, useEffect } from 'react';
import { postSubjects} from '../../service/LoginGui';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

const manageSubjects = () => {
    const [subjectName, setSubjectName] = useState('');

    const InstitutionID = localStorage.getItem('InstitutionID');
    
    const saveSubject = () => {
        console.log('Nombre de la materia:', subjectName);
       
        const subject = {
            name: subjectName,
            institution: InstitutionID
        }
        toast.success("Materia agregada exitosamente.");
        postSubjects(subject);
        // Aquí puedes agregar la lógica para guardar la materia, por ejemplo enviarla a un API.
    };

    return (
        <div className='subject-form'>
            <ToastContainer />
            <h2>Registro de Materia</h2>
            <label htmlFor='subjectName'>Nombre de la Materia:</label>
            <input
                type='text'
                id='subjectName'
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder='Ingrese el nombre de la materia'
            />
            <br />
            <br />

            <button onClick={saveSubject}>Save</button>

        </div>
    );
};

export default manageSubjects;
