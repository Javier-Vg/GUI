// import React, { useState, useEffect } from 'react';
// import { sendMessage, getStaff, getMessages } from '../../service/LoginGui';
// import '../../css/Chat.css';

// const Chat = () => {
//     const [selectedTeacher, setSelectedTeacher] = useState(null);
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const storedStudentId = sessionStorage.getItem('StudentID');
//     const storedInstitutionId = sessionStorage.getItem('InstitutionID');
//     const storedStudentDisplayName = sessionStorage.getItem('nameStudent'); 

//     const [teachers, setTeachers] = useState([]);
//     const [studentName, setStudentName] = useState(storedStudentDisplayName || ''); 
//     const [isPolling, setIsPolling] = useState(false); 

//     useEffect(() => {
//         const fetchTeachers = async () => {
//             try {
//                 const staffList = await getStaff();
//                 const filteredTeachers = staffList.filter(teacher => teacher.institution.  () === storedInstitutionId);
//                 setTeachers(filteredTeachers);
//                 console.log("estudiantes");
                
//             } catch (error) {
//                 console.error('Error al cargar los profesores:', error);
//             }
//         };

//         fetchTeachers();
//     }, [storedInstitutionId]);

//     const fetchMessages = async () => {
//         try {
//             const messagesList = await getMessages();
//             setMessages(messagesList);
//         } catch (error) {
//             console.error('Error al cargar los mensajes:', error);
//         }
//     };

//     const startPolling = () => {
//         if (isPolling) return; 

//         setIsPolling(true);
//         const pollMessages = async () => {
//             await fetchMessages(); 
//             setTimeout(pollMessages, 5000);
//         };

//         pollMessages(); 
//     };

//     useEffect(() => {
//         if (selectedTeacher) {
//             startPolling();
//         }

//         return () => {
//             setIsPolling(false);
//         };
//     }, [selectedTeacher]);

//     const handleSendMessage = async () => {
//         if (message.trim() && selectedTeacher && storedStudentId) {
//             const newMessage = {
//                 message: message,
//                 staff: selectedTeacher,
//                 students: storedStudentId,
//                 institution: storedInstitutionId, 
//                 date: new Date().toISOString(),
//                 name: storedStudentDisplayName,
//             };

//             try {
//                 const savedMessage = await sendMessage(newMessage);
//                 setMessages(prevMessages => [...prevMessages, { ...savedMessage, transmitterName: storedStudentDisplayName || "Estudiante" }]);
//                 setMessage('');
//                 alert('Mensaje enviado correctamente');
//             } catch (error) {
//                 console.error('No se pudo enviar el mensaje', error);
//                 alert('Error al enviar el mensaje. Intenta nuevamente.');
//             }
//         } else {
//             alert('Por favor, selecciona un profesor y escribe un mensaje.');
//         }
//     };

//     const filteredMessages = selectedTeacher 
//         ? messages.filter(msg => msg.staff.  () === selectedTeacher)
//         : [];

//     const selectedTeacherData = teachers.find(teacher => teacher.id === selectedTeacher);

//     return (
//         <div className="chat-container">
//             <div className="header">Chat con Profesores</div>
//             <div className="teacher-selector">
//                 <label>Selecciona un Profesor:</label>
//                 <select 
//                     onChange={(e) => {
//                         setSelectedTeacher(e.target.value);
//                         fetchMessages();
//                     }} 
//                     defaultValue=""
//                 >
//                     <option value="" disabled>Selecciona un profesor</option>
//                     {teachers.map(teacher => (
//                         <option key={teacher.id} value={teacher.id}>
//                             {teacher.username}
//                         </option>
//                     ))}
//                 </select>
//                 {selectedTeacherData && (
//                     <div className="teacher-image-container">
//                         <img 
//                             src={selectedTeacherData.imagen_url} 
//                             alt={`${selectedTeacherData.username} - profesor`}
//                             className="teacher-image"
//                         />
//                     </div>
//                 )}
//             </div>
//             <div className="message-input">
//                 <textarea 
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Escribe tu mensaje aquí"
//                 />
//                 <button onClick={handleSendMessage}>Enviar</button>
//             </div>
//             <div className="messages">
//                 <h3>Mensajes</h3>
//                 {filteredMessages.length > 0 ? (
//                     filteredMessages.map(msg => (
//                         <div className={`message ${msg.name === studentName ? 'sent' : 'received'}`} key={msg.id}>
//                             <p>
//                                 <strong>{msg.name}:</strong> {msg.message}
//                             </p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No hay mensajes en la conversación.</p>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Chat;import React, { useEffect, useState } from 'react';
// import { getStaff, getMessages, sendMessage } from '../../service/LoginGui';
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import "../../css/ChatProfesor.css"; // Mantén el estilo igual al de ChatProfesor

