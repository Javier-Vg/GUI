import React, { useEffect, useState } from 'react';
import { postGroupsAsiggnment } from '../../service/LoginGui';
import { fetchStudent } from '../../Redux/Slices/SliceStudent';
import { fetchGroups } from '../../Redux/Slices/SliceGroup';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/list_student.css';

function ListStudents() {

    const [students, setStudents] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const institution_id = sessionStorage.getItem('InstitutionID');  // ID de la institución almacenado en sessionStorage

    // Confirmación de asignación a grupo:
    const [confirm, setConfirm] = useState(false);

    // Seteo de la opción de grupo:
    const [GroupId, setGroupId] = useState(false);

    const dispatch = useDispatch();

    // Estados de Staff:
    const items= useSelector(state => state.student.items);  
    const loading = useSelector(state => state.student.loading);  
    const error = useSelector(state => state.student.error); 

    // Estado de grupos:
    const itemsGroups= useSelector(state => state.group.items); 
    
    useEffect(() => {
        dispatch(fetchStudent());
        dispatch(fetchGroups());
    }, [dispatch]);
    

    useEffect(() => {
        setStudents([]);
        for (let i = 0; i < items.length; i++) {
            if (items[i].institution === parseInt(institution_id, 10)) {
              // Actualiza el valor de la clave correspondiente
              setStudents((prevFiltred) => [...prevFiltred, items[i]]);
            }
        }
    }, [items, institution_id]);

    const openModal = (student) => {
        setSelectedStudent(student);
        setSeeMore(true);
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedStudent(null);
        setConfirm(!confirm);
        setGroupId('');
    };

    // Setea el estado y muestra el div de asignación:
    const handleChange = () => {
        setConfirm(!confirm);
    }

    // Añade el grupo al grupo:
    const handleSubmit = (prop) => {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // +1 porque los meses son de 0 a 11
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const fechaFormateada = `${anio}/${mes}/${dia}`;
        
        const group = {
            registration_day: fechaFormateada,
            group: GroupId,
            student: prop
        }

        postGroupsAsiggnment(group); // manda los datos
        setConfirm(!confirm);
    }
    
    
    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
      }
    
    if (error) {
        return <div>Error: {error}</div>; // Muestra el error si ocurre
    }

    return (
        <div className='container_list'>
            <h1>Estudiantes</h1>
            <div className='students'>
                {students.length > 0 ? (
                    students.map((student) => (
                        <div className='container_students_list' key={student.identification_number}>
                            <div className='div_img'>
                                {student.imagen_url ? (
                                    <img className='Student_Image' src={student.imagen_url} alt="No found" />
                                ) : (
                                    <div className='No_Image'>Sin Imagen</div>
                                )}
                            </div>
                            <div className='student_inf'>
                                <h2>{student.name} {student.last_name}</h2>
                                <h6>{student.grade}</h6>
                                <input onClick={() => openModal(student)} type="button" value="Ver más" />
                            </div>   
                        </div>
                    ))
                ) : (
                    <p>No hay estudiantes en esta institución.</p>
                )}
            </div>
            
            {seeMore && selectedStudent && (
                <div className='modal'>
                    <h2>Información del Estudiante</h2>
                    <h3>ID: {selectedStudent.identification_number}</h3>
                    <h3>Nombre: {selectedStudent.name} {selectedStudent.last_name}</h3>
                    <h3>Fecha de Nacimiento: {selectedStudent.birthdate_date}</h3>
                    <h3>Grado: {selectedStudent.grade}</h3>
                    <h3>Estado Académico: {selectedStudent.academic_status}</h3>
                    <h3>Información de Alergias: {selectedStudent.allergy_information}</h3>
                    <h3>Contacto: {selectedStudent.contact_information}</h3>
                    <br />
                    {!confirm ?(
                        <button onClick={handleChange} className='btn-asign'>Asignar estudiante a grupo</button>
                    ) : (
                        <div>
                           <h2>Asigne al estudiante entre estos grupos:</h2>
                           <br />
                           <button className='btn_volver' onClick={handleChange}>Volver</button>
                           <br />
                           <select onChange={((e) => setGroupId(e.target.value))}>
                            <option>-Seleccione el grupo-</option>
                                {itemsGroups.map((group, i) => (
                                    group.capacity > group.current_students ? (
                                        <option key={i} value={group.id}>
                                            {group.group_name}  ({group.current_students}/{group.capacity})
                                        </option>
                                    ) : (
                                        <option key={i} value={group.id} disabled>
                                            {group.group_name} (Lleno)
                                        </option>
                                    )
                                ))}
                           </select>
                           
                           {GroupId && (
                                <button onClick={(() => handleSubmit(selectedStudent.id))}>Añadir al grupo</button>
                           )}
                           <br />
                            
                        </div>
                        
                    )}
                    
                    <br />
                    <input onClick={closeModal} type="button" value="Cerrar" />
                </div>
            )}
        </div>
    );
}

export default ListStudents;
