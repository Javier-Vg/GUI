import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify'; // Asegúrate de que tienes react-toastify instalado
import { postSubjects } from '../../service/LoginGui';
import { fetchSubjects } from '../../Redux/Slices/SliceSubjects';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import MyModal from '../HookModal/hookModal';

import '../../css/Institutions/manageSubjects.css';


const ManageSubjects = () => {

    const modalRef = useRef(null);
    const dispatch = useDispatch();

    const [subjectName, setSubjectName] = useState('');
    const [institution_id, setInstitutionId] = useState(null);

    const itemsSubject = useSelector((state) => state.subject.items);
    
    //Modal
    const openModal = () => {
        modalRef.current.showModal(); // Llama a la función para abrir el modal
    } 

    const closeModal = () => {
        setIsOpen(false);
      }


    useEffect(() => {
        dispatch(fetchSubjects());
    },[dispatch]);

    useEffect(() => {
        const token = Cookies.get('AuthCookie');
 
 
    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);

        // Extraer el institution_id desde el token
        const institutionIdFromToken = decodedToken.info.institution;
         
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
        // <div className='subject-form'>
        <div className='container-manageSubjects'>
            <div>
                <h2>Registro de Materia</h2>
                <label htmlFor='subjectName'>Nombre de la Materia:</label>
                <input
                    autoComplete='off'
                    type='text'
                    id='subjectName'
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder='Ingrese el nombre de la materia'
                />
                <br />
                <br />
                <button className='btn-save-materia' onClick={saveSubject}>Guardar</button>
            </div>

            <div>
                <button onClick={openModal} className='btn-materias'>Ver materias registradas</button>
            </div>

            {/* Props de modal que toma de referencia el contenido que esta dentro de la etiqueta. */}
            <MyModal ref={modalRef}>
                
                  <div className="modal">
                    <h2>Total de materias registradas.</h2>
                    {itemsSubject.map((s, k) => (
                        <div key={k}>
                            <h3>- {s.name}</h3>
                        </div>
                    ))}
                  </div>
             
            </MyModal>
        </div>
    );
};

export default ManageSubjects;

