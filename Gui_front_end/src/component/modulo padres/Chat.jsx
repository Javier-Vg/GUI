import React, { useState, useEffect } from 'react';
import { sendMessage, getStaff, getMessages } from '../../service/LoginGui';
import '../../css/Chat.css';

const Chat = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const storedStudentId = sessionStorage.getItem('StudentID');
    const storedInstitutionId = sessionStorage.getItem('InstitutionID');
    const storedStudentDisplayName = sessionStorage.getItem('nameStudent'); 

    const [teachers, setTeachers] = useState([]);
    const [studentName, setStudentName] = useState(storedStudentDisplayName || ''); 
    const [isPolling, setIsPolling] = useState(false); 

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const staffList = await getStaff();
                const filteredTeachers = staffList.filter(teacher => teacher.institution.toString() === storedInstitutionId);
                setTeachers(filteredTeachers);
            } catch (error) {
                console.error('Error al cargar los profesores:', error);
            }
        };

        fetchTeachers();
    }, [storedInstitutionId]);

    const fetchMessages = async () => {
        try {
            const messagesList = await getMessages();
            setMessages(messagesList);
        } catch (error) {
            console.error('Error al cargar los mensajes:', error);
        }
    };

    const startPolling = () => {
        if (isPolling) return; 

        setIsPolling(true);
        const pollMessages = async () => {
            await fetchMessages(); 
            setTimeout(pollMessages, 5000);
        };

        pollMessages(); 
    };

    useEffect(() => {
        if (selectedTeacher) {
            startPolling();
        }

        return () => {
            setIsPolling(false);
        };
    }, [selectedTeacher]);

    const handleSendMessage = async () => {
        if (message.trim() && selectedTeacher && storedStudentId) {
            const newMessage = {
                message: message,
                staff: selectedTeacher,
                students: storedStudentId,
                institution: storedInstitutionId, 
                date: new Date().toISOString(),
                name: storedStudentDisplayName,
            };

            try {
                const savedMessage = await sendMessage(newMessage);
                setMessages(prevMessages => [...prevMessages, { ...savedMessage, transmitterName: storedStudentDisplayName || "Estudiante" }]);
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
        ? messages.filter(msg => msg.staff.toString() === selectedTeacher)
        : [];

    const selectedTeacherData = teachers.find(teacher => teacher.id === selectedTeacher);

    return (
        <div className="chat-container">
            <div className="header">Chat con Profesores</div>
            <div className="teacher-selector">
                <label>Selecciona un Profesor:</label>
                <select 
                    onChange={(e) => {
                        setSelectedTeacher(e.target.value);
                        fetchMessages();
                    }} 
                    defaultValue=""
                >
                    <option value="" disabled>Selecciona un profesor</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.username}
                        </option>
                    ))}
                </select>
                {selectedTeacherData && (
                    <div className="teacher-image-container">
                        <img 
                            src={selectedTeacherData.imagen_url} 
                            alt={`${selectedTeacherData.username} - profesor`}
                            className="teacher-image"
                        />
                    </div>
                )}
            </div>
            <div className="message-input">
                <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje aquí"
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
            <div className="messages">
                <h3>Mensajes</h3>
                {filteredMessages.length > 0 ? (
                    filteredMessages.map(msg => (
                        <div className={`message ${msg.name === studentName ? 'sent' : 'received'}`} key={msg.id}>
                            <p>
                                <strong>{msg.name}:</strong> {msg.message}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No hay mensajes en la conversación.</p>
                )}
            </div>
        </div>
    );
};
export default Chat;
