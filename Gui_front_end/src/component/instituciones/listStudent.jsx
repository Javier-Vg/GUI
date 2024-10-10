import React, { useEffect, useState } from 'react';
import { getStudents } from '../../service/LoginGui';
import { fetchStudent } from '../../Redux/Slices/SliceStudent';
import { useDispatch, useSelector } from 'react-redux';

function ListStudents() {

    const [students, setStudents] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const institution_id = localStorage.getItem('institution_id');  // ID de la institución almacenado en localStoragez

    const dispatch = useDispatch();

    //Estados de Staff:
    const items= useSelector(state => state.student.items);  
    const loading = useSelector(state => state.student.loading);  
    const error = useSelector(state => state.student.error); 

    useEffect(() => {
        
        dispatch(fetchStudent());
        
        // return () => {
        //     // Código que se ejecuta al desmontar el componente
        //     dispatch(fetchStudent()); // Despacha la acción para limpiar datos
        // };

    }, [dispatch]);

    useEffect(() => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].institution === parseInt(institution_id, 10)) {
              // Actualiza el valor de la clave correspondiente
              setStudents((prevFiltred) => [...prevFiltred, items[i]]);
            };
        }

    }, [items]);

    const openModal = (student) => {
        setSelectedStudent(student);
        setSeeMore(true);
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedStudent(null);
    };

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
                    <input onClick={closeModal} type="button" value="Cerrar" />
                </div>
            )}
        </div>
    );
}

export default ListStudents;
