// // import React, { useState, useEffect } from 'react';
// // import { sendMessage, getStudents, getMessages } from '../../service/LoginGui'; // Asegúrate de que la ruta sea correcta
// // import '../../css/Chat.css';

// // const ChatProfesor = () => {
// //     console.log("ChatProfesor"); // Agregado aquí

// //     const [selectedStudent, setSelectedStudent] = useState(null);
// //     const [message, setMessage] = useState('');
// //     const [messages, setMessages] = useState([]);
// //     const [students, setStudents] = useState([]);
// //     const storedStaffId = sessionStorage.getItem('StaffID');
// //     const storedInstitutionId = sessionStorage.getItem('InstitutionID');
// //     const storedTeacherName = sessionStorage.getItem('NameTeacher');

// //     const [isPolling, setIsPolling] = useState(false);

// //     useEffect(() => {
// //         const fetchStudents = async () => {
// //             console.log("profesor");

// //             try {
// //                 const studentList = await getStudents();
// //                 const filteredStudents = studentList.filter(student => student.institution.toString() === storedInstitutionId);
// //                 setStudents(filteredStudents);
// //             } catch (error) {
// //                 console.error('Error al cargar los estudiantes:', error);
// //             }
// //         };

// //         fetchStudents();
// //     }, [storedInstitutionId]);

// //     const fetchMessages = async () => {
// //         try {
// //             const messagesList = await getMessages();
// //             setMessages(messagesList);
// //         } catch (error) {
// //             console.error('Error al cargar los mensajes:', error);
// //         }
// //     };

// //     const startPolling = () => {
// //         if (isPolling) return;

// //         setIsPolling(true);
// //         const pollMessages = async () => {
// //             await fetchMessages();
// //             setTimeout(pollMessages, 5000);
// //         };

// //         pollMessages();
// //     };

// //     useEffect(() => {
// //         if (selectedStudent) {
// //             startPolling();
// //         }

// //         return () => {
// //             setIsPolling(false);
// //         };
// //     }, [selectedStudent]);

// //     const handleSendMessage = async () => {
// //         if (message.trim() && selectedStudent && storedStaffId) {
// //             const newMessage = {
// //                 message: message,
// //                 staff: storedStaffId,
// //                 students: selectedStudent,
// //                 institution: storedInstitutionId,
// //                 date: new Date().toISOString(),
// //                 name: storedTeacherName,
// //             };

// //             try {
// //                 const savedMessage = await sendMessage(newMessage);
// //                 setMessages(prevMessages => [...prevMessages, { ...savedMessage, transmitterName: storedTeacherName || "Profesor" }]);
// //                 setMessage('');
// //                 alert('Mensaje enviado correctamente');
// //             } catch (error) {
// //                 console.error('No se pudo enviar el mensaje', error);
// //                 alert('Error al enviar el mensaje. Intenta nuevamente.');
// //             }
// //         } else {
// //             alert('Por favor, selecciona un estudiante y escribe un mensaje.');
// //         }
// //     };

// //     // Lógica para filtrar mensajes
// //     const filteredMessages = selectedStudent
// //         ? messages.filter(msg => msg.students.toString() === selectedStudent.toString() && msg.institution.toString() === storedInstitutionId)
// //         : [];

