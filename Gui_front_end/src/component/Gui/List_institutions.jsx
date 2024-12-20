import React, { useEffect, useState } from "react";
import { getInstitutions, updateInstitutions } from "../../service/LoginGui";
import "../../css/Gui/List_institutions.css";
import axios from "axios";
import Cookies from "js-cookie"; // Importa js-cookie para manejar cookies
const domain = window.location.hostname 

function ListInstitutions() {

    const [instituciones, setInstituciones] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [seeMore2, setSeeMore2] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [editingInstitution, setEditingInstitution] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState(""); // Campo adicional
    const [subject, setSubject] = useState(""); // Campo adicional
    const [statusMessage, setStatusMessage] = useState("");

    const sendEmail = async (emailTo) => {
      const emailData = {
          to_email: emailTo,
          nombre: userName,
          from_email: userEmail,
          mensaje: message,
          subject: subject,
      }; 
      //obtiene los datos de el input y el email se le trae como valor
      //cuando se selecciona la institución para saber a que email enviar el correo
  
      const token = Cookies.get("AuthCookie");
  
      try {
          const response = await axios.post(
              `http://${domain}:8000/api/email/enviar_correo/`,
              emailData, // Enviar directamente el objeto con los datos esperados
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                  },
              }
          );
          //envia el correo a ese endpoint para que en el backend envia el email
          if (response.status === 200) {
              setStatusMessage("Correo enviado exitosamente!");
              setSubject('');
              setPhone('');
              setMessage('');
              setUserEmail('');
              setUserName('');
              // Resetear los valores del formulario cuando se envía el correo
          }
      } catch (error) {
          setStatusMessage("Error al enviar el correo. Verifica la consola para más detalles.");
          console.error("Error al enviar el correo:", error);
      }
  };

    useEffect(() => {
      getInstitutionsData();
    }, []);

    //trae los datos y los setea en una constante
    const getInstitutionsData = async () => {
      try {
        const institutions = await getInstitutions();
        setInstituciones(institutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };
    //abre el modal cuando en boton se toca y capia los datos otras constantes para
    //hace el edit de la institucion
    const openModal = (institution) => {
      setSelectedInstitution(institution);
      setEditingInstitution({ ...institution });
      setSeeMore(true);
    };
    const openModal2 = (institution) => {
      setSelectedInstitution(institution);
      setEditingInstitution({ ...institution });
      setSeeMore2(true);
    };

    //cierra el modal
    const closeModal = () => {
      setSeeMore(false);
      setSelectedInstitution(null);
      setEditingInstitution(null);
      setSeeMore2(false);
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditingInstitution((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    //guarda los cambios en la API dependiendo de la institucion que se selecciono por medio de el ID
    const handleSaveChanges = async () => {
      try {
        console.log("Enviando cambios a la API");
        const updatedInstitution = await updateInstitutions(editingInstitution);
        if (updatedInstitution) {
          const updatedInstitutions = instituciones.map((institution) =>
            institution.id === updatedInstitution.id
              ? updatedInstitution
              : institution
          );
          setInstituciones(updatedInstitutions);
          setMessage("Actulizacion correctamente")
          setTimeout(() => {
            setMessage("")
          }, 2000);
        }
      } catch (error) {
        console.error("Error updating institution:", error);
      }
    };

  return (
    <>
      <div className="institutionList-container">
        <h1>Instituciones</h1>
        <div className="institutionList">
          {instituciones.map((item) => (
            <div className="institutionList-item" key={item.id}>
              <div className="institutionList-imgContainer">
                <img
                  className="institutionList-logo"
                  src={item.imagen_url}
                  alt="No found"
                  onError={() =>
                    console.log("Image failed to load:")
                  }
                />
              </div>
              <div className="institutionList-info">
                <h5>{item.username}</h5>
                <div className="div-botones-infoList">
                  <input
                      onClick={() => openModal(item)}
                      type="button"
                      value="Ver más"
                    />
                    <input
                      onClick={() => openModal2(item)}
                      type="button"
                      value="Enviar Correo"
                    />   
                </div>
                
              </div>
            </div>
          ))}
        </div>


        {seeMore2 && selectedInstitution && (
           <div className="contact-form-email">
           <button className="contact-form__close-button-email" onClick={closeModal}>
               ×
           </button>
           <input 
               autoComplete="off"
               className="contact-form__input-email" 
               type="text" 
               name="user_name" 
               placeholder="Tu nombre" 
               value={userName}
               onChange={(e) => setUserName(e.target.value)} 
               required 
           />
           <input 
               autoComplete="off"
               className="contact-form__input-email" 
               type="email" 
               name="user_email" 
               placeholder="Tu correo" 
               value={userEmail}
               onChange={(e) => setUserEmail(e.target.value)} 
               required 
           />
           <input  
               autoComplete="off"
               className="contact-form__input-email" 
               type="text" 
               name="subject" 
               placeholder="Asunto" 
               value={subject}
               onChange={(e) => setSubject(e.target.value)} 
               required 
           />
           <input 
               autoComplete="off"
               className="contact-form__input-email" 
               type="text" 
               name="phone" 
               placeholder="Teléfono" 
               value={phone}
               onChange={(e) => setPhone(e.target.value)} 
           />
           <input 
               autoComplete="off"
               className="contact-form__textarea-email" 
               name="message" 
               placeholder="Tu mensaje" 
               value={message}
               onChange={(e) => setMessage(e.target.value)} 
               required 
           />
           <button 
               className="contact-form__submit-button-email" 
               onClick={() => sendEmail(selectedInstitution.email)} 
               type="button"
           >
               Enviar
           </button>
           {statusMessage && <p className="contact-form__status-message-email">{statusMessage}</p>}
       </div>
        )}


        {seeMore && selectedInstitution && (
          <div className="institutionList-modal">
            <h2 className="institutionList-title">
              Información de la Institución
            </h2>
            <div className="institutionList-grid">
              <div className="institutionList-item">
                <strong>ID:</strong> {selectedInstitution.id}
              </div>
              <div className="institutionList-item">
                <strong>Nombre:</strong>
                <input
                  autoComplete="off"
                  type="text"
                  name="username"
                  value={editingInstitution.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="institutionList-item">
                <strong>Dirección:</strong>
                <input
                  autoComplete="off"
                  type="text"
                  name="direction"
                  value={editingInstitution.direction}
                  onChange={handleInputChange}
                />
              </div>
              <div className="institutionList-item">
                <strong>Estado:</strong>
                <select
                  name="payment_status"
                  value={editingInstitution.payment_status}
                  onChange={handleInputChange}
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                  {/* <option value="Incative">Vencido</option> */}
                </select>
              </div>
              <div className="institutionList-item">
                <strong>Tipo de Suscripción:</strong>
                <select
                  name="suscription_type"
                  value={editingInstitution.suscription_type}
                  onChange={handleInputChange}
                >
                  <option value="Mensual">Mensual</option>
                  <option value="Anual">Anual</option>
                  {/* <option value="Pro">Pro</option> */}
                </select>
              </div>
              <div className="institutionList-item">
                <strong>Teléfono:</strong>
                <input
                  autoComplete="off"
                  type="text"
                  name="number_phone"
                  value={editingInstitution.number_phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="institutionList-item">
                <strong>Email:</strong>
                <input
                  autoComplete="off"
                  type="email"
                  name="email"
                  value={editingInstitution.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="institutionList-item">
                <strong>Suscripción:</strong>
                <input
                  autoComplete="off"
                  type="text"
                  name="subscription_date"
                  value={editingInstitution.subscription_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="institutionList-item">
              <input
                autoComplete="off"
                className="save_update_gui_ins"
                type="button"
                value="Guardar cambios"
                onClick={handleSaveChanges}
              />
            </div>
            <h5>{message}</h5>
            <button
              className="institutionList-closeButton"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ListInstitutions;

// const [userName, setUserName] = useState('');
// const [userEmail, setUserEmail] = useState('');
// const [message, setMessage] = useState('');
// const [phone, setPhone] = useState(''); // Campo adicional
// const [subject, setSubject] = useState(''); // Campo adicional
// const [statusMessage, setStatusMessage] = useState('');

// const sendEmail = async (e) => {
//     e.preventDefault(); // Evita el comportamiento por defecto del formulario

//     const templateParams = {
//         to_name: "dgonzalez@fwdcostarica.com",
//         from_name: userName,
//         from_email: userEmail,
//         message: message,
//         phone: phone,      // Añadiendo el campo de teléfono
//         subject: subject,  // Añadiendo el campo de asunto
//     };

//     const serviceID = 'service_h9spfqu'; // Reemplaza con tu Service ID
//     const templateID = 'template_2fqlm21'; // Reemplaza con tu Template ID
//     const userID = 'Pfr4da-XGcIA3TO90'; // Reemplaza con tu User ID

//     const authToken = Cookies.get('AuthCookie'); // Cambia 'authToken' por el nombre real de tu cookie

//     try {
//         const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
//             service_id: serviceID,
//             template_id: templateID,
//             user_id: userID,
//             template_params: templateParams,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`, // Añadir el token de autenticación a las cabeceras
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (response.status === 200) {
//             setStatusMessage('Correo enviado exitosamente!');
//         }
//     } catch (error) {
//         setStatusMessage('Error al enviar el correo. Verifica la consola para más detalles.');
//     }
// };
// <form onSubmit={sendEmail}>
//             <input
//                 type="text"
//                 name="user_name"
//                 placeholder="Tu nombre"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 required
//             />
//             <input
//                 type="email"
//                 name="user_email"
//                 placeholder="Tu correo"
//                 value={userEmail}
//                 onChange={(e) => setUserEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 name="subject"
//                 placeholder="Asunto"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 name="phone"
//                 placeholder="Teléfono"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//             />
//             <textarea
//                 name="message"
//                 placeholder="Tu mensaje"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 required
//             />
//             <button type="submit">Enviar</button>
//             {statusMessage && <p>{statusMessage}</p>}
//         </form>
