import React, { useState } from "react";
import { clientId } from '../../keys/keys.js'; // Asegúrate de tener el clientId configurado
import { postInstitutions } from "../../service/LoginGui"; // Asegúrate de que esta función maneje la subida de datos
import '../../css/Register_institutions.css'

function Institucion_register() {
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [estado, setEstado] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null); // Estado para la imagen
  const [monthly_payent, setMonthly_payent] = useState(""); // Estado para la imagen

  const send_data = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    try {
      // Subir la imagen a Imgur
      const auth = "Client-ID " + clientId;
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: auth
        },
      });

      const data = await response.json();
      const imageUrl = data.data.link; // URL de la imagen subida
      console.log(data);
      
      // Luego de subir la imagen, envía los datos del formulario junto con la URL de la imagen
      await postInstitutions(name, address, estado, subscriptionType, phoneNumber, email, imageUrl,monthly_payent,password);
      console.log("Datos e imagen enviados correctamente");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="registration-form">
      <div className="img_circle">
        {file && <img className="image-previsualizacion" src={URL.createObjectURL(file)} alt="Previsualización" />}
      </div>
      <div className="container_inputs">
        <div className="divsInputs">
          <input
            placeholder="Nombre de la Institución:"
            className="inpts"
            type="text"
            id="name_institution"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <input
            placeholder="Dirección de la Institución:"
            className="inpts"
            type="text"
            id="address_institution"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <label htmlFor="state_institution">Estado de la Institución:</label>
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
        <div className="divsInputs">
          <label htmlFor="subscription_type">Tipo de Suscripción:</label>
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
        <div className="divsInputs">
          <input
            placeholder="Numero de telefono"
            className="inpts"
            type="number"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <input
            className="inpts"
            type="email"
            id="email"
            placeholder="Correo de la Institución"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <input
            className="inpts"
            type="number"
            id="monthly_payment"
            placeholder="monthly_payment"
            value={monthly_payent}
            onChange={(e) => setMonthly_payent(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <input
            placeholder="Date"
            className="inpts"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <input placeholder="Contraseña" type="password"value={password} name="" id="" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="divsInputs">
          <input
            placeholder="file"
            className="inpts"
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
      </div>
      <input onClick={send_data} type="submit" value="Guardar" />
    </div>
  );
}
export default Institucion_register;
