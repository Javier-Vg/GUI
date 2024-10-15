import React, { useState, useEffect } from 'react';
import { sendMessage, getStaff } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

const Chat = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const storedStudentId = sessionStorage.getItem('StudentID');
    const storedStudentName = sessionStorage.getItem('StudentName');
    const [studentName, setStudentName] = useState(storedStudentName || '');
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const staffList = await getStaff();
                const filteredTeachers = staffList.filter(teacher => teacher.position === 'Teacher');
                setTeachers(filteredTeachers);
            } catch (error) {
                console.error('Error al cargar los profesores:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleSendMessage = async () => {
        if (message.trim() && selectedTeacher && storedStudentId) {
            const newMessage = {
                message: message,
                staff: selectedTeacher,
                students: storedStudentId,
                institution: '14',
                date: new Date().toISOString(),
            };
            console.log(newMessage);
            
            try {
                const savedMessage = await sendMessage(newMessage);
                setMessages([...messages, { ...savedMessage, transmitterName: studentName || "Estudiante" }]);
                setMessage('');
                alert('Mensaje enviado correctamente');
            } catch (error) {
                console.error('No se pudo enviar el mensaje', error);
                alert('Error al enviar el mensaje. Intenta nuevamente.');
            }
        } else {
            alert('Por favor, selecciona un profesor y escribe un mensaje.');
        }
    };

    const filteredMessages = selectedTeacher 
        ? messages.filter(msg => msg.receiver_student === selectedTeacher)
        : [];

    return (
        <div>
            <h2>Chat con Profesores</h2>
            <div>
                <label>Selecciona un Profesor:</label>
                <select onChange={(e) => setSelectedTeacher(e.target.value)} defaultValue="">
                    <option value="" disabled>Selecciona un profesor</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.username}</option>
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
                    <p>No hay mensajes para este profesor.</p>
                )}
            </div>
        </div>
    );
};

export default Chat;
