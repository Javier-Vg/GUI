import React, { useState, useEffect } from 'react';
import { sendMessage, getStudents, getMessages } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

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

    // Obtener estudiantes y filtrar por institución
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentList = await getStudents(); // Obtener lista de estudiantes desde la API
                
                // Filtrar estudiantes por el ID de la institución
                const filteredStudents = studentList.filter(student => student.institution.toString() === institutionId);
                setStudents(filteredStudents);
                console.log("Estudiantes filtrados:", filteredStudents);

            } catch (error) {
                console.error('Error al cargar los estudiantes:', error);
            }
        };
        
        fetchStudents();
    }, [institutionId]);

    // Cargar todos los mensajes sin filtrar por institución
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messageList = await getMessages(); // Obtener mensajes desde la API
                setMessages(messageList); // Guarda todos los mensajes
                console.log("Todos los mensajes obtenidos:", messageList);

            } catch (error) {
                console.error('Error al cargar los mensajes:', error);
            }
        };

        fetchMessages();
    }, []);

    // useEffect para actualizar el ID del estudiante cuando cambie la selección
    useEffect(() => {
        if (selectedStudent) {
            setStudentId(selectedStudent); // Actualiza el estado del ID del estudiante
            console.log("Estudiante seleccionado ID:", selectedStudent);
        }
    }, [selectedStudent]);

    const handleSendMessage = async () => {
        if (message.trim() && selectedStudent) {
            const newMessage = {
                message: message,
                students: studentId, 
                staff: staffId, 
                institution: institutionId, 
                date: new Date().toISOString(),
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

    // Filtrar mensajes por estudiante seleccionado
    const filteredMessages = selectedStudent 
        ? messages.filter(msg => msg.students.toString() === selectedStudent)
        : [];

    console.log("Mensajes filtrados por estudiante:", filteredMessages); // Verifica que existan mensajes filtrados

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
