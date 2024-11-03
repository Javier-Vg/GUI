import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; // jwtDecode no necesita destructuración
import { GetEventos } from '../../service/LoginGui'; 
import "../../css/Institutions/teachers/eventosList.css"


function ListaEventos() {
  const [institutionId, setInstitutionId] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('AuthCookie');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.info.institution; 
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, []);


  useEffect(() => {
    if (institutionId) {
      const fetchEvents = async () => {
        try {

          const eventosObtenidos = await GetEventos(institutionId);
          
          setEventos(eventosObtenidos);
          
          setLoading(false);
          
        } catch (error) {
          console.error('Error al obtener los eventos:', error);
          setError('Error al obtener los eventos');
          setLoading(false);
        }
      };
      fetchEvents();
      
    }
  }, [institutionId]);
  console.log("eventosf",eventos);eventos

  const eventosFiltrados = eventos.filter(evento => evento.institution === institutionId);
  
  

  // Muestra los eventos filtrados
  // Muestra un mensaje de carga si está cargando eventos
  // Muestra un mensaje de error si hay un error al obtener los eventos
 // console.log("eventos", eventos);  // para ver los eventos en consola
 // console.log("eventosFiltrados", eventosFiltrados); // para ver los eventos filtrados en consola
 // console.log("loading", loading); // para ver el estado de carga en consola
 // console.log("error", error); // para ver el estado

  if (loading) {
    return <div className="loading">Cargando eventos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-container">
        <h1 className="event-title">Lista de Eventos</h1>

      
      <div className='evento-list-container2'>
        {eventosFiltrados.length > 0 ? (
            <ul className="event-list">
              {eventosFiltrados.map((evento) => (
                <li key={evento.id} className="event-item">
                  <div className="event-header">
                    
                  <p className='date-letras'>{evento.date}</p>
                  </div>
                  <div className='name-event'>
                    <h3>{evento.event_name}</h3>
                    </div>
                
                  <p className="event-description">{evento.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay eventos disponibles.</p>
          )}   
      </div>
      
    </div>
  );
}

export default ListaEventos;
