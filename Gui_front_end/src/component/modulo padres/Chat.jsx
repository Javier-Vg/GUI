import React, { useState, useEffect } from 'react';
import { sendMessage, getStaff, getMessages } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta

const Chat = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    // Obtener datos almacenados en sessionStorage
    const storedStudentId = sessionStorage.getItem('StudentID');
    const storedStudentName = sessionStorage.getItem('StudentName');
    const storedInstitutionId = sessionStorage.getItem('InstitutionID'); // Institution ID del estudiante

    const [teachers, setTeachers] = useState([]);
    const [studentName, setStudentName] = useState(storedStudentName || '');

    // Log para verificar los IDs almacenados
    console.log("InstitutionID almacenado en sessionStorage:", storedInstitutionId);

    // Obtener profesores y mensajes al cargar el componente
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const staffList = await getStaff();
                console.log("Lista completa de profesores obtenida:", staffList);

                // Filtrar profesores por el institution_id del estudiante
                const filteredTeachers = staffList.filter(teacher => teacher.institution.toString() === storedInstitutionId);
                console.log("Profesores filtrados:", filteredTeachers);
                setTeachers(filteredTeachers);
            } catch (error) {
                console.error('Error al cargar los profesores:', error);
            }
        };

        fetchTeachers();

        // Establecer un intervalo para actualizar los mensajes cada 5 segundos
        const interval = setInterval(fetchMessages, 5000); // 5000 ms = 5 segundos

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [storedInstitutionId]);

    const fetchMessages = async () => {
        try {
            const messagesList = await getMessages();
            console.log("Lista completa de mensajes obtenida:", messagesList);

            // Actualizar el estado de mensajes sin filtrar por institución
            setMessages(messagesList);
        } catch (error) {
            console.error('Error al cargar los mensajes:', error);
        }
    };

    const handleSendMessage = async () => {
        console.log("Mensaje:", message);
        console.log("Profesor seleccionado:", selectedTeacher);
        console.log("Institution ID al enviar:", storedInstitutionId);
        console.log("StudentID al enviar:", storedStudentId);

        if (message.trim() && selectedTeacher && storedStudentId) {
            const newMessage = {
                message: message,
                staff: selectedTeacher,
                students: storedStudentId,
                institution: storedInstitutionId, 
                date: new Date().toISOString(),
            };
            
            console.log("Datos del mensaje a enviar:", newMessage);
            
            try {
                const savedMessage = await sendMessage(newMessage);
                console.log("Mensaje guardado:", savedMessage);

                // Agregar el nuevo mensaje a la lista de mensajes, asegurando que el nombre del transmisor esté incluido
                setMessages(prevMessages => [...prevMessages, { ...savedMessage, transmitterName: studentName || "Estudiante" }]);
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

    // Filtrar mensajes por el profesor seleccionado
    const filteredMessages = selectedTeacher 
        ? messages.filter(msg => msg.staff.toString() === selectedTeacher) // Filtra los mensajes según el profesor seleccionado
        : []; // Si no hay un profesor seleccionado, devuelve un array vacío

    console.log("Mensajes filtrados:", filteredMessages); // Muestra los mensajes filtrados en la consola

    return (
        <div className="chat-container">
            <div className="header">Chat con Profesores</div>
            <div className="teacher-selector">
                <label>Selecciona un Profesor:</label>
                <select onChange={(e) => {
                    setSelectedTeacher(e.target.value);
                    fetchMessages(); // Fetch messages cada vez que se selecciona un profesor
                }} defaultValue="">
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
                {filteredMessages.length > 0 ? (
                    filteredMessages.map(msg => (
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
