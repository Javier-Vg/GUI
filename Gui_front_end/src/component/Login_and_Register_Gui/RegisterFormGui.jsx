import React, { useState } from 'react';
import { PostData, getDatos } from '../../service/LoginGui';
import '../../css/RegisterFormGui.css';

function RegisterFormGui() {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState(''); 
  const [contra, setContra] = useState('');
  const [texto, setTexto] = useState('');
  // const [token, setToken] = useState('');

  const cargarDatos = async () => {
    if (nombre.trim() === '' || email.trim() === '' || contra.trim() === '' || rol.trim() === '') {
      setTexto("Por favor llene todos los campos");
      return;
    }
    
    try {
      const datos = await getDatos(); // Obtén los datos existentes
      const usuarioExistente = datos.some(elem => elem.email === email);
  
      if (usuarioExistente) {
        setTexto("Este correo ya está registrado");
      } else {
        const response = await PostData(nombre, contra, email, rol); // Enviar los datos en un objeto
        
        if (response.success) {
          setTexto("Registro exitoso!");
          // setToken(response.token); // Guarda el token si es necesario
          // Aquí puedes redirigir al usuario o limpiar el formulario
        } else {
          setTexto("Error en el registro: " + (response.error || "Ocurrió un error inesperado"));
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
      </div>
      <div>
        <label htmlFor="rol">Rol:</label>
        <input
          type="text"
          id="rol"
          name="rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        />
      </div>
      <h6>{texto}</h6> {/* Mostrar mensaje aquí */}
      <div>
        <button onClick={cargarDatos}>Registrar</button>
      </div>
    </div>
  );
}

export default RegisterFormGui;
