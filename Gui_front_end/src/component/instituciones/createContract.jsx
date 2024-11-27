import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import '../../css/Institutions/CreateContracts.css'
const domain = window.location.hostname;
const CreateContract = () => {
  const [contractType, setContractType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState("");

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
        setMessage("Enviados correctamente")
        setTimeout(() => {
          setMessage("")
        }, 2000);
      } else {
        console.error("Error al crear el contrato:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className='container-contract'>
    <form onSubmit={handleSubmit} className="contract-form">
      <h1>Crear Contracto</h1>
      <label className="form-label">
          Tipo de Contrato:
          <input
              type="text"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              required
              placeholder='semanal/quincelnal/anual'
              className="form-input"
              
          />
      </label>

      <label className="form-label">
          Fecha de Inicio:
          <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="form-input"
          />
      </label>

      <label className="form-label">
          Fecha de Fin:
          <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="form-input"
          />
      </label>

      <label className="form-label">
          Salario:
          <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="form-input"
              placeholder='1000'
          />
      </label>

      <button type="submit" className="submit-button">Crear Contrato</button>
      <h5>{message}</h5>
  </form>
  </div>

  );
};

export default CreateContract;
