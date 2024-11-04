import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import '../../css/Institutions/CreateSchedule.css';
const domain = window.location.hostname;
const ScheduleForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');
  const [message, setMessage] = useState("");

  // Obtener el ID de la institución desde el token
  const token = Cookies.get('AuthCookie');
  const institutionId = token ? jwtDecode(token).info.institution : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('AuthCookie');
    const institutionId = token ? jwtDecode(token).info.institution : null;

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
        setMessage("Enviados correctamente")
        setTimeout(() => {
          setMessage("")
        }, 2000);
      } else {
        console.error("Error al crear el horario:");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <form className='form-schedule' onSubmit={handleSubmit}>
      <label className='label-schedule'>
        Hora de inicio:
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className='input-schedule'
          required
        />
      </label>

      <label className='label-schedule'>
        Hora de fin:
        <input
        autoComplete='off'
          type="time"
          value={endTime}
          className='input-schedule'
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <label className='label-schedule'>
        Días (ejemplo: Lunes, Miércoles, Viernes):
        <input
          type="text"
          className='input-schedule'
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
      </label>
      <h5>{message}</h5>
      <button className='bttnn-schedule' type="submit">Crear Horario</button>
    </form>
  );
};

export default ScheduleForm;
