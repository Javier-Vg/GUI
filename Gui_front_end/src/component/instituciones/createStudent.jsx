
import React, { useState, useEffect } from 'react';
import { postStudents } from '../../service/LoginGui';
import { useSelector} from "react-redux";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
const domain = window.location.hostname 

function CreateStudent() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [identificacion, setIdentificacion] = useState('');

  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [estadoAcademico, setEstadoAcademico] = useState('');
  const [grado, setGrado] = useState('');

  const [guardianTelefono, setGuardianTelefono] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
 
  const [nameGuardian, setNameGuardian] = useState('');
  const [alergias, setAlergias] = useState('');
  const [imagen, setImagen] = useState(null);
   
  const [mensualidadDelEstudiante, setMensualidadDelEstudiante] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [password, setPassword] = useState('');

  const [institution_id, setInstitutionId] = useState(null); 
 
  useEffect(() => {
    const token = Cookies.get('AuthCookie'); 

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);  
        const institutionIdFromToken = decodedToken.staff_info.institution;
        console.log(institutionIdFromToken);
        
        // Guardar el ID en una variable local
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, []);
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
        break; // Manejar cambio de contraseña
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
      // Crear el objeto FormData y adjuntar la imagen seleccionada
      const formData = new FormData();
      formData.append("image", imagen);
  
      // Enviar la imagen al backend
      const response = await fetch(`http://${domain}:8000/api/urlResponse/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.image_url) {
        throw new Error('Error al subir la imagen');
      }
      const imageUrl = data.image_url;
      // Aquí agregamos el institutionId al postStudents
      await postStudents(nombre, apellido, identificacion, fechaNacimiento, grado, estadoAcademico, telefono, email, imageUrl, alergias, guardianTelefono, nameGuardian, mensualidadDelEstudiante, password, institution_id); // Añadir institutionId
      setFormMessage("Personal creado exitosamente"); // Mostrar mensaje de éxito

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
      alert('Ocurrió un error al agregar el estudiante.');
    }
  };

  return (
    <div>
      <label>
        Nombre estudiante:
        <input type="text" name="nombre" value={nombre} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Apellido:
        <input type="text" name="apellido" value={apellido} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Número de Identificación:
        <input type="text" name="identificacion" value={identificacion} onChange={handleInputChange} />
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
        <input type="text" name="telefono" value={telefono} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" name="password" value={password} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Nombre del Encargado:
        <input type="text" name="nameGuardian" value={nameGuardian} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Teléfono del Encargado (opcional):
        <input type="text" name="guardianTelefono" value={guardianTelefono} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Alergias:
        <input type="text" name="alergias" value={alergias} onChange={handleInputChange} />
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
        <input type="text" name="mensualidadDelEstudiante" value={mensualidadDelEstudiante} onChange={handleInputChange} />
      </label>
      <br />
      {formMessage && <div>{formMessage}</div>}
      <button type="button" onClick={handleSubmit}>Agregar Estudiante</button>
    </div>
  );
}

export default CreateStudent;