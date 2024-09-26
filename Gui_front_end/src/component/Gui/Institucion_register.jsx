import React, { useState } from "react";
import { postInstitutions } from "../../service/LoginGui";
function Institucion_register() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [estado, setEstado] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setdate] = useState("");
  const [Image, setfile] = useState("");


  // esos usestate guarda los estados de los inputs y los envia

  const send_data = async () => {
    try {
      await postInstitutions(
        name,
        address,
        estado,
        subscriptionType,
        phoneNumber,
        email,
        date,
        Image
      );
      // envia los datos en el caso de que sean correctos
    } catch (error) {
      console.error("Error al enviar los datos:", error); // maneja el flujo de errores
    }
  };
  return (
    <div class="registration-form">
      <div className="img_circle">
        <img src="" alt="" />
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
          <label for="state_institution">Estado de la Institución:</label>
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
          <label for="subscription_type">Tipo de Suscripción:</label>
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
            placeholder="Date"
            className="inpts"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            required
          />
        </div>
        <div className="divsInputs">
          <input
            placeholder="file"
            className="inpts"
            type="file"
            id="file"
            value={Image}
            onChange={(e) => setfile(e.target.value)}
            required
          />
        </div>
        
      </div>
      <input onClick={send_data} type="submit" value="Guardar" />
    </div>
  );
}

export default Institucion_register;