// //     return (
// //         <div className="chat-container">
// //             <div className="header">Chat con Estudiantes</div>
// //             <div className="student-selector">
// //                 <label>Selecciona un Estudiante:</label>
// //                 <select onChange={(e) => {
// //                     setSelectedStudent(e.target.value);
// //                     fetchMessages();
// //                 }} defaultValue="">
// //                     <option value="" disabled>Selecciona un estudiante</option>
// //                     {students.map(student => (
// //                         <option key={student.id} value={student.id}>{student.username}</option>
// //                     ))}
// //                 </select>
// //             </div>
// //             <div className="message-input">
// //                 <textarea
// //                     value={message}
// //                     onChange={(e) => setMessage(e.target.value)}
// //                     placeholder="Escribe tu mensaje aquí"
// //                 />
// //                 <button onClick={handleSendMessage}>Enviar</button>
// //             </div>
// //             <div className="messages">
// //                 <h3>Mensajes</h3>
// //                 {filteredMessages.length > 0 ? (
// //                     filteredMessages.map(msg => (
// //                         <div className={`message ${msg.staff.toString() === storedStaffId ? 'sent' : 'received'}`} key={msg.id}>
// //                             <p>
// //                                 <strong>{msg.name}:</strong> {msg.message}
// //                             </p>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>No hay mensajes en la conversación.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ChatProfesor;
// // import React, { useState, useEffect } from "react";
// // import { getStudents, getMessages, sendMessage } from "../../service/LoginGui"; // Ajusta la ruta si es necesario
// // import "../../css/ChatProfesor.css";
// // import Cookies from "js-cookie";
// // import { jwtDecode } from "jwt-decode";
// // const ChatProfesor = () => {
// //   const [selectedStudent, setSelectedStudent] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [storedStaffId,setStaffID] = useState('');
// //   const [storedInstitutionId, setInstitutionId] = useState('');
// //   const [storedTeacherName,setNameTeacher] = useState('');
// //   const [isPolling, setIsPolling] = useState(false);

// //   useEffect(() => {
// //     // Extraer el token desde la cookie
// //     const token = Cookies.get("AuthCookie");

// //     if (token) {
// //       try {
// //         // Desencriptar el token
// //         const decodedToken = jwtDecode(token);
// //         const institutionIdFromToken = decodedToken.institution;
// //         const NameTeacher = decodedToken.Name;
// //         const staffID = decodedToken.ID;
// //         setNameTeacher(NameTeacher)
// //         setStaffID(staffID)
// //         setInstitutionId(institutionIdFromToken);
// //       } catch (error) {
// //         console.error("Error al decodificar el token", error);
// //       }
// //     }
// //   }, []);

// //   useEffect(() => {        
// //     const fetchStudents = async () => {
// //       try {
// //         const allStudents = await getStudents();
// //         const filteredStudents = allStudents.filter(
// //           (student) => student.institution === storedInstitutionId
// //         );
// //         setStudents(filteredStudents);
// //       } catch (error) {
// //         console.error("Error al cargar los estudiantes:", error);
// //       }
// //     };

// //     fetchStudents();
// //   }, [storedInstitutionId]);
  
// //   const fetchMessages = async () => {
// //     try {
// //       const allMessages = await getMessages();
// //       setMessages(allMessages);
// //     } catch (error) {
// //       console.error("Error al cargar los mensajes:", error);
// //     }
// //   };

// //   const startPolling = () => {
// //     if (isPolling) return;

// //     setIsPolling(true);
// //     const pollMessages = async () => {
// //       await fetchMessages();
// //       setTimeout(pollMessages, 5000);
// //     };

// //     pollMessages();
// //   };

// //   useEffect(() => {
// //     if (selectedStudent) {
// //       startPolling();
// //     }

// //     return () => {
// //       setIsPolling(false);
// //     };
// //   }, [selectedStudent]);

// //   const handleSendMessage = async () => {
// //     if (message.trim() && selectedStudent && storedStaffId) {
// //       const newMessage = {
// //         message,
// //         staff: storedStaffId,
// //         students: selectedStudent,
// //         institution: storedInstitutionId,
// //         date: new Date().toISOString(),
// //         name: storedTeacherName,
// //       };

// //       try {
// //         const savedMessage = await sendMessage(newMessage);
// //         setMessages((prevMessages) => [
// //           ...prevMessages,
// //           { ...savedMessage, transmitterName: storedTeacherName || "Profesor" },
// //         ]);
// //         setMessage("");
// //         alert("Mensaje enviado correctamente");
// //       } catch (error) {
// //         console.error("No se pudo enviar el mensaje", error);
// //         alert("Error al enviar el mensaje. Intenta nuevamente.");
// //       }
// //     } else {
// //       alert("Por favor, selecciona un estudiante y escribe un mensaje.");
// //     }
// //   };

