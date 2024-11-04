import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const domain = window.location.hostname;
const CreateContract = () => {
  const [contractType, setContractType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salary, setSalary] = useState('');

  // Obtener el ID de la institución desde el token
  const token = Cookies.get('AuthCookie');
  const institutionId = token ? jwtDecode(token).info.institution : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!institutionId) {
      console.error("No se pudo obtener la institución desde el token.");
      return;
    }

    const contractData = {
      institution: institutionId,
      contract_type: contractType,
      start_date: startDate,
      end_date: endDate,
      salary: salary,
    };

    try {
      const response = await axios.post(
        `http://${domain}:8000/api/contracts/contracts/`,
        contractData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Añadir el token para autenticación si es necesario
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log("Contrato creado exitosamente:");
      } else {
        console.error("Error al crear el contrato:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo de Contrato:
        <input
          type="text"
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          required
        />
      </label>

      <label>
        Fecha de Inicio:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>

      <label>
        Fecha de Fin:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>

      <label>
        Salario:
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </label>

      <button type="submit">Crear Contrato</button>
    </form>
  );
};

export default CreateContract;