// function Chat() {
//   const [staff, setStaff] = useState([]); // Miembros del staff
//   const [selectedMember, setSelectedMember] = useState(null); // Miembro seleccionado
//   const [messages, setMessages] = useState([]); // Mensajes del miembro seleccionado
//   const [newMessage, setNewMessage] = useState(''); // Mensaje que el usuario está escribiendo
//   const [storedInstitutionId, setInstitutionId] = useState(null); // ID de la institución desde el token
//   const [storedStaffId, setStaffId] = useState(null); // ID del profesor desde el token
//   const [storedTeacherName, setTeacherName] = useState(''); // Nombre del profesor desde el token
//   const [isPolling, setIsPolling] = useState(false); // Estado para el polling

//   // Efecto para obtener la institución y el staffID desde el token
//   useEffect(() => {
//     const token = Cookies.get("AuthCookie");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setInstitutionId(decodedToken.institution);
//         setTeacherName(decodedToken.Name);
//         setStaffId(decodedToken.ID);
//       } catch (error) {
//         console.error("Error al decodificar el token", error);
//       }
//     }
//   }, []);

//   // Efecto para obtener el staff filtrado según la institución
//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const response = await getStaff();
//         const filteredStaff = response.filter(member => member.institution === storedInstitutionId);
//         setStaff(filteredStaff);
//       } catch (error) {
//         console.error('Error fetching staff:', error);
//       }
//     };
//     if (storedInstitutionId) {
//       fetchStaff();
//     }
//   }, [storedInstitutionId]);

//   // Función para obtener los mensajes del miembro seleccionado
//   const fetchMessages = async (memberId) => {
//     try {
//       const allMessages = await getMessages();
//       const filteredMessages = allMessages.filter(
//         (msg) => msg.staff === storedStaffId && msg.member === memberId && msg.institution === storedInstitutionId
//       );
//       setMessages(filteredMessages);
//     } catch (error) {
//       console.error("Error al cargar los mensajes:", error);
//     }
//   };

//   // Polling para actualizar mensajes periódicamente
//   const startPolling = (memberId) => {
//     if (isPolling) return;

//     setIsPolling(true);
//     const pollMessages = async () => {
//       await fetchMessages(memberId); // Obtener mensajes para el miembro seleccionado
//       setTimeout(() => pollMessages(memberId), 5000); // Poll cada 5 segundos
//     };
//     pollMessages();
//   };

//   // Este efecto se encarga de iniciar el polling cada vez que se selecciona un nuevo miembro
//   useEffect(() => {
//     if (selectedMember) {
//       startPolling(selectedMember);
//     }
//     return () => setIsPolling(false); // Detener polling al desmontar el componente o cambiar el miembro
//   }, [selectedMember]);

//   // Manejar envío de mensajes
//   const handleSendMessage = async () => {
//     if (newMessage.trim() && selectedMember && storedStaffId) {
//       const newMessageData = {
//         message: newMessage,
//         staff: storedStaffId,
//         member: selectedMember,
//         institution: storedInstitutionId,
//         date: new Date().toISOString(),
//         name: storedTeacherName,
//       };

