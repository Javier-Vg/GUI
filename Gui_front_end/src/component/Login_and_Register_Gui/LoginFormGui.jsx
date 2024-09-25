import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getDatos } from '../../service/LoginGui';
import '../../css/loginGui.css'

function LoginFormGui() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contra, setContra] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  // Hook para obtener datos de la API cuando el componente se monta
  useEffect(() => {
    getDatos(); // Llama a la API cuando el componente se renderiza
  }, []);

  // Validación del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Verifica que los campos no estén vacíos
    if (nombre.trim() !== '' && email.trim() !== '' && contra.trim() !== '') {
      try {
        let users = await getDatos(); // Llama a la API para obtener los usuarios

        // Recorre los usuarios para verificar si coincide con las credenciales
        users.forEach((user) => {
          if (user.nombre === nombre && user.email === email && user.password === contra) {
            setUserFound(true); // Si coincide, cambia el estado de `userFound`
            console.log("todo bien");
            
          }
        });

        // Si no se encuentra ningún usuario coincidente, muestra un mensaje de error
        if (!userFound) {
          setTexto("Usuario, email o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setTexto("Ocurrió un error, intenta nuevamente.");
      }
    } else {
      setTexto("Por favor, complete todos los campos");
    }
  };

  // Hook para redirigir al usuario si se encuentra una coincidencia
  useEffect(() => {
    if (userFound) {
      navigate('/Gui'); // Redirige a la página de inicio si el usuario es válido
    }
  }, [userFound, navigate]);

  return (
    <div className="body">
      <div className="container-Principal">
        <h4>LOGIN</h4>
        <form onSubmit={handleLogin}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="contra">Contraseña</label>
          <input
            type="password"
            id="contra"
            name="contra"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
          />
          <h6>{texto}</h6>
          <button type="submit">Iniciar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormGui;
