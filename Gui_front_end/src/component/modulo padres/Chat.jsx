import React, { useState, useEffect } from 'react';
import { sendMessage, getStaff, getMessages } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

const Chat = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const storedStudentId = sessionStorage.getItem('StudentID');
    const storedStudentName = sessionStorage.getItem('StudentName');
    const storedInstitutionId = sessionStorage.getItem('InstitutionID'); // Obtener institutionID desde sessionStorage
    
    const [studentName, setStudentName] = useState(storedStudentName || '');
    const [teachers, setTeachers] = useState([]);

    // Log para verificar el ID del estudiante y la institución
    console.log("StudentID almacenado en sessionStorage:", storedStudentId);
    console.log("InstitutionID almacenado en sessionStorage:", storedInstitutionId);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const staffList = await getStaff();

                // Log para verificar los profesores obtenidos
                console.log("Lista de profesores obtenida:", staffList);

                const filteredTeachers = staffList.filter(teacher => teacher.position === 'Teacher');
                setTeachers(filteredTeachers);
            } catch (error) {
                console.error('Error al cargar los profesores:', error);
            }
        };

        fetchTeachers();
    }, []);

    // Nueva función para obtener todos los mensajes
    const fetchMessages = async () => {
        try {
            const allMessages = await getMessages(); // Obtener todos los mensajes desde la API
            setMessages(allMessages); // Almacenar los mensajes en el estado
        } catch (error) {
            console.error('Error al cargar los mensajes:', error);
        }
    };

    // Llamar a fetchMessages cuando se monte el componente
    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        // Log para verificar los valores antes de enviar el mensaje
        console.log("Mensaje:", message);
        console.log("Profesor seleccionado:", selectedTeacher);
        console.log("Institution ID al enviar:", storedInstitutionId);
        console.log("StudentID al enviar:", storedStudentId);

        if (message.trim() && selectedTeacher && storedStudentId) {
            const newMessage = {
                message: message,
                staff: selectedTeacher,
                students: storedStudentId,
                institution: storedInstitutionId, // Usar institutionID desde sessionStorage
                date: new Date().toISOString(),
            };
            
            console.log("Datos del mensaje a enviar:", newMessage);
            
            try {
                const savedMessage = await sendMessage(newMessage);
                
                // Log para verificar la respuesta de la API al enviar el mensaje
                console.log("Mensaje guardado:", savedMessage);

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

    return (
        <div className="chat-container">
            <div className="header">Chat con Profesores</div>
            <div className="teacher-selector">
                <label>Selecciona un Profesor:</label>
                <select onChange={(e) => setSelectedTeacher(e.target.value)} defaultValue="">
                    <option value="" disabled>Selecciona un profesor</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.username}</option>
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
                {messages.length > 0 ? (
                    messages.map(msg => (
                        <div className="message" key={msg.id}>
                            <p><strong>{msg.transmitterName}:</strong> {msg.message} <span className="timestamp">({new Date(msg.date).toLocaleString()})</span></p>
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
