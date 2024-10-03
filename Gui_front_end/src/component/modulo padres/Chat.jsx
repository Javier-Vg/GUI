import React, { useState } from 'react';

const Chat = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    // Simulación de profesores (esto podría venir de una API)
    const teachers = [
        { id: '1', name: 'Prof. Juan' },
        { id: '2', name: 'Prof. María' },
        { id: '3', name: 'Prof. Luis' },
    ];

    const handleSendMessage = () => {
        if (message.trim() && selectedTeacher) {
            const newMessage = {
                id: messages.length + 1,
                teacherId: selectedTeacher,
                text: message,
                date: new Date().toLocaleString(),
                sender: 'Papa', // o el nombre del padre
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const filteredMessages = selectedTeacher 
        ? messages.filter(msg => msg.teacherId === selectedTeacher)
        : [];

    return (
        <div>
            <h2>Chat con Profesores</h2>
            <div>
                <label>Selecciona un Profesor:</label>
                <select onChange={(e) => setSelectedTeacher(e.target.value)} defaultValue="">
                    <option value="" disabled>Selecciona un profesor</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
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
                            <p><strong>{msg.sender}:</strong> {msg.text} <em>({msg.date})</em></p>
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
