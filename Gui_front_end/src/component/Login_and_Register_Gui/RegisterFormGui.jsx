import React, { useState } from 'react';
import { PostData, getDatos } from '../../service/LoginGui'; // Asegúrate de importar `getDatos`
import '../../css/RegisterFormGui.css';
function RegisterFormGui() {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState(''); // Estado para el correo
  const [contra, setContra] = useState('');
  const [texto, setTexto] = useState('');

  // Función que se encarga de validar el registro
  const cargarDatos = async () => {
    // Valida que los espacios estén llenos
    if (nombre.trim() === '' || email.trim() === '' || contra.trim() === '') {
      setTexto("Por favor llene todos los campos");
      return;
    }

    // Llama a la función get del API
    const datos = await getDatos();
    // Verifica si ya existe un usuario con el mismo nombre
    const usuarioExistente = datos.some(elem => elem.nombre === nombre);

    // Si ya existe, muestra un mensaje
    if (usuarioExistente) {
      setTexto("Este usuario ya está registrado");
    } else {
      // Si no está registrado, guarda lo que está en el input
      PostData(nombre, contra, email,rol); // Asegúrate de que esta función esté definida para manejar el registro
      // Asumiendo que tu API devuelve un objeto con una propiedad `success`
        setTexto("Registro exitoso!"); // Muestra mensaje de registro exitoso
     
    }
  };

  return (
    <div>
      <h4>REGISTER</h4>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Correo:</label>
        <input
          type="email" // Cambiar a tipo email para validación automática
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contra">Contraseña:</label>
        <input
          type="password"
          id="contra" // Cambiar a 'contra' para que coincida
          name="contra"
          value={contra}
          onChange={(e) => setContra(e.target.value)}
          pattern="\w{3,8}"
          title="La contraseña debe tener entre 3 y 8 caracteres alfanuméricos"
          required
        />
        <label htmlFor="rol">rol</label>
        <input onChange={(e) => setRol(e.target.value)} type="text" />
        <h6>{texto}</h6> {/* Mostrar mensaje aquí */}
      </div>
      <div>
        <button onClick={cargarDatos}>Registrar</button>
      </div>
    </div>
  );
}

export default RegisterFormGui;