// //   // Filtrado de mensajes por estudiante seleccionado
// //   const filteredMessages = selectedStudent
// //     ? messages.filter(
// //         (msg) =>
// //           msg.students=== selectedStudent &&
// //           msg.institution === storedInstitutionId
// //       )
// //     : [];

// //   return (
// //     <div className="chat-profesor-container">
// //       {/* Lista de estudiantes con imágenes */}
// //       <div className="chat-bubbles-container">
// //         {students.map((student) => (
// //           <div
// //             key={student.id}
// //             className="student-bubble"
// //             onClick={() => {
// //               setSelectedStudent(student.id);
// //               fetchMessages();
// //             }}
// //           >
// //             <img
// //               src={student.imagen_url}
// //               alt={`${student.name} profile`}
// //               className="student-photo"
// //             />
// //             <p>{student.name}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Contenedor del chat */}
// //       <div className="chat-container">
// //         {/* Mostrar los mensajes filtrados */}
// //         <div className="messages-container">
// //           {filteredMessages.length > 0 ? (
// //             filteredMessages.map((msg, index) => (
// //               <div
// //                 key={index}
// //                 className={`message ${
// //                   msg.staff === storedStaffId ? "sent" : "received"
// //                 }`}
// //               >
// //                 <strong>{msg.name}:</strong> {msg.message}
// //               </div>
// //             ))
// //           ) : (
// //             <p>No hay mensajes en la conversación.</p>
// //           )}
// //         </div>

// //         {/* Input para enviar un mensaje */}
// //         <div className="send-message-container">
// //           <textarea
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             placeholder="Escribe tu mensaje aquí"
// //             className="message-input"
// //           />
// //           <button onClick={handleSendMessage} className="send-button">
// //             Enviar
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatProfesor;
// import React, { useState, useEffect } from "react";
// import { getStudents, getMessages, sendMessage } from "../../service/LoginGui"; // Ajusta la ruta si es necesario
// import "../../css/Chat.css";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// const ChatProfesor = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [storedStaffId,setStaffID] = useState('');
//   const [storedInstitutionId, setInstitutionId] = useState('');
//   const [storedTeacherName,setNameTeacher] = useState('');
//   const pollingInterval = 5000;
//   let pollingTimeout;

//   useEffect(() => {
//     // Extraer el token desde la cookie
//     const token = Cookies.get("AuthCookie");

//     if (token) {
//       try {
//         // Desencriptar el token
//         const decodedToken = jwtDecode(token);
        
//         const institutionIdFromToken = decodedToken.info.institution;
//         const NameTeacher = decodedToken.info.username;
//         const staffID = decodedToken.info.id;
//         console.log("Datos decodificados del token:", {
//           institutionId: institutionIdFromToken,
//           name: NameTeacher,
//           staffID: staffID,
//         });
//         setNameTeacher(NameTeacher)
//         setStaffID(staffID)
//         setInstitutionId(institutionIdFromToken);
//       } catch (error) {
//         console.error("Error al decodificar el token", error);
//       }
//     }
//   }, []);

//   useEffect(() => {        
//     const fetchStudents = async () => {
//       try {
//         const allStudents = await getStudents();
//         const filteredStudents = allStudents.filter(
//           (student) => student.institution === storedInstitutionId
//         );
//         setStudents(filteredStudents);
//       } catch (error) {
//         console.error("Error al cargar los estudiantes:", error);
//       }
//     };

//     fetchStudents();
//   }, [storedInstitutionId]);
  
//   const fetchMessages = async () => {
//     try {
//       const allMessages = await getMessages();
//       setMessages(allMessages);
//     } catch (error) {
//       console.error("Error al cargar los mensajes:", error);
//     }
//   };

