import React, { useState, useEffect } from 'react';
import { sendMessage, getStudents } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

const ChatProfesor = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [students, setStudents] = useState([]);
    const storedTeacherName = sessionStorage.getItem('TeacherName'); // Obtener el nombre del profesor
    const [teacherName, setTeacherName] = useState(storedTeacherName || '');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentList = await getStudents(); // Cambia a la función que obtiene la lista de estudiantes
                setStudents(studentList);
            } catch (error) {
                console.error('Error al cargar los estudiantes:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleSendMessage = async () => {
        if (message.trim() && selectedStudent) {
            const newMessage = {
                message: message,
                receiver_student: selectedStudent,
                transmitter_teacher: teacherName,
                institution: '14',
                date: new Date().toISOString(),
            };
            console.log(newMessage);
            
            try {
                const savedMessage = await sendMessage(newMessage);
                setMessages([...messages, { ...savedMessage, transmitterName: teacherName || "Profesor" }]);
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
