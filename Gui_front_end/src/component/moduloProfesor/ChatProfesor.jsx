
import React, { useState, useEffect } from "react";
import { getStudents, getMessages, sendMessage } from "../../service/LoginGui"; // Ajusta la ruta si es necesario
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import "../../css/chatProfesor.css";

const ChatProfesor = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [studentsAll, setStudentsAll] = useState([]);
  const [students, setStudents] = useState([]);
  const [storedStaffId, setStaffID] = useState('');
  const [storedInstitutionId, setInstitutionId] = useState('');
  const [storedTeacherName, setNameTeacher] = useState('');
  const searchTerm = useSelector((state) => state.search.searchTerm);

  // Extract and decode token on initial load
  useEffect(() => {
    const token = Cookies.get("AuthCookie");
    if (token) {
      try {
        const { info: { institution, username, id } } = jwtDecode(token);
        setInstitutionId(institution);
        setNameTeacher(username);
        setStaffID(id);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  // Fetch and filter students by institution
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const allStudents = await getStudents();
        setStudentsAll(allStudents.filter(student => student.institution === storedInstitutionId));
      } catch (error) {
        console.error("Error loading students", error);
      }
    };
    fetchStudents();
  }, [storedInstitutionId]);

  // Filter students by search term
  useEffect(() => {
    setStudents(studentsAll.filter(student =>
      student.username.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [studentsAll, searchTerm]);

  // Fetch messages for selected student every 5 seconds
  useEffect(() => {
    if (selectedStudent) {
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedStudent]);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setMessages(await getMessages());
    } catch (error) {
      console.error("Error loading messages", error);
    }
  };

  // Send message to selected student
  const handleSendMessage = async () => {
    if (message.trim() && selectedStudent && storedStaffId) {
      try {
        const newMessage = {
          message,
          staff: storedStaffId,
          students: selectedStudent,
          institution: storedInstitutionId,
          date: new Date().toISOString(),
          name: storedTeacherName,
        };
        const savedMessage = await sendMessage(newMessage);
        setMessages(prevMessages => [...prevMessages, { ...savedMessage, transmitterName: storedTeacherName || "Profesor" }]);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  // Filter messages for selected student
  const filteredMessages = selectedStudent 
    ? messages.filter(msg =>
        msg.students === selectedStudent &&
        msg.institution === storedInstitutionId &&
        msg.staff === storedStaffId
      )
    : [];

  return (
    <div className="chatP-profesor-container">
      {/* Lista de estudiantes con imágenes */}
      <div className="div-chatP-bubbles-container-students">
        <div className="chatP-bubbles-container-students">
          {students.map((student) => (
            <div
              key={student.id}
              className="student-bubble"
              onClick={() => {
                setSelectedStudent(student.id);
                fetchMessages();
              }}
            >
              <img
                src={student.imagen_url}
                alt={`${student.name} profile`}
                className="student-photo"
              />
              <p className="nombre-estudiante">{student.username}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor del chat */}
      <div className="chatP-container">
        {/* Mostrar los mensajes filtrados */}
        <div className="messages-container-chatP">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <div 
                key={index}
                className={`message-chatP ${
                  msg.name === storedTeacherName ? "sent-chatP" : "received-chatP"
                }`}
              >
                <ChatBubbleIcon />
                <strong>{msg.name}:</strong> {msg.message}
              </div>
            ))
          ) : (
            <p>No hay mensajes en la conversación.</p>
          )}
        </div>

        {/* Input para enviar un mensaje */}
      </div>
      <div className="send-message-container-chatP">
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí"
            className="message-input-chatP"
          />
          <button onClick={handleSendMessage} className="send-button-chatP">
            <SendIcon />
          </button>
        </div>
    </div>
  );
};

export default ChatProfesor;
