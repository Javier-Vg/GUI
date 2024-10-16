import React, { useState, useEffect } from 'react';
import { sendMessage, getStudents } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

const ChatProfesor = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState(null); // Estado para almacenar el ID del estudiante seleccionado

    // Obtener el StaffID (nombre del profesor) y el ID de la institución desde sessionStorage
    const storedStaffId = sessionStorage.getItem('StaffID'); // StaffID del profesor
    const storedInstitutionId = sessionStorage.getItem('InstitutionID'); // ID de la institución
    
    const [staffId, setStaffId] = useState(storedStaffId || '');  // Actualizar para usar StaffID
    const [institutionId, setInstitutionId] = useState(storedInstitutionId || '');
    
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentList = await getStudents(); // Obtener lista de estudiantes desde la API
                setStudents(studentList);
            } catch (error) {
                console.error('Error al cargar los estudiantes:', error);
            }
        };
        fetchStudents();
    }, []);

    // useEffect para actualizar el ID del estudiante cuando cambie la selección
    useEffect(() => {
        if (selectedStudent) {
            setStudentId(selectedStudent); // Actualiza el estado del ID del estudiante
        }
    }, [selectedStudent]);

    const handleSendMessage = async () => {
        if (message.trim() && selectedStudent) {
            const newMessage = {
                message: message,
                students: studentId, // Usar el ID del estudiante seleccionado
                staff: staffId,  // Usar StaffID en lugar de teacherName
                institution: institutionId, // Usar institutionID del sessionStorage
            };
            
            try {
                const savedMessage = await sendMessage(newMessage);
                setMessages([...messages, { ...savedMessage, transmitterName: staffId || "Profesor" }]); // Usar StaffID para el nombre del transmisor
                setMessage('');
                alert('Mensaje enviado correctamente');
            } catch (error) {
                console.error('No se pudo enviar el mensaje', error);
                alert('Error al enviar el mensaje. Intenta nuevamente.');
            }
        } else {
            alert('Por favor, selecciona un estudiante y escribe un mensaje.');
        }
    };

    const filteredMessages = selectedStudent 
        ? messages.filter(msg => msg.receiver_student === selectedStudent)
        : [];

    return (
        <div>
            <h2>Chat con Estudiantes</h2>
            <div>
                <label>Selecciona un Estudiante:</label>
                <select onChange={(e) => setSelectedStudent(e.target.value)} defaultValue="">
                    <option value="" disabled>Selecciona un estudiante</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.username}</option>
                    ))}
                </select>
            </div>
            <div>
                <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje aquí"
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
            <div>
                <h3>Mensajes</h3>
                {filteredMessages.length > 0 ? (
                    filteredMessages.map(msg => (
                        <div key={msg.id}>
                            <p><strong>{msg.transmitterName}:</strong> {msg.message} <em>({new Date(msg.date).toLocaleString()})</em></p>
                        </div>
                    ))
                ) : (
                    <p>No hay mensajes para este estudiante.</p>
                )}
            </div>
        </div>
    );
};

export default ChatProfesor;
