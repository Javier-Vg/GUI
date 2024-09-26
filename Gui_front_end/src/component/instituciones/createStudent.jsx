import React, { useState } from 'react';
import { postStudents } from '../../service/LoginGui';

function CreateStudent() {
  const [studentData, setStudentData] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    fecha_nacimiento: '',
    grado: '',
    estado_academico: '',
    telefono: '',
    email: '',
    contacto_emergencia: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos del estudiante usando la función postStudents
      const response = await postStudents(
        studentData.nombre,
        studentData.apellido,
        studentData.identificacion,
        studentData.fecha_nacimiento,
        studentData.grado,
        studentData.estado_academico,
        studentData.telefono,
        studentData.email,
        studentData.contacto_emergencia
      );
      console.log('Estudiante agregado exitosamente:', response);
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          placeholder="nombre"
          value={studentData.nombre}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Apellido:
        <input
          type="text"
          name="apellido"
          placeholder="apellido"
          value={studentData.apellido}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Número de Identificación:
        <input
          type="text"
          name="identificacion"
          placeholder="número de identificación"
          value={studentData.identificacion}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Fecha de Nacimiento:
        <input
          type="text" // Asegúrate de usar este tipo para fechas
          name="fecha_nacimiento"
          value={studentData.fecha_nacimiento}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Selecciona un Grado:
        <select
          name="grado"
          value={studentData.grado}
          onChange={handleInputChange}
        >
          <option value="">--selecciona un grado--</option>
          <option value="Grado 1">Grado 1</option>
          <option value="Grado 2">Grado 2</option>
        </select>
      </label>
      <br />
      <label>
        Estado Académico:
        <select
          name="estado_academico"
          value={studentData.estado_academico}
          onChange={handleInputChange}
        >
          <option value="">--estado académico--</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </label>
      <br />
      <label>
        Teléfono:
        <input
          type="text"
          name="telefono"
          placeholder="teléfono"
          value={studentData.telefono}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          placeholder="email"
          value={studentData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Contacto de Emergencia:
        <input
          type="text"
          name="contacto_emergencia"
          placeholder="contacto de emergencia"
          value={studentData.contacto_emergencia}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Agregar Estudiante</button>
    </form>
  );
}

export default CreateStudent;
