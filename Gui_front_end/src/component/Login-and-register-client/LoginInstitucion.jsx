// Componente LoginInstitucion
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername, setPassword, setInstitutionId } from '../../store/CreateStudent';
import { getDatos } from '../../service/LoginGui'; // Asegúrate de importar tu función

function LoginInstitucion() {
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const data = await getDatos(); // Obtén los datos
      const institution = data.find(inst => inst.email === username && inst.password === password); // Ejemplo de verificación

      if (institution) {
        dispatch(setInstitutionId(institution.id)); // Guarda el ID de la institución
        // Realiza más acciones después de iniciar sesión
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nombre de la institucion:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginInstitucion;
