import React, { useState } from 'react';

const manageSubjects = () => {
    const [subjectName, setSubjectName] = useState('');
    const [level, setLevel] = useState('');

    const saveSubject = () => {
        console.log('Nombre de la materia:', subjectName);
        console.log('Nivel:', level);
        // Aquí puedes agregar la lógica para guardar la materia, por ejemplo enviarla a un API.
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

            <input onClick={saveSubject} type='button' value='Registrar Materia' />
        </div>
    );
};

export default manageSubjects;
