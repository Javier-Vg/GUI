import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Asegúrate de que tienes react-toastify instalado
import { useSelector} from "react-redux";
import { postSubjects } from '../../service/LoginGui';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ManageSubjects = () => {
    const [subjectName, setSubjectName] = useState('');

    const [institution_id, setInstitutionId] = useState(null);

    useEffect(() => {
        const token = Cookies.get('AuthCookie');
 
    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);

        // Extraer el institution_id desde el token
        const institutionIdFromToken = decodedToken.institution        ; 
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    }, []);
    const saveSubject = async () => {
        const subject = {
            name: subjectName,
            institution: institution_id // Usar el ID de la institución del localStorage
        };
        console.log(subject);
        
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

