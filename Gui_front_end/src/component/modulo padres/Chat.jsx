import React, { useState, useEffect } from "react";
import { getStaff, getMessages, sendMessage } from "../../service/LoginGui";
import "../../css/Chat.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Chat = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [staff, setStaff] = useState([]);
  const [storedStudent, setStudentID] = useState('');
  const [storedInstitutionId, setInstitutionId] = useState('');
  const [storedTeacherName, setNameTeacher] = useState('');
  // const pollingInterval = 5000;
  // let pollingTimeout;

  useEffect(() => {
    const token = Cookies.get("AuthCookie");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);           
        const institutionIdFromToken = decodedToken.info.institution;
        const NameTeacher = decodedToken.info.username;
        const studentID = decodedToken.info.id;
        console.log("NameTeacher: ", NameTeacher);
        console.log("StudentID: ", studentID);
        setNameTeacher(NameTeacher);
        setStudentID(studentID);
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  useEffect(() => { 
    const fetchStaff = async () => {
      try {
        const allStaff = await getStaff();
        console.log("todos:",allStaff);
        const filteredStaff = allStaff.filter(
          (member) => member.institution === storedInstitutionId && member.position ==="Teacher"
          
        );
        console.log("Staff filtrado:", filteredStaff);
        setStaff(filteredStaff);
        
      } catch (error) {
        console.error("Error al cargar el personal:", error);
      }
    };

    fetchStaff();
  }, [storedInstitutionId]);

  const fetchMessages = async (memberId) => {
  try {
    const allMessages = await getMessages();  
     const filteredMessages = allMessages.filter(message => 
      (message.staff === memberId) && (message.students === storedStudent)
      
    );    
    setMessages(filteredMessages);
  } catch (error) {
    console.error("Error al cargar los mensajes:", error);
  }
};

useEffect(() => {
  if (selectedMember) {
    fetchMessages(selectedMember); // Fetch initial messages
  }

  const interval = setInterval(() => {
    if (selectedMember) {
      fetchMessages(selectedMember);
    }
  }, 5000); // Cada 5 segundos

  return () => clearInterval(interval);
}, [selectedMember]);


  // const startPolling = () => {
  //   const pollMessages = async () => {
  //     if (selectedMember) {
  //       await fetchMessages(selectedMember);
  //     }
  //     pollingTimeout = setTimeout(pollMessages, pollingInterval);
  //   };

  //   pollMessages();
  // };

  // useEffect(() => {
  //   if (selectedMember) {
  //     fetchMessages(selectedMember); 
  //     startPolling();
  //   }

  //   return () => {
  //     clearTimeout(pollingTimeout);
  //   };
  // }, [selectedMember]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedMember && storedStudent) {
      console.log(storedStudent, storedTeacherName);
      
      const newMessage = {
        message,
        students: storedStudent,
        staff: selectedMember,
        institution: storedInstitutionId,
        date: new Date().toISOString(),
        name: storedTeacherName,
      };

      try {
        const savedMessage = await sendMessage(newMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...savedMessage, transmitterName: storedTeacherName || "Profesor" },
        ]);
        setMessage("");
      } catch (error) {
        console.error("No se pudo enviar el mensaje", error);
        alert("Error al enviar el mensaje. Intenta nuevamente.");
      }
    } else {
      alert("Por favor, selecciona un miembro del staff y escribe un mensaje.");
    }
  };

  // Filtrado de mensajes por miembro seleccionado
  return (
    <div className="chat-profesor-container">
      {/* Lista de miembros del staff con imágenes */}
      <div className="chat-bubbles-container">
        {staff.map((member) => (
          <div
            key={member.id}
            className="student-bubble"
            onClick={() => {
              setSelectedMember(member.id);
              let id = member.id;
              fetchMessages(id);
            }}
          >
            <div className="contendor-fotos">
           <img
              src={member.imagen_url}
              alt={`${member.name} profile`}
              className="student-photo"
            />
            <p>{member.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contenedor del chat */}
      <div className="chat-container">
        {/* Mostrar los mensajes filtrados */}
        <div className="messages-container">
        
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.name === storedTeacherName ? "sent" : "received"
                }`}
              >
                <strong> {msg.name}:</strong> {msg.message}
              </div>
            ))
          ) : (
            <p>No hay mensajes en la conversación.</p>
          )}
        </div>

        {/* Input para enviar un mensaje */}
        <div className="send-message-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí"
            className="message-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
