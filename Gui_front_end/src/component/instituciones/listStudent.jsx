import React, { useEffect, useState } from 'react';
import { postGroupsAssignment } from '../../service/LoginGui';
import { fetchStudent } from '../../Redux/Slices/SliceStudent';
import { fetchGroups } from '../../Redux/Slices/SliceGroup';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/list_student.css';
import { putStudent } from '../../service/LoginGui'; // Importa el servicio para hacer el PUT

function ListStudents() {

    const [students, setStudents] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const institution_id = useSelector((state) => state.ids.institutionId); // Obtén el ID de la institución
    const [confirm, setConfirm] = useState(false); // Confirmación de asignación a grupo
    const [GroupId, setGroupId] = useState(false); // Seteo de la opción de grupo
    const [editMode, setEditMode] = useState(false); // Controlar si estamos en modo edición
    const [updatedStudent, setUpdatedStudent] = useState({}); // Estado para almacenar los datos actualizados del estudiante

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
              setStudents((prevFiltred) => [...prevFiltred, items[i]]);
            }
        }
    }, [items, institution_id]);

    const openModal = (student) => {
        setSelectedStudent(student);
        setSeeMore(true);
        setUpdatedStudent(student); // Inicializa los datos actualizados con los actuales
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedStudent(null);
        setConfirm(false);
        setEditMode(false); // Asegúrate de salir del modo edición al cerrar el modal
    };

    const handleChange = () => {
        setConfirm(!confirm);
    };

    const handleSubmit = (prop) => {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const fechaFormateada = `${anio}/${mes}/${dia}`;
        
        const group = {
            registration_day: fechaFormateada,
            group: GroupId,
            student: prop
        };

        postGroupsAssignment(group); // manda los datos
        setConfirm(!confirm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStudent({
            ...updatedStudent,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        putStudent(updatedStudent)  // Realiza la solicitud PUT con los datos actualizados
            .then(() => {
                alert('Estudiante actualizado con éxito');
                setEditMode(false);  // Salir del modo edición
                setSeeMore(false);   // Cerrar el modal
            })
            .catch((error) => {
                console.error('Error al actualizar el estudiante:', error);
            });
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
                            <input onClick={() => openModal(student)} type="button" value="Ver más" />
                                <h2>{student.name} {student.last_name}</h2>
                                <h6>{student.grade}</h6>
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
                    {editMode ? (
                        // Formulario de edición
                        <div>
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectedStudent.username}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="last_name"
                                defaultValue={selectedStudent.last_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="date"
                                name="birthdate_date"
                                defaultValue={selectedStudent.identification_number}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="grade"
                                defaultValue={selectedStudent.birthdate_date}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="academic_status"
                                defaultValue={selectedStudent.grade}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="allergy_information"
                                defaultValue={selectedStudent.academic_status}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="contact_information"
                                defaultValue={selectedStudent.allergy_information}
                                onChange={handleInputChange}
                            />

                            <button onClick={handleUpdate}>Guardar cambios</button>
                            <button onClick={() => setEditMode(false)}>Cancelar</button>
                        </div>
                    ) : (
                        // Muestra la información sin editar
                        <div>
                            <h3>ID: {selectedStudent.identification_number}</h3>
                            <h3>Nombre: {selectedStudent.name} {selectedStudent.last_name}</h3>
                            <h3>Fecha de Nacimiento: {selectedStudent.birthdate_date}</h3>
                            <h3>Grado: {selectedStudent.grade}</h3>
                            <h3>Estado Académico: {selectedStudent.academic_status}</h3>
                            <h3>Información de Alergias: {selectedStudent.allergy_information}</h3>
                            <h3>Contacto: {selectedStudent.contact_information}</h3>

                            <button onClick={() => setEditMode(true)}>Actualizar Información</button>
                            <input onClick={closeModal} type="button" value="Cerrar" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ListStudents;
