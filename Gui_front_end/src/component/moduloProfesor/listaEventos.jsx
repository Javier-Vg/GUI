import React, { useState, useEffect } from 'react'; // Importa React y los hooks necesarios
import Cookies from 'js-cookie'; // Importa la librería para manejar cookies
import { jwtDecode } from "jwt-decode"; // Importa la función para decodificar el token JWT
import { GetEventos } from '../../service/LoginGui'; // Importa la función para obtener eventos
import "../../css/Institutions/teachers/eventosList.css"; // Importa el archivo CSS para estilos

function ListaEventos() {
  // Estados para manejar la ID de la institución, eventos, carga y errores
  const [institutionId, setInstitutionId] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('AuthCookie'); // Obtiene el token de las cookies
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodifica el token
        const institutionIdFromToken = decodedToken.info.institution; // Obtiene la ID de la institución del token 
        setInstitutionId(institutionIdFromToken); // Establece la ID de la institución en el estado
      } catch (error) {
        console.error('Error al decodificar el token', error); // Maneja errores de decodificación
      }
    }
  }, []); // Se ejecuta una vez al montar el componente

  useEffect(() => {
    // Se ejecuta cuando la ID de la institución cambia
    if (institutionId) {
      const fetchEvents = async () => {
        try {
          const eventosObtenidos = await GetEventos(institutionId); // Llama a la función para obtener eventos
          setEventos(eventosObtenidos); // Establece los eventos obtenidos en el estado
          setLoading(false); // Detiene el estado de carga
        } catch (error) {
          console.error('Error al obtener los eventos:', error); // Muestra el error en la consola
          setError('Error al obtener los eventos'); // Establece el mensaje de error
          setLoading(false); // Detiene el estado de carga
        }
      };
      fetchEvents(); // Llama a la función para obtener eventos
    }
  }, [institutionId]); // Dependencia: se ejecuta cuando cambia institutionId

  

  // Filtra los eventos para mostrar solo los que pertenecen a la institución actual
  const eventosFiltrados = eventos.filter(evento => evento.institution === institutionId);

  // Renderiza un mensaje de carga mientras se obtienen los eventos
  if (loading) {
    return <div className="loading">Cargando eventos...</div>;
  }

  // Renderiza un mensaje de error si hay un error
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-container-event"> {/* Contenedor de eventos */}
      <h1 className="event-title-event">Lista de Eventos</h1> {/* Título de la lista de eventos */}

      <div className='evento-list-container2'> {/* Contenedor para la lista de eventos */}
        {eventosFiltrados.length > 0 ? ( // Comprueba si hay eventos filtrados
          <ul className="event-list-event"> {/* Lista de eventos */}
            {eventosFiltrados.map((evento) => ( // Mapea sobre los eventos filtrados
              <li key={evento.id} className="event-ite-event"> {/* Elemento de lista para cada evento */}
                <div className="event-header-event"> {/* Cabecera del evento */}
                  <p className='date-letras-event'>{evento.date}</p> {/* Muestra la fecha del evento */}
                </div>
                <div className='name-event-event'> {/* Nombre del evento */}
                  <h3>{evento.event_name}</h3> {/* Muestra el nombre del evento */}
                </div>
                <p className="event-description-event">{evento.description}</p> {/* Muestra la descripción del evento */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay eventos disponibles.</p> // Mensaje si no hay eventos
        )}   
      </div>
    </div>
  );
}

export default ListaEventos; // Exporta el componente para ser utilizado en otras partes de la aplicación
