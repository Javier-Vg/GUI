import React, { useState } from "react";
import { clientId } from '../../keys/keys.js'; // Asegúrate de tener el clientId configurado
import { postInstitutions } from "../../service/LoginGui"; // Asegúrate de que esta función maneje la subida de datos
import '../../css/Gui/Register_institutions.css'
const domain = window.location.hostname 
function Institucion_register() {
  
  const [username, setName] = useState("");
  const [address, setAddress] = useState("");
  const [estado, setEstado] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [msgAlert, setmsgAlert] = useState("");
  //[Todos los de arriba de obtienen los datos de los inputs]
  const [file, setFile] = useState(null); // Estado para la imagen
  const [monthly_payent, setMonthly_payent] = useState(""); // Estado para la imagen
  const send_data = async (e) => {
    e.preventDefault();
    //evita que recargue la pagina
  
    if (!file) {//verifica que la imagen extsa, si no exitse una le dice que seleccione una
      setmsgAlert("Por favor selecciona una imagen.");
      return;
    }
    try {
      // Crear el objeto FormData y adjuntar la imagen seleccionada
      const formData = new FormData();
      formData.append("image", file);
  
      // Enviar la imagen al backend
      const response = await fetch(`http://${domain}:8000/api/urlResponse/`, {
        method: "POST",
        body: formData,
      });
      //convierte la data en json para poder leerlo
      const data = await response.json();
      const imageUrl = data.image_url; // URL de la imagen devuelta por el backend
      await postInstitutions(username, address, estado, subscriptionType, phoneNumber, email, imageUrl,monthly_payent,password);
      setmsgAlert("Datos enviados correctamente")
      //envia todos los datos
    } catch (error) {
      setmsgAlert("Error al subir la imagen:")
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
  <>
    <div className="container-createInst">
      <div className="img_circle-createInst">
        {file && (
          <img
            className="image-preview-createInst"
            src={URL.createObjectURL(file)}
            alt="Previsualización"
          />
        )}
      </div>
      <div className="container-inputs-createInst">
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            placeholder="Nombre de la Institución:"
            className="inputs-createInst"
            type="text"
            id="name_institution"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            placeholder="Dirección de la Institución:"
            className="inputs-createInst"
            type="text"
            id="address_institution"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs-createInst">
          <label className='labels-createInst' htmlFor="state_institution">Estado de la Institución:</label>
          <select
            id="state_institution"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
          </select>
        </div>
        <div className="divsInputs-createInst">
          <label  className='labels-createInst' htmlFor="subscription_type">Tipo de Suscripción:</label>
          <select
            id="subscription_type"
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            <option value="Mensual">Mensual</option>
            <option value="Anual">Anual</option>
          </select>
        </div>
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            placeholder="Número de teléfono"
            className="inputs-createInst"
            type="number"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            className="inputs-createInst"
            type="email"
            id="email"
            placeholder="Correo de la Institución"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            className="inputs-createInst"
            type="number"
            id="monthly_payment"
            placeholder="monthly_payment"
            value={monthly_payent}
            onChange={(e) => setMonthly_payent(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs-createInst">
        <label  className='labels-createInst' htmlFor="subscription_type">Fecha</label>
          <input
          autoComplete="off"
            placeholder="Fecha"
            className="inputs-createInst"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            className="inputs-createInst"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="divsInputs-createInst">
          <input
          autoComplete="off"
            placeholder="Archivo"
            className="inputs-createInst"
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <h5>{msgAlert}</h5>
      </div>
      <input className='inp-submit-createInst' onClick={send_data} type="submit" value="Guardar" />

    </div>
  </>
  );
}
export default Institucion_register;
