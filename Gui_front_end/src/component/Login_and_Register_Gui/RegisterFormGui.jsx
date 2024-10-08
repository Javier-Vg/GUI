import React, { useState } from 'react';
import { PostData, getDatos } from '../../service/LoginGui'; // Asegúrate de importar `getDatos`
import '../../css/RegisterFormGui.css';
function RegisterFormGui() {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState(''); 
  const [contra, setContra] = useState('');
  const [texto, setTexto] = useState('');
  const [token, setToken] = useState('');

  const cargarDatos = async () => {
    if (nombre.trim() === '' || email.trim() === '' || contra.trim() === '') {
      setTexto("Por favor llene todos los campos");
      return;
    }
    try {
      const datos = await getDatos();
      const usuarioExistente = datos.some(elem => elem.nombre === nombre);
  
      if (usuarioExistente) {
        setTexto("Este usuario ya está registrado");
      } else {
        const response = await PostData(nombre, contra, email, rol,);
  
        if (response.success) {
          setTexto("Registro exitoso!");
          setToken(response.token);
        } else {
          setTexto("Error en el registro");
        }
      }
    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      setTexto("Error al procesar la solicitud");
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
          type="email"
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
          id="contra" 
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
