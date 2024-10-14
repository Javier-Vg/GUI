import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../service/LoginGui'; // Importamos la función del servicio
import '../../css/loginGui.css';

function LoginFormGui() {
  const [username, setNombre] = useState('');
  const [password, setContra] = useState('');
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.trim() !== '' && password.trim() !== '') {
        try {
            const response = await loginAdmin(username, password);
            console.log(response,"hola");
            


            if (response.success) {
                navigate('/gui_home'); // Redirige si las credenciales son correctas
                sessionStorage.setItem('token', response.token);
            } else {
                setTexto(response.message || "Usuario o contraseña incorrectos");
                console.log(response);
                
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error.message);
            setTexto(error.message || "Ocurrió un error, intenta nuevamente.");
        }
    } else {
        setTexto("Por favor, complete todos los campos");
    }
};
  return (
    <div className="login-body">
      <div className="login-container">
        <div className="container-letters-login">
          <h4 className="login-title">INICIAR SESIÓN</h4>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="nombre" className="login-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="login-input"
            value={username}
            onChange={(e) => setNombre(e.target.value)}
          />
          
          <label htmlFor="contra" className="login-label">Contraseña</label>
          <input
            type="password"
            id="contra"
            name="contra"
            className="login-input"
            value={password}
            onChange={(e) => setContra(e.target.value)}
          />
          
          <h6 className="login-error-text">{texto}</h6>
          <button type="submit" className="login-button">Iniciar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormGui;
