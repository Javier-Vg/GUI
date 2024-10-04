import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../../store/inputSlice';

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

  return (
    <div>
      <form>
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
      </form>
    </div>
  );
}

export default LoginInstitucion