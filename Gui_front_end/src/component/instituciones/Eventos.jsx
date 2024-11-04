
import React, { useEffect, useState } from 'react';
import { PostEvento } from "../../service/LoginGui";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
function Eventos() {
  // Estados para manejar el nombre del evento, fecha, descripción, institución, carga, error y éxito
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Manejadores de cambios para actualizar los estados
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  useEffect(() => {
    const token = Cookies.get('AuthCookie'); // Obtiene el token de las cookies
    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token); // Decodifica el token
        const institutionIdFromToken = decodedToken.info.institution; // Obtiene la ID de la institución del token
        
        setInstitution(institutionIdFromToken); // Establece la institución desde el token
      } catch (error) {
        console.error('Error al decodificar el token', error); // Maneja errores de decodificación
      }
    }
  }, []); // Se ejecuta una vez al montar el componente

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true); // Establece el estado de carga
    setError(''); // Limpia mensajes de error anteriores
    setSuccess(''); // Limpia mensajes de éxito anteriores

    // Validación de fecha
    const selectedDate = new Date(date); // Convierte la fecha seleccionada en un objeto Date
    const currentDate = new Date(); // Obtiene la fecha actual
    currentDate.setHours(0, 0, 0, 0); // Ignora la hora para solo comparar fechas

    // Comprueba si la fecha seleccionada es anterior a la fecha actual
    if (selectedDate < currentDate) {
      setError("La fecha del evento no puede ser en el pasado."); // Establece el mensaje de error
      setLoading(false); // Detiene la carga
      return; // No envía el formulario si la fecha es inválida
    }

    // Crea el objeto con los datos del evento
    const eventData = {
      event_name: eventName,
      date: date,
      description: description,
      institution: institution // Este valor se envía pero no se muestra
    };

    try {
      const response = await PostEvento(eventData); // Envía los datos del evento
      setSuccess("Event created successfully!"); // Establece el mensaje de éxito
    } catch (err) {
      setError("Failed to create event."); // Establece el mensaje de error si falla el envío
      console.error("Error:", err); // Muestra el error en la consola
    } finally {
      setLoading(false); // Detiene la carga
    }
  };

  return (
    <div className='container-events-create'> {/* Contenedor del formulario */}
        <form onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
          <div>
            <label className='label-event-create-name'>Event Name</label> {/* Etiqueta para el nombre del evento */}
            <input className='type-text-event' /* Campo de entrada para el nombre del evento */
              type="text"
              value={eventName} // Valor del campo de entrada
              onChange={handleEventNameChange} // Maneja cambios en el campo
              required // Campo obligatorio
            />
          </div>
          <div>
            <label className='label-event-create-date'>Date</label> {/* Etiqueta para la fecha */}
            <input className='input-date-event' /* Campo de entrada para la fecha */
              type="date"
              value={date} // Valor del campo de entrada
              onChange={handleDateChange} // Maneja cambios en el campo
              required // Campo obligatorio
            />
          </div>
          <div>
            <label className='label-event-create-description'>Description</label> {/* Etiqueta para la descripción */}
            <input className='type-text-event' /* Campo de entrada para la descripción */
              type="text"
              value={description} // Valor del campo de entrada
              onChange={handleDescriptionChange} // Maneja cambios en el campo
              required // Campo obligatorio
              maxLength="500" // Limita la longitud máxima de entrada
            />
          </div>
          {/* Se elimina el campo para mostrar la institución */}
          <button className='button-event-create-create' type="submit" disabled={loading}> {/* Botón de envío */}
            {loading ? 'Submitting...' : 'Create Event'} {/* Cambia el texto según el estado de carga */}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra mensaje de error si existe */}
          {success && <p style={{ color: 'green' }}>{success}</p>} {/* Muestra mensaje de éxito si existe */}
        </form>
    </div>
  );
}

export default Eventos; 
