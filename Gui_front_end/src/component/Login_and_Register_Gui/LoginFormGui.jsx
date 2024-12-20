import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../../Redux/Slices/SliceLogin'; // Importa las acciones desde el slice
// import '../../css/Login_and_Register/LoginFormGui.css'

function LoginFormGui() {
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const dispatch = useDispatch();

  // Despacha el username cuando cambia
  useEffect(() => {
    dispatch(setUsername(username));
  }, [username, dispatch]);

  // Despacha el password cuando cambia
  useEffect(() => {
    dispatch(setPassword(password));
  }, [password, dispatch]);

  return (
    <div className='container-login'>
        <div className='div-1'>
          <label htmlFor="username">Gui usuario:</label>
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

export default LoginFormGui;
