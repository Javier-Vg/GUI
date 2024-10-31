import React, { useState, useEffect } from "react";
import { getStaff, getMessages, sendMessage } from "../../service/LoginGui";
import "../../css/Chat.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send'

const Chat = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [staff, setStaff] = useState([]);
  const [storedStudent, setStudentID] = useState('');
  const [storedInstitutionId, setInstitutionId] = useState('');
  const [storedTeacherName, setNameTeacher] = useState('');
  
  useEffect(() => {
    const token = Cookies.get("AuthCookie");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);           
        const institutionIdFromToken = decodedToken.info.institution;
        const NameTeacher = decodedToken.info.username;
        const studentID = decodedToken.info.id;
     
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
    
    
    setMessages(allMessages);
  } catch (error) {
    console.error("Error al cargar los mensajes:", error);
  }
};

useEffect(() => {
  if (selectedMember) {
    fetchMessages(); 
  }
  const interval = setInterval(fetchMessages, 5000); 

  return () => clearInterval(interval);
}, [selectedMember]);



  const handleSendMessage = async () => {
    if (message.trim() && selectedMember && storedStudent) {
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
  const filteredMessages = selectedMember
  ? messages.filter(
      (msg) =>
        msg.staff === selectedMember &&
        msg.institution === storedInstitutionId &&
        msg.students === storedStudent 
    )
  : [];
  // console.log(messages[0].staff);
  console.log(selectedMember);
  
  
  

  // Filtrado de mensajes por miembro seleccionado
  return (
    <div className="container-principal-derecknecio">
    <div className="chat-profesor-container">
      {/* Lista de miembros del staff con imágenes */}

      <div className="chat-bubbles-container-students">
        {staff.map((member) => (
          <div
            key={member.id}
            // className="student-bubble"
            onClick={() => {
              setSelectedMember(member.id);
              // let id = member.id;
              fetchMessages();
            }}
          >
            <div className="contendor-fotos">
           <img
              src={member.imagen_url}
              alt={`${member.name} profile`}
              className="staff-photo"
            />
            <p>{member.username}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contenedor del chat */}
      <div className="chat-container-staf">
        {/* Mostrar los mensajes filtrados */}
        <div className="messages-container-staff">
        {console.log(filteredMessages)
        }
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.name === storedTeacherName ? "sent-estudiante" : "received-estudiante"
                }`}
              ><ChatBubbleIcon/>
                <strong> {msg.name}:</strong> {msg.message}
              </div>
            ))
          ) : (
            <p>No hay mensajes en la conversación.</p>
          )}
        </div>

        {/* Input para enviar un mensaje */}
        
      </div>
      <div className="send-message-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí"
            className="message-input-chat"
          />
          
        </div>
        <button onClick={handleSendMessage} className="send-button-student">
        < SendIcon/>
          </button>
    </div>
    </div>
  );
  
};

export default Chat;
