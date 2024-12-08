import React, { useState, useEffect } from "react";
import { getStaff, getMessages, sendMessage } from "../../service/LoginGui";
import "../../css/Chat.css";
import Cookies from "js-cookie";
import {  jwtDecode } from "jwt-decode";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";

import { InputGroup, FormControl, Button } from "react-bootstrap";

const Chat = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [staff, setStaff] = useState([]);
  const [storedStudent, setStudentID] = useState("");
  const [storedInstitutionId, setInstitutionId] = useState("");
  const [storedTeacherName, setNameTeacher] = useState("");

  const handleKeyDown = (e) => {
    // Verificar si se presionó Enter sin la tecla Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevenir un salto de línea por defecto
      handleSendMessage(); // Llamar a tu función de enviar mensaje
    }
  };



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
          (member) =>
            member.institution === storedInstitutionId &&
            member.position === "Teacher"
        );
        setStaff(filteredStaff);
      } catch (error) {
        console.error("Error al cargar el personal:", error);
      }
    };

    if (storedInstitutionId) fetchStaff();
  }, [storedInstitutionId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const allMessages = await getMessages();
        setMessages(allMessages);
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

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
    
  return (
    <div className="chat-profesor-container">
      {/* Lista de contactos */}
      <div className="div-chat-bubbles-container-students">
        {staff.map((member) => (
          <div
            className={`chat-bubbles-container-students ${
              selectedMember === member.id ? "active-contact" : ""
            }`}
            key={member.id}
            onClick={() => setSelectedMember(member.id)}
          >
            <div className="divs-encap">
              <img
                src={member.imagen_url}
                alt={`${member.name} profile`}
                className="staff-photo"
              />
            </div>
            <div className="divs-encap">
              <p className="p-chat">{member.username}</p>
            </div>
          </div>
        ))}
      </div>
      

      {/* Mensajes */}
      <div className="chat-container-staf">
        <div className="messages-container-staff">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.name === storedTeacherName
                    ? "sent-estudiante"
                    : "received-estudiante"
                }`}
              >
                <ChatBubbleIcon />
                <strong>{msg.name}:</strong> {msg.message}
              </div>
            ))
          ) : (
            <p className="p-chat">No hay mensajes en la conversación.</p>
          )}
        </div>

        <div className="send-message-container">
          <div className="div-message-input-chat">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí"
              className="message-input-chat"
              onKeyDown={handleKeyDown} // Detecta Enter
            />
            <button
              onClick={handleSendMessage}
              className="send-button-student"
            >
              <SendIcon />
            </button>


      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
