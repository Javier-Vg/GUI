
import React, { useState } from 'react';
import { loginUser } from './api'; // Importa la función para manejar el POST

function LoginClient() {
  const [userType, setUserType] = useState('padre'); // Tipo de usuario: padre o institución
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico
    if (!validateEmail(email)) {
      console.error('El correo no es válido');
      return;
    }

    const userData = { userType, email, password };

    // Llamar a la función que maneja el POST
    const data = await loginUser(userData);
    
    if (data && data.success) {
      // Manejar el éxito (ejemplo: redirigir al usuario o mostrar un mensaje)
      console.log('Login exitoso', data);
    } else {
      // Manejar errores
      console.error('Error en el login', data ? data.message : 'Error desconocido');
    }
  };

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        Tipo de usuario:
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="padre">Padre</option>
          <option value="institucion">Institución</option>
        </select>
      </label>

      <label>
        Correo electrónico:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default LoginClient;
