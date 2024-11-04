
import React, { useState, useEffect } from "react";
import { getStudents, getMessages, sendMessage } from "../../service/LoginGui"; 
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import "../../css/chatProfesor.css";

const ChatProfesor = () => {
  //maneja los estados de mensajes,estudiantes,profesor instituciones
const [selectedStudent, setSelectedStudent] = useState(null);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const [studentsAll, setStudentsAll] = useState([]);
const [students, setStudents] = useState([]);
const [storedStaffId, setStaffID] = useState('');
const [storedInstitutionId, setInstitutionId] = useState('');
const [storedTeacherName, setNameTeacher] = useState('');
const searchTerm = useSelector((state) => state.search.searchTerm);
//manejamos la cokies
useEffect(() => {
    const token = Cookies.get("AuthCookie");//trae todos los datos de la cokies
    if (token) {
      try {
        //Desencriptar el token 
        const { info: { institution, username, id } } = jwtDecode(token);
        setInstitutionId(institution); //guarda el id institucion
        setNameTeacher(username);//guarda el nameTeacher
        setStaffID(id); // guarda el idStaff
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);


useEffect(() => {        
    const fetchStudents = async () => {
      try {
        //extraemos todos los estudiantes
        const allStudents = await getStudents();
        //filtramos los estudiantes que pertenecen a la institución actual
        setStudentsAll(allStudents.filter(student => student.institution === storedInstitutionId));
      } catch (error) {
        console.error("Error loading students", error);
      }
    };
    fetchStudents();
  }, [storedInstitutionId]);

// Este useEffect se activa cuando cambia `studentsAll` o `searchTerm`.
// Filtra los estudiantes de la institución según el término de búsqueda ingresado
// es el filtro de busqueda del nav
useEffect(() => {
    setStudents(studentsAll.filter(student =>
      student.username.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [studentsAll, searchTerm]);

// Este useEffect se activa cuando cambia `selectedStudent`.
// Establece un intervalo que actualiza los mensajes cada 5 segundos si hay un estudiante seleccionado
useEffect(() => {
    if (selectedStudent) {
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedStudent]);

// Función para obtener los mensajes del chat
const fetchMessages = async () => {
    try {
      //obtiene todos los mensajes del backend
      setMessages(await getMessages());
    } catch (error) {
      console.error("Error loading messages", error);
    }
  };


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
