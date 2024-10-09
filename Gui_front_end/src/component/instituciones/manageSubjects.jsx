import React, { useState, useEffect } from 'react';
import { postSubjects, getInstitutions} from '../../service/LoginGui';

const manageSubjects = () => {
    const [subjectName, setSubjectName] = useState('');
    const [Institution, setInstitution] = useState('');
    const [InstitutionId, setInstitutionId] = useState('');


    useEffect(() => {
        getDataInsititution();
    },[])


    const saveSubject = () => {
        console.log('Nombre de la materia:', subjectName);
        const subject = {
            name: subjectName,
            institution: InstitutionId
        }
        postSubjects(subject);
        // Aquí puedes agregar la lógica para guardar la materia, por ejemplo enviarla a un API.
    };

    const getDataInsititution = async () => {
        try {
          const institutionData = await getInstitutions();
          setInstitution(institutionData);
        } catch (error) {
            console.error("Error fetching institution:", error);
        }
    }

    const handleChangeInstitucion = (e) => {
        setInstitutionId(e.target.value)
    }

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

            <label htmlFor="sujectInstitution">Seleccione la institucion
            {Institution && (
            <select value={InstitutionId} onChange={handleChangeInstitucion} id="opciones">
                <option value="">--Seleccionar--</option>
                    {Institution.map((institution, index) => (
                    <option key={index} value={institution.id}>
                        {institution.name}
                    </option>
                    ))}
                </select>
                )}
            </label>

            <button onClick={saveSubject}>Save</button>

        </div>
    );
};

export default manageSubjects;
