// import React, { useState } from 'react';
// import { postStudents } from '../../service/LoginGui';
// import { clientId } from '../../keys/keys.'; 
// function CreateStudent() {
//   const [studentData, setStudentData] = useState({
//     nombre: '',
//     apellido: '',
//     identificacion: '',
//     fecha_nacimiento: '',
//     grado: '',
//     estado_academico: '',
//     telefono: '',
//     email: '',
//     contacto_emergencia: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({
//       ...studentData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validación de campos obligatorios
//     for (const [key, value] of Object.entries(studentData)) {
//       if (!value) {
//         console.error(`El campo ${key} es obligatorio.`);
//         return; // Salir si algún campo está vacío
//       }
//     }

//     try {
//       const response = await postStudents(studentData);
//       console.log('Estudiante agregado exitosamente:', response);
//     } catch (error) {
//       console.error('Error al agregar estudiante:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Nombre:
//         <input
//           type="text"
//           name="nombre"
//           placeholder="nombre"
//           value={studentData.nombre}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Apellido:
//         <input
//           type="text"
//           name="apellido"
//           placeholder="apellido"
//           value={studentData.apellido}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Número de Identificación:
//         <input
//           type="text"
//           name="identificacion"
//           placeholder="número de identificación"
//           value={studentData.identificacion}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Fecha de Nacimiento:
//         <input
//           type="date" // Cambiado a tipo "date" para mejor manejo de fechas
//           name="fecha_nacimiento"
//           value={studentData.fecha_nacimiento}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Selecciona un Grado:
//         <select
//           name="grado"
//           value={studentData.grado}
//           onChange={handleInputChange}
//         >
//           <option value="">--selecciona un grado--</option>
//           <option value="Grado 1">Grado 1</option>
//           <option value="Grado 2">Grado 2</option>
//         </select>
//       </label>
//       <br />
//       <label>
//         Estado Académico:
//         <select
//           name="estado_academico"
//           value={studentData.estado_academico}
//           onChange={handleInputChange}
//         >
//           <option value="">--estado académico--</option>
//           <option value="activo">Activo</option>
//           <option value="inactivo">Inactivo</option>
//         </select>
//       </label>
//       <br />
//       <label>
//         Teléfono:
//         <input
//           type="text"
//           name="telefono"
//           placeholder="teléfono"
//           value={studentData.telefono}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           value={studentData.email}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Contacto de Emergencia:
//         <input
//           type="text"
//           name="contacto_emergencia"
//           placeholder="contacto de emergencia"
//           value={studentData.contacto_emergencia}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Agregar Estudiante</button>
//     </form>
//   );
// }

// export default CreateStudent;
import React, { useState } from 'react';
import { postStudents } from '../../service/LoginGui';
import { clientId } from '../../keys/keys'; 

function CreateStudent() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [grado, setGrado] = useState('');
  const [estado_academico, setEstadoAcademico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contacto_emergencia, setContactoEmergencia] = useState('');
  const [imagen, setImagen] = useState(null); // Para almacenar la imagen

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
      case 'fecha_nacimiento':
        setFechaNacimiento(value);
        break;
      case 'grado':
        setGrado(value);
        break;
      case 'estado_academico':
        setEstadoAcademico(value);
        break;
      case 'telefono':
        setTelefono(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'contacto_emergencia':
        setContactoEmergencia(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagen(file); // Almacena el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!nombre || !apellido || !identificacion || !fecha_nacimiento || !grado || !estado_academico || !telefono || !email || !contacto_emergencia) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      // Subir la imagen a Imgur
      if (!imagen) {
        alert("Por favor selecciona una imagen.");
        return;
      }

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
      const imageUrl = data.data.link; // URL de la imagen subida

      // Crear un objeto con los datos del estudiante
      const studentInfo = {
        nombre,
        apellido,
        identificacion,
        fecha_nacimiento,
        grado,
        estado_academico,
        telefono,
        email,
        contacto_emergencia,
        imagen: imageUrl, // Asignar la URL de la imagen
      };
      console.log(studentInfo);
      
      // Enviar la información del estudiante
      const responsePost = await postStudents(studentInfo);
      console.log('Estudiante agregado exitosamente:', responsePost);
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
          value={nombre}
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
          value={apellido}
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
          value={identificacion}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Fecha de Nacimiento:
        <input
          type="date" // Cambiado a tipo "date" para mejor manejo de fechas
          name="fecha_nacimiento"
          value={fecha_nacimiento}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Selecciona un Grado:
        <select
          name="grado"
          value={grado}
          onChange={handleInputChange}
        >
          <option value="">--selecciona un grado--</option>
          <option value="Grado 1">Grado 1</option>
          <option value="Grado 2">Grado 2</option>
          {/* Agrega más grados según sea necesario */}
        </select>
      </label>
      <br />
      <label>
        Estado Académico:
        <select
          name="estado_academico"
          value={estado_academico}
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
          value={telefono}
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
          value={email}
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
          value={contacto_emergencia}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Imagen:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      <br />
      <button type="submit">Agregar Estudiante</button>
    </form>
  );
}

export default CreateStudent;

