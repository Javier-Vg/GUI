import React from 'react';

function CreateStaff() {
  return (
    <div>
      <label>
        Nombre:
        <input type="text" placeholder='nombre' />
      </label>
      <br />
      <label>
        Apellidos:
        <input type="text" placeholder='apellidos' />
      </label>
      <br />
      <label>
        Número de Identificación:
        <input type="text" placeholder='número de identificación' />
      </label>
      <br />
      <label>
        Fecha de Nacimiento:
        <input type="text" placeholder='fecha de nacimiento' />
      </label>
      <br />
      <label>
        Dirección:
        <input type="text" placeholder='dirección' />
      </label>
      <br />
      <label>
        Teléfono:
        <input type="text" placeholder='teléfono' />
      </label>
      <br />
      <label>
        Email:
        <input type="text" placeholder='email' />
      </label>
      <br />
      <label>
        Creación de Puesto:
        <input type="text" placeholder='creación de puesto' />
      </label>
      <br />
      <label htmlFor="opciones">Selecciona un Puesto Creado Anteriormente:</label>
      <select id="opciones">
        <option value="">--Selecciona un puesto--</option>
        <option value="puesto1">Director</option>
        <option value="puesto2">Profesor</option>
        <option value="puesto3">Secretaria</option>
      </select>
      <br />
      <label htmlFor="contrato">Selecciona un Contrato:</label>
      <select id="contrato">
        <option value="">--Selecciona un contrato--</option>
        <option value="contrato1">Temporal</option>
        <option value="contrato2">Permanente</option>
      </select>
      <br />
      <label>
        Salario Mensual:
        <input type="text" placeholder='salario mensual' />
      </label>
    </div>
  );
}

export default CreateStaff;
