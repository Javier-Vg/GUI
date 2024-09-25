import React from 'react';

function CreateStudent() {
  return (
    <div>
      <label>
        Nombre:
        <input type="text" placeholder='nombre' />
      </label>
      <br />
      <label>
        Apellido:
        <input type="text" placeholder='apellido' />
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
        Grado:
        <input type="text" placeholder='grado' />
      </label>
      <br />
      <label>
        Selecciona un Grado:
        <select>
          <option value="">--selecciona un grado--</option>
          <option value="grado">Grado 1</option>
          <option value="grado">Grado 2</option>
          {/* Agrega más opciones aquí según sea necesario */}
        </select>
      </label>
      <br />
      <label>
        Estado Académico:
        <select>
          <option value="">--estado académico--</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
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
        Contacto de Emergencia:
        <input type="text" placeholder='contacto de emergencia' />
      </label>
    </div>
  );
}

export default CreateStudent;
