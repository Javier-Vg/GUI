import React, { useEffect, useState } from 'react';
import { PostEvento } from "../../service/LoginGui";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import '../../css/Institutions/Eventos.css';
function Eventos() {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  useEffect(() => {
    const token = Cookies.get('AuthCookie');
    
    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.institution; 
        
        setInstitution(institutionIdFromToken); // Establecer la institución desde el token
        
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validación de fecha
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Ignorar la hora para solo comparar fechas

    if (selectedDate < currentDate) {
      setError("La fecha del evento no puede ser en el pasado.");
      setLoading(false);
      return; // No envía el formulario si la fecha es inválida
    }

    const eventData = {
      event_name: eventName,
      date: date,
      description: description,
      institution: institution // Este valor se envía pero no se muestra
    };

    try {
      const response = await PostEvento(eventData);
      setSuccess("Event created successfully!");
    } catch (err) {
      setError("Failed to create event.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-events'>
        <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={handleEventNameChange}
          required
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          required
          maxLength="500"
        />
      </div>

      {/* Se elimina el campo para mostrar la institución */}

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Create Event'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
    </div>
  );
}

export default Eventos;
