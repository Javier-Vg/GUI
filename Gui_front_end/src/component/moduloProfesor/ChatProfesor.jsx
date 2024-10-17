import React, { useState, useEffect } from 'react';
import { sendMessage, getStudents, getMessages } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta
import '../../css/Chat.css';

const ChatProfesor = () => {
    console.log("ChatProfesor"); // Agregado aquí

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [students, setStudents] = useState([]);
    const storedStaffId = sessionStorage.getItem('StaffID');
    const storedInstitutionId = sessionStorage.getItem('InstitutionID');
    const storedTeacherName = sessionStorage.getItem('NameTeacher'); 

    const [isPolling, setIsPolling] = useState(false); 

    useEffect(() => {
        const fetchStudents = async () => {
            console.log("profesor");
            
            try {
                const studentList = await getStudents(); 
                const filteredStudents = studentList.filter(student => student.institution.toString() === storedInstitutionId);
                setStudents(filteredStudents);
            } catch (error) {
                console.error('Error al cargar los estudiantes:', error);
            }
        };

        fetchStudents();
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
        if (selectedStudent) {
            startPolling(); 
        }

        return () => {
            setIsPolling(false);
        };
    }, [selectedStudent]);

    const handleSendMessage = async () => {
        if (message.trim() && selectedStudent && storedStaffId) {
            const newMessage = {
                message: message,
                staff: storedStaffId,
                students: selectedStudent,
                institution: storedInstitutionId,
                date: new Date().toISOString(), 
                name: storedTeacherName, 
            };

            try {
                const savedMessage = await sendMessage(newMessage);
                setMessages(prevMessages => [...prevMessages, { ...savedMessage, transmitterName: storedTeacherName || "Profesor" }]);
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

    // Lógica para filtrar mensajes
    const filteredMessages = selectedStudent 
        ? messages.filter(msg => msg.students.toString() === selectedStudent.toString() && msg.institution.toString() === storedInstitutionId) 
        : []; 

    return (
        <div className="chat-container">
            <div className="header">Chat con Estudiantes</div>
            <div className="student-selector">
                <label>Selecciona un Estudiante:</label>
                <select onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    fetchMessages(); 
                }} defaultValue="">
                    <option value="" disabled>Selecciona un estudiante</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.username}</option>
                    ))}
                </select>
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
                        <div className={`message ${msg.staff.toString() === storedStaffId ? 'sent' : 'received'}`} key={msg.id}>
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

export default ChatProfesor;