//       try {
//         const savedMessage = await sendMessage(newMessageData);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { ...savedMessage, transmitterName: storedTeacherName || "Profesor" },
//         ]);
//         setNewMessage(""); // Limpiar el campo de entrada
//         alert("Mensaje enviado correctamente");
//       } catch (error) {
//         console.error("No se pudo enviar el mensaje", error);
//         alert("Error al enviar el mensaje. Intenta nuevamente.");
//       }
//     } else {
//       alert("Por favor, selecciona un miembro del staff y escribe un mensaje.");
//     }
//   };

//   // Filtrado de mensajes por miembro seleccionado
//   const filteredMessages = selectedMember
//     ? messages.filter(
//         (msg) =>
//           msg.member === selectedMember && msg.institution === storedInstitutionId
//       )
//     : [];

//   return (
//     <div className="chat-profesor-container">
//       {/* Lista de miembros del staff con imágenes, adaptado desde ChatProfesor */}
//       <div className="chat-bubbles-container">
//         {staff.map((member) => (
//           <div
//             key={member.id}
//             className="student-bubble" // Reutilizamos el estilo para las burbujas
//             onClick={() => {
//               setSelectedMember(member.id);  // Selecciona el miembro
//               fetchMessages(member.id);      // Pasa el ID del miembro a fetchMessages
//             }}
//           >
//             <img
//               src={member.imagen_url}
//               alt={`${member.name}  profile`}
//               className="student-photo" // Reutilizamos el estilo para las fotos
//             />
//             <p>{member.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* Contenedor del chat */}
//       <div className="chat-container">
//         {/* Mostrar los mensajes filtrados */}
//         <div className="messages-container">
//           {filteredMessages.length > 0 ? (
//             filteredMessages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${msg.staff === storedStaffId ? "sent" : "received"}`}
//               >
//                 <strong>{msg.name}:</strong> {msg.message}
//               </div>
//             ))
//           ) : (
//             <p>No hay mensajes en la conversación.</p>
//           )}
//         </div>

//         {/* Input para enviar un mensaje */}
//         <div className="send-message-container">
//           <textarea
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Escribe tu mensaje aquí"
//             className="message-input"
//           />
//           <button onClick={handleSendMessage} className="send-button">
//             Enviar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;

// import React, { useState, useEffect } from "react";
// import { getStaff, getMessages, sendMessage } from "../../service/LoginGui"; // Ajusta la ruta si es necesario
// import "../../css/ChatProfesor.css";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const Chat = () => {
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [storedStaffId, setStaffID] = useState('');
//   const [storedInstitutionId, setInstitutionId] = useState('');
//   const [storedTeacherName, setNameTeacher] = useState('');
//   const [isPolling, setIsPolling] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("AuthCookie");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const institutionIdFromToken = decodedToken.institution;
//         const NameTeacher = decodedToken.Name;
//         const staffID = decodedToken.id;
//         setNameTeacher(NameTeacher);
//         setStaffID(staffID);
//         setInstitutionId(institutionIdFromToken);
//       } catch (error) {
//         console.error("Error al decodificar el token", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const allStaff = await getStaff();
//         const filteredStaff = allStaff.filter(
//           (member) => member.institution === storedInstitutionId
//         );
//         setStaff(filteredStaff);
//       } catch (error) {
//         console.error("Error al cargar el personal:", error);
//       }
//     };

//     fetchStaff();
//   }, [storedInstitutionId]);

//   const fetchMessages = async (id) => {
//     try {
//       const allMessages = await getMessages();
//       setMessages(allMessages);
//     } catch (error) {
//       console.error("Error al cargar los mensajes:", error);
//     }
//   };

//   const startPolling = () => {
//     if (isPolling) return;

//     setIsPolling(true);
//     const pollMessages = async () => {
//       await fetchMessages();
//       setTimeout(pollMessages, 5000);
//     };

