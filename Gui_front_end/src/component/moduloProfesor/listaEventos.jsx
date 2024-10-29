import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; // jwtDecode no necesita destructuración
import { GetEventos } from '../../service/LoginGui'; 


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
        const institutionIdFromToken = decodedToken.institution; 
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

  if (loading) {
    return <div className="loading">Cargando eventos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-container">
      <h1 className="event-title">Lista de Eventos</h1>
      {eventos.length > 0 ? (
        <ul className="event-list">
          {eventos.map((evento) => (
            <li key={evento.id} className="event-item">
              <div className="event-header">
                <h3>{evento.event_name}</h3>
                <p>{evento.date}</p>
              </div>
              <p className="event-description">{evento.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  );
}

export default ListaEventos;