//   const startPolling = () => {
//     const pollMessages = async () => {
//       if (selectedMember) {
//         await fetchMessages(selectedMember);
//       }
//       pollingTimeout = setTimeout(pollMessages, pollingInterval);
//     };

//     pollMessages();
//   };

//   useEffect(() => {
//     if (selectedStudent) {
//       startPolling();
//     }

//     return () => {
//       clearTimeout(pollingTimeout);
//     };
//   }, [selectedStudent]);

//   const handleSendMessage = async () => {
//     if (message.trim() && selectedStudent && storedStaffId) {
//       const newMessage = {
//         message,
//         staff: storedStaffId,
//         students: selectedStudent,
//         institution: storedInstitutionId,
//         date: new Date().toISOString(),
//         name: storedTeacherName,
//       };
//       console.log(newMessage);
      
//       try {
//         const savedMessage = await sendMessage(newMessage);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { ...savedMessage, transmitterName: storedTeacherName || "Profesor" },
//         ]);
//         setMessage("");
//       } catch (error) {
//         console.error("No se pudo enviar el mensaje", error);
//       }
//     } else {
//       // alert("Por favor, selecciona un estudiante y escribe un mensaje.");
//     }
//   };

//   // Filtrado de mensajes por estudiante seleccionado
//   const filteredMessages = selectedStudent
//     ? messages.filter(
//         (msg) =>
//           msg.students=== selectedStudent &&
//           msg.institution === storedInstitutionId
//       )
//     : [];

//   return (
//     <div className="div-componentsa">
//       {/* Lista de estudiantes con imágenes */}
//       <div className="chat-bubbles-container">
//         {students.map((student) => (
//           <div
//             key={student.id}
//             className="student-bubble"
//             onClick={() => {
//               setSelectedStudent(student.id);
//               fetchMessages();
//             }}
//           >
//             <img
//               src={student.imagen_url}
//               alt={`${student.name} profile`}
//               className="student-photo"
//             />
//             <p>{student.name}</p>
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
//                   msg.name === storedTeacherName ? "sent" : "received"
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

// export default ChatProfesor;

