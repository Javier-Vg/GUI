import React, { useState } from 'react'
import { postInstitutions } from '../../service/LoginGui'
function Institucion_register() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [estado, setEstado] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  // esos usestate guarda los estados de los inputs y los envia

  const send_data = async () => {
    try {
      await postInstitutions(name, address, estado, subscriptionType, phoneNumber, email);
      // envia los datos en el caso de que sean correctos
    } catch (error) {
      console.error("Error al enviar los datos:", error); // maneja el flujo de errores
    }
  };
  send_data();
  return (
    <div>
      <h2>Registro de Instituciones</h2>
        <label htmlFor="name_institution">Nombre de la Institución:</label>
        <input
          type="text"
          id="name_institution"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="address_institution">Dirección de la Institución:</label>
        <input
          type="text"
          id="address_institution"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

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

        <label htmlFor="phone_number">Número de Teléfono:</label>
        <input
          type="tel"
          id="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label htmlFor="email">Correo de la Institución:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input type="submit" value="Guardar" />
    </div>
  );
}

export default Institucion_register
