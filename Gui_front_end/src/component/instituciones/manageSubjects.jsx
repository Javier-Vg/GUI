import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Asegúrate de que tienes react-toastify instalado
import { postSubjects } from '../../service/LoginGui';

const ManageSubjects = () => {
    const [subjectName, setSubjectName] = useState('');

    const InstitutionID = sessionStorage.getItem('InstitutionID'); // Obtener el ID de la institución del localStorage
    
    const saveSubject = async () => {
        const subject = {
            name: subjectName,
            institution: InstitutionID // Usar el ID de la institución del localStorage
        };

        try {
            await postSubjects(subject);
            toast.success("Materia agregada exitosamente.");
            setSubjectName(''); // Limpiar el campo después de agregar la materia
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al agregar la materia.");
        }
    };

    return (
        <div className='subject-form'>
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
            <button onClick={saveSubject}>Guardar</button>
        </div>
    );
};

export default ManageSubjects;
