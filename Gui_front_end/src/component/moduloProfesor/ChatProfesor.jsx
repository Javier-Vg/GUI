import React, { useState, useEffect } from 'react';
import { sendMessage, getStudents } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

const ChatProfesor = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState(null);

    // Obtener el StaffID (nombre del profesor) y el ID de la institución desde sessionStorage
    const storedStaffId = sessionStorage.getItem('StaffID'); 
    const storedInstitutionId = sessionStorage.getItem('InstitutionID'); 
    
    const [staffId, setStaffId] = useState(storedStaffId || '');  
    const [institutionId, setInstitutionId] = useState(storedInstitutionId || '');
    
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentList = await getStudents(); // Obtener lista de estudiantes desde la API
                console.log("Lista de estudiantes:", studentList); // Verifica la estructura de los datos
                console.log("Institution IDpRUEBA:", institutionId); // Verifica el valor de institutionId
        
                // Filtrar estudiantes por el ID de la institución
                const filteredStudents = studentList.filter(student => student.institution.toString() === institutionId);
                setStudents(filteredStudents);
                console.log("Estudiantes filtradosPRUEBA:", filteredStudents); // Verifica los estudiantes filtrados
        
            } catch (error) {
                console.error('Error al cargar los estudiantes:', error);
            }
        };
        
        fetchStudents();
    }, [institutionId]);

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
                students: studentId, 
                staff: staffId, 
                institution: institutionId, 
            };
            
            try {
                const savedMessage = await sendMessage(newMessage);
                setMessages([...messages, { ...savedMessage, transmitterName: staffId || "Profesor" }]);
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