import React, { useState, useEffect } from "react";
import { getStudents, getMessages, sendMessage } from "../../service/LoginGui"; // Ajusta la ruta si es necesario
import "../../css/ChatProfesor.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
const ChatProfesor = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState([]);
  const [storedStaffId,setStaffID] = useState('');
  const [storedInstitutionId, setInstitutionId] = useState('');
  const [storedTeacherName,setNameTeacher] = useState('');
  const pollingInterval = 5000;
  let pollingTimeout;
  const searchTerm = useSelector((state) => state.search.searchTerm);

  // useEffect(() => {
  //   // Extraer el token desde la cookie
  //   const token = Cookies.get("AuthCookie");

  //   if (token) {
  //     try {
  //       // Desencriptar el token
  //       const decodedToken = jwtDecode(token);
  //       const institutionIdFromToken = decodedToken.info.institution;
  //       const NameTeacher = decodedToken.info.username;
  //       const staffID = decodedToken.info.id;
  //       console.log("Datos decodificados del token:", {
  //         institutionId: institutionIdFromToken,
  //         name: NameTeacher,
  //         staffID: staffID,
  //       });
  //       setNameTeacher(NameTeacher)
  //       setStaffID(staffID)
  //       setInstitutionId(institutionIdFromToken);
  //     } catch (error) {
  //       console.error("Error al decodificar el token", error);
  //     }
  //   }
  // }, []);

  // useEffect(() => {        
  //   const fetchStudents = async () => {
  //     try {
  //       const allStudents = await getStudents();
  //       const filteredStudents = allStudents.filter(
  //         (student) => student.institution === storedInstitutionId
  //       );
  //       setStudents(filteredStudents);
  //     } catch (error) {
  //       console.error("Error al cargar los estudiantes:", error);
  //     }
  //   };

  //   fetchStudents();
  // }, [storedInstitutionId]);
  
  // const fetchMessages = async () => {
  //   try {
  //     const allMessages = await getMessages();
  //     setMessages(allMessages);
  //   } catch (error) {
  //     console.error("Error al cargar los mensajes:", error);
  //   }
  // };

  // const startPolling = () => {
  //   const pollMessages = async () => {
  //     if (selectedStudent) {
  //       await fetchMessages(selectedStudent);
  //     }
  //     pollingTimeout = setTimeout(pollMessages, pollingInterval);
  //   };

  //   pollMessages();
  // };

  // useEffect(() => {
  //   if (selectedStudent) {
  //     startPolling();
  //   }

  //   return () => {
  //     clearTimeout(pollingTimeout);
  //   };
  // }, [selectedStudent]);

  // const handleSendMessage = async () => {
  //   if (message.trim() && selectedStudent && storedStaffId) {
  //     const newMessage = {
  //       message,
  //       staff: storedStaffId,
  //       students: selectedStudent,
  //       institution: storedInstitutionId,
  //       date: new Date().toISOString(),
  //       name: storedTeacherName,
  //     };

  //     try {
  //       const savedMessage = await sendMessage(newMessage);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { ...savedMessage, transmitterName: storedTeacherName || "Profesor" },
  //       ]);
  //       setMessage("");
  //     } catch (error) {
  //       console.error("No se pudo enviar el mensaje", error);
  //     }
  //   } else {
  //     // alert("Por favor, selecciona un estudiante y escribe un mensaje.");
  //   }
  // };

  // // Filtrado de mensajes por estudiante seleccionado
  // const filteredMessages = selectedStudent
  //   ? messages.filter(
  //       (msg) =>
  //         msg.students=== selectedStudent &&
  //         msg.institution === storedInstitutionId
  //     )
  //   : [];

  useEffect(() => {
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.info.institution;
        const NameTeacher = decodedToken.info.username;
        const staffID = decodedToken.info.id;
        console.log("Datos decodificados del token:", {
          institutionId: institutionIdFromToken,
          name: NameTeacher,
          staffID: staffID,
        });
        setNameTeacher(NameTeacher);
        setStaffID(staffID);
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  useEffect(() => {        
    const fetchStudents = async () => {
      try {
        const allStudents = await getStudents();
        const filteredStudents = allStudents.filter(
          (student) => student.institution === storedInstitutionId
        );
        setStudents(filteredStudents);
      } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
      }
    };

    fetchStudents();
  }, [storedInstitutionId]);
  
  const fetchMessages = async () => {
    try {
      const allMessages = await getMessages();
      setMessages(allMessages);
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
    }
  };

  const startPolling = () => {
    const pollMessages = async () => {
      if (selectedStudent) {
        await fetchMessages(selectedStudent);
      }
      pollingTimeout = setTimeout(pollMessages, pollingInterval);
    };

    pollMessages();
  };

  useEffect(() => {
    if (selectedStudent) {
      startPolling();
    }

    return () => {
      clearTimeout(pollingTimeout);
    };
  }, [selectedStudent]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedStudent && storedStaffId) {
      const newMessage = {
        message,
        staff: storedStaffId,
        students: selectedStudent,
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
      }
    }
  };

  const filteredMessages = selectedStudent
    ? messages.filter(
        (msg) =>
          msg.students === selectedStudent &&
          msg.institution === storedInstitutionId
      )
    : [];
  return (
    <div className="div-components">
      {/* Lista de estudiantes con imágenes */}
      <div className="chat-bubbles-container">
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
            <p>{student.username}</p>
          </div>
        ))}
      </div>

      {/* Contenedor del chat */}
      <div className="chat-container">
        {/* Mostrar los mensajes filtrados */}
        <div className="messages-container">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.name === storedTeacherName ? "sent" : "received"
                }`}
              >
                <strong>{msg.name}:</strong> {msg.message}
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

export default ChatProfesor;