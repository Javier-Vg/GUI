// Componente CreateStudent.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postStudents } from '../../service/LoginGui';
import { clientId } from "../../keys/keys.js";

function CreateStudent() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [grado, setGrado] = useState('');
  const [estadoAcademico, setEstadoAcademico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [guardianTelefono, setGuardianTelefono] = useState('');
  const [nameGuardian, setNameGuardian] = useState('');
  const [imagen, setImagen] = useState(null);
  const [alergias, setAlergias] = useState('');
  const [mensualidadDelEstudiante, setMensualidadDelEstudiante] = useState('');
  const [password, setPassword] = useState('');

  const institutionId = useSelector((state) => state.input.institutionId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'apellido':
        setApellido(value);
        break;
      case 'identificacion':
        setIdentificacion(value);
        break;
      case 'fechaNacimiento':
        setFechaNacimiento(value);
        break;
      case 'grado':
        setGrado(value);
        break;
      case 'estadoAcademico':
        setEstadoAcademico(value);
        break;
      case 'telefono':
        setTelefono(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'guardianTelefono':
        setGuardianTelefono(value);
        break;
      case 'nameGuardian':
        setNameGuardian(value);
        break;
      case 'alergias':
        setAlergias(value);
        break;
      case 'mensualidadDelEstudiante':
        setMensualidadDelEstudiante(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !apellido || !identificacion || !fechaNacimiento || !grado || !estadoAcademico || !telefono || !email || !nameGuardian || !mensualidadDelEstudiante || !password) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!imagen) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    try {
      const auth = "Client-ID " + clientId;
      const formData = new FormData();
      formData.append("image", imagen);
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (!data.data.link) {
        throw new Error('Error al subir la imagen');
      }
      const imageUrl = data.data.link;

      await postStudents(nombre, apellido, identificacion, fechaNacimiento, grado, estadoAcademico, telefono, email, imageUrl, alergias, guardianTelefono, nameGuardian, mensualidadDelEstudiante, password, institutionId);
      console.log('Estudiante agregado exitosamente');

      // Restablecer campos
      setNombre('');
      setApellido('');
      setIdentificacion('');
      setFechaNacimiento('');
      setGrado('');
      setEstadoAcademico('');
      setTelefono('');
      setEmail('');
      setGuardianTelefono('');
      setNameGuardian('');
      setImagen(null);
      setAlergias('');
      setMensualidadDelEstudiante('');
      setPassword('');
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
      alert('Ocurrió un error al  agregar el estudiante.');
    }
  };

  return (
    <div>
      <label>
        Nombre estudiante:
        <input type="text" name="nombre" placeholder="nombre" value={nombre} onChange={handleInputChange} />
      </label>
      {/* <br />
      <label>
        Apellido:
        <input type="text" name="apellido" placeholder="apellido" value={apellido} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Número de Identificación:
        <input type="text" name="identificacion" placeholder="identificación" value={identificacion} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Fecha de Nacimiento:
        <input type="date" name="fechaNacimiento" value={fechaNacimiento} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Selecciona un Grado:
        <select name="grado" value={grado} onChange={handleInputChange}>
          <option value="">--selecciona un grado--</option>
          <option value="1st Grade">grado 1</option>
          <option value="2nd Grade">Grado 2</option>
          <option value="3rd Grade">Grado 3</option>
          <option value="4th Grade">Grado 4</option>
          <option value="5th Grade">Grado 5</option>
          <option value="6th Grade">Grado 6</option>
        </select>
      </label>
      <br />
      <label>
        Estado Académico:
        <select name="estadoAcademico" value={estadoAcademico} onChange={handleInputChange}>
          <option value="">--estado académico--</option>
          <option value="Active">Activo</option>
          <option value="Inactive">Inactivo</option>
        </select>
      </label>
      <br />
      <label>
        Teléfono:
        <input type="text" name="telefono" placeholder="teléfono" value={telefono} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" placeholder="email" value={email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" name="password" placeholder="contraseña" value={password} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Nombre del Encargado:
        <input type="text" name="nameGuardian" placeholder="nombre del encargado" value={nameGuardian} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Teléfono del Encargado (opcional):
        <input type="text" name="guardianTelefono" placeholder="teléfono del encargado" value={guardianTelefono} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Alergias:
        <input type="text" name="alergias" placeholder="alergias" value={alergias} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Imagen:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <br />
      <br />
      <label>
        Mensualidad del Estudiante:
        <input type="text" name="mensualidadDelEstudiante" placeholder="mensualidad" value={mensualidadDelEstudiante} onChange={handleInputChange} />
      </label>
      <br />
      <button type="button" onClick={handleSubmit}>Agregar Estudiante</button>
    </div>
  );
}

export default CreateStudent;