//     pollMessages();
//   };

//   useEffect(() => {
//     if (selectedMember) {
//       startPolling();
//       // Llama a fetchMessages solo cuando se selecciona un miembro
//       fetchMessages();
//     }

//     return () => {
//       setIsPolling(false);
//     };
//   }, [selectedMember]);

//   const handleSendMessage = async () => {
//     if (message.trim() && selectedMember && storedStaffId) {
//       const newMessage = {
//         message,
//         staff: storedStaffId,
//         member: selectedMember,
//         institution: storedInstitutionId,
//         date: new Date().toISOString(),
//         name: storedTeacherName,
//       };

//       try {
//         const savedMessage = await sendMessage(newMessage);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { ...savedMessage, transmitterName: storedTeacherName || "Profesor" },
//         ]);
//         setMessage("");
//         alert("Mensaje enviado correctamente");
//       } catch (error) {
//         console.error("No se pudo enviar el mensaje", error);
//         alert("Error al enviar el mensaje. Intenta nuevamente.");
//       }
//     } else {
//       alert("Por favor, selecciona un miembro del staff y escribe un mensaje.");
//     }
//   };

//   // Filtrado de mensajes por miembro seleccionado
//   const filteredMessages = messages.filter(
//     (msg) =>
//       msg.member === selectedMember &&
//       msg.institution === storedInstitutionId
//   );

//   return (
//     <div className="chat-profesor-container">
//       {/* Lista de miembros del staff con imágenes */}
//       <div className="chat-bubbles-container">
//         {staff.map((member) => (
//           <div
//             key={member.id}
//             className="student-bubble"
//             onClick={() => {
//               setSelectedMember(member.id);
//               let id = member.id;  
//               fetchMessages(id); // Esto ahora se maneja en el efecto
//             }}
//           >
//             {/* <img
//               src={member.imagen_url}
//               alt={`${member.name} profile`}
//               className="student-photo"
//             /> */}
  
//             <p>{member.username}</p>
//           </div>
//         ))}
//       </div>

//       {/* Contenedor del chat */}
//       <div className="chat-container">
//         {/* Mostrar los mensajes filtrados */}
//         <div className="messages-container">
//           {filteredMessages.length > 0 ? (
//             filteredMessages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   msg.staff === storedStaffId ? "sent" : "received"
//                 }`}
//               >
//                 <strong>{msg.name}:</strong> {msg.message}
//               </div>
//             ))
//           ) : (
//             <p>No hay mensajes en la conversación.</p>
//           )}
//         </div>

//         {/* Input para enviar un mensaje */}
//         <div className="send-message-container">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Escribe tu mensaje aquí"
//             className="message-input"
//           />
//           <button onClick={handleSendMessage} className="send-button">
//             Enviar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect } from "react";
import { getStaff, getMessages, sendMessage } from "../../service/LoginGui";
import "../../css/Chat.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// import { all } from "axios";

const Chat = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [staff, setStaff] = useState([]);
  const [storedStudent, setStudentID] = useState('');
  const [storedInstitutionId, setInstitutionId] = useState('');
  const [storedTeacherName, setNameTeacher] = useState('');
  const pollingInterval = 5000;
  let pollingTimeout;

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
    // if (!storedInstitutionId) return; 
    const fetchStaff = async () => {
      try {
        const allStaff = await getStaff();
        console.log("todos:",allStaff);
        const filteredStaff = allStaff.filter(
          (member) => member.institution === storedInstitutionId
          
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


  const startPolling = () => {
    const pollMessages = async () => {
      if (selectedMember) {
        await fetchMessages(selectedMember);
      }
      pollingTimeout = setTimeout(pollMessages, pollingInterval);
    };

    pollMessages();
  };

  useEffect(() => {
    if (selectedMember) {
      fetchMessages(selectedMember); 
      startPolling();
    }

    return () => {
      clearTimeout(pollingTimeout);
    };
  }, [selectedMember]);

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
