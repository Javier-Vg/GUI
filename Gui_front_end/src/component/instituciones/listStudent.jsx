import React, { useEffect, useState } from 'react';
import { getStudents } from '../../service/LoginGui'; 


function ListStudents() {
    
    const [students, setStudents] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        getStudentsData(); 
    }, []);

    const getStudentsData = async () => {
        try {
            const studentsData = await getStudents();
            setStudents(studentsData);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const openModal = (student) => {
        setSelectedStudent(student);
        setSeeMore(true);
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedStudent(null);
    };

    return (
        <div className='container_list'>
            <h1>Estudiantes</h1>
            <div className='students'>
                {students.map((student) => (
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
                ))}
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
