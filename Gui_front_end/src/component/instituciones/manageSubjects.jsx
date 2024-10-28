import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Asegúrate de que tienes react-toastify instalado
import { postSubjects } from '../../service/LoginGui';
import { fetchSubjects } from '../../Redux/Slices/SliceSubjects';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import '../../css/subjects.css';

const ManageSubjects = () => {

    const dispatch = useDispatch();

    const [subjectName, setSubjectName] = useState('');
    const [institution_id, setInstitutionId] = useState(null);

    const itemsSubject = useSelector((state) => state.subject.items);

    const [IsOpen, setIsOpen] = useState(false);
    
    //Modal
    const openModal = () => setIsOpen(true);

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
        console.log(institutionIdFromToken);
         
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
            <div>
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
                <button className='btn-save-materia' onClick={saveSubject}>Guardar</button>
            </div>

            <div>
                <button onClick={openModal} className='btn-materias'>Ver materias registradas</button>
            </div>

            {IsOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Total de materias registradas.</h2>
                    {itemsSubject.map((s, k) => (
                        <div key={k}>
                            <h3>- {s.name}</h3>
                        </div>
                    ))}
                  <button type="button" onClick={closeModal}>Cerrar</button>
                  </div>
                </div>
            )}
                
            
        </div>
    );
};

export default ManageSubjects;

