import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../service/LoginGui'; // Importamos la función del servicio
import '../../css/loginGui.css';

function LoginFormGui() {
  const [nombre, setNombre] = useState('');
  const [contra, setContra] = useState('');
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  // Validación del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Verifica que los campos no estén vacíos
    if (nombre.trim() !== '' && contra.trim() !== '') {
      try {
        // Llama al backend para autenticar
        const response = await loginAdmin(nombre, contra);
        
        // Si el login es exitoso, redirige
        if (response.success) {
          navigate('/gui_home'); // Redirige a la página principal
        } else {
          setTexto("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        setTexto("Ocurrió un error, intenta nuevamente.");
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          
          <label htmlFor="contra" className="login-label">Contraseña</label>
          <input
            type="password"
            id="contra"
            name="contra"
            className="login-input"
            value={contra}
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
