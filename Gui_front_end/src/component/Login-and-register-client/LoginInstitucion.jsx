import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../../Redux/Slices/SliceLogin';
import "../../css/Eleccion_login.css";
import { postInstitutions } from '../../service/LoginGui';

function LoginInstitucion() {
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const dispatch = useDispatch();

  // Despacha el username cuando cambia
  useEffect(() => {
    dispatch(setUsername(username));
  }, [username, dispatch]); // Se ejecuta cuando username cambia

  // Despacha el password cuando cambia
  useEffect(() => {
    dispatch(setPassword(password));
  }, [password, dispatch]); // Se ejecuta cuando password cambia

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      // Llama a la función de inicio de sesión
      const response = await postInstitutions(username, password);

      // Guarda el token en localStorage
      localStorage.setItem('token', response.data.token);

      // Puedes agregar aquí más lógica si es necesario, como redirigir al usuario
      console.log("Inicio de sesión exitoso", response.data);
    } catch (error) {
      console.error("Error al iniciar sesión", error.response?.data || error.message);
      // Manejar el error de inicio de sesión aquí (mostrar un mensaje al usuario, etc.)
    }
  };

  return (
    <div className='container-login'>
        <div className='div-1'>
          <label htmlFor="username">Nombre de la institucion:</label>
          <input
            autoComplete="off"
           className='inp-username'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>

        <div className='div-2'>
          <label htmlFor="password">Contraseña:</label>
          <input
           autoComplete="off"
            className='inp-password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
    </div>
  );
}

export default LoginInstitucion