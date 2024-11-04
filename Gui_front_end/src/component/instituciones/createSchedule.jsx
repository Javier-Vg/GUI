import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const domain = window.location.hostname;
const ScheduleForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');

  // Obtener el ID de la institución desde el token
  const token = Cookies.get('AuthCookie');
  const institutionId = token ? jwtDecode(token).info.institution : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!institutionId) {
      console.error("No se pudo obtener la institución desde el token.");
      return;
    }

    const scheduleData = {
      institution: institutionId,
      start_time: startTime,
      end_time: endTime,
      days: days,
    };
    
    try {
      const response = await axios.post(
      `http://${domain}:8000/api/schedule/schedule/`,
        scheduleData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Añadir el token para autenticación si es necesario
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log("Horario creado exitosamente:")
      } else {
        console.error("Error al crear el horario:");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Hora de inicio:
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label>
        Hora de fin:
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <label>
        Días (ejemplo: Lunes, Miércoles, Viernes):
        <input
          type="text"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
      </label>

      <button type="submit">Crear Horario</button>
    </form>
  );
};

export default ScheduleForm;
