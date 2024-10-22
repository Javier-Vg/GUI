// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { loginAdmin } from '../../service/LoginGui'; // Importamos la función del servicio
// import '../../css/loginGui.css';

// function LoginFormGui() {
//   const [username, setNombre] = useState('');
//   const [password, setContra] = useState('');
//   const [texto, setTexto] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (username.trim() !== '' && password.trim() !== '') {
//         try {
//             const response = await loginAdmin(username, password);
//             console.log(response,"hola");
            


//             if (response.success) {
//                 navigate('/gui_home'); // Redirige si las credenciales son correctas
//                 sessionStorage.setItem('token', response.token);
//             } else {
//                 setTexto(response.message || "Usuario o contraseña incorrectos");
//                 console.log(response);
                
//             }
//         } catch (error) {
//             console.error("Error al intentar iniciar sesión:", error.message);
//             setTexto(error.message || "Ocurrió un error, intenta nuevamente.");
//         }
//     } else {
//         setTexto("Por favor, complete todos los campos");
//     }
// };
//   return (
//     <div className="login-body">
//       <div className="login-container">
//         <div className="container-letters-login">
//           <h4 className="login-title">INICIAR SESIÓN</h4>
//         </div>
        
//         <form className="login-form" onSubmit={handleLogin}>
//           <label htmlFor="nombre" className="login-label">Nombre</label>
//           <input
//             type="text"
//             id="nombre"
//             name="nombre"
//             className="login-input"
//             value={username}
//             onChange={(e) => setNombre(e.target.value)}
//           />
          
//           <label htmlFor="contra" className="login-label">Contraseña</label>
//           <input
//             type="password"
//             id="contra"
//             name="contra"
//             className="login-input"
//             value={password}
//             onChange={(e) => setContra(e.target.value)}
//           />
          
//           <h6 className="login-error-text">{texto}</h6>
//           <button type="submit" className="login-button">Iniciar</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginFormGui;
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../../Redux/Slices/SliceLogin'; // Importa las acciones desde el slice

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
