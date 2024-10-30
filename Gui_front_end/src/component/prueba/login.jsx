import React, { useState,useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const domain = window.location.hostname;
import "../../css/login/login.css";
// import '../../css/img/cafe.jfif'

function Login2() {
  // Estado para almacenar el email y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [userData, setUserData] = useState(null); // Estado para almacenar la información del usuario
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Desactiva el clic derecho en toda la página
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Limpia el evento al desmontar el componente
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    try {
      const response = await axios.post(
        `http://${domain}:8000/api/users/login/`,
        {
          email,
          password,
        }
      );

      // Manejo de la respuesta
      setResponseMessage("Inicio Exitoso, por favor espere");
      console.log(response.data);
      Cookies.set(
        "AuthCookie",
        response.data.token,
        { expires: 1 },
        { path: "/" }
      );

      const token = response.data.token;
      const decodedData = jwtDecode(token);
      console.log("Datos decodificados:", decodedData); // Ver los datos decodificado

      if (decodedData.is_teacher == true || decodedData.is_staff == true) {
        setTimeout(() => navigate("/institutions"), 1000);
      } else if (decodedData.is_superuser == true) {
        setTimeout(() => navigate("/gui_home"), 1000);
      } else if (decodedData.is_student == true) {
        setTimeout(() => navigate("/home_padres"), 1000);
      } else {
        console.log("Usuario no existe para esta ruta");
      }
    } catch (error) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado fuera del rango de 2xx
        setResponseMessage("Datos incorrectos o no encontrados");
        
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        setResponseMessage("Error en la conexión.");
      } else {
        // Algo pasó al configurar la solicitud
        setResponseMessage("Error de la app");
      }
    }
  };

  return (
    <div className="container-login-general">
      <div className="container1-login-general">
        {/* <img src="https://i.imgur.com/0glpzb7.jpeg" alt="" /> */}
        <img src="https://i.imgur.com/aEpUhS3.png" alt="" />

      </div>

      <div className="container2-login-general">
        <form onSubmit={handleSubmit}>
          <div className="img-logo-inicio">{responseMessage}</div>
          <div className="container-inputs-general">
          <div className="wave-group">
            <input
              className="input-login-general"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="label-login-general" htmlFor="email">
              <span className="label-char" style={{ "--index": 0 }}>
                E
              </span>
              <span className="label-char" style={{ "--index": 1 }}>
                m
              </span>
              <span className="label-char" style={{ "--index": 2 }}>
                a
              </span>
              <span className="label-char" style={{ "--index": 3 }}>
                i
              </span>
              <span className="label-char" style={{ "--index": 4 }}>
                l
              </span>
            </label>
            <span className="bar"></span>
          </div>
          <div className="wave-group">
            <input
              className="input-login-general"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="label-login-general" htmlFor="password">
              <span className="label-char" style={{ "--index": 0 }}>
                C
              </span>
              <span className="label-char" style={{ "--index": 1 }}>
                o
              </span>
              <span className="label-char" style={{ "--index": 2 }}>
                n
              </span>
              <span className="label-char" style={{ "--index": 3 }}>
                t
              </span>
              <span className="label-char" style={{ "--index": 4 }}>
                r
              </span>
              <span className="label-char" style={{ "--index": 5 }}>
                a
              </span>
              <span className="label-char" style={{ "--index": 6 }}>
                s
              </span>
              <span className="label-char" style={{ "--index": 7 }}>
                e
              </span>
              <span className="label-char" style={{ "--index": 8 }}>
                ñ
              </span>
              <span className="label-char" style={{ "--index": 9 }}>
                a
              </span>
            </label>
            <span className="bar"></span>
          </div>
          </div>
          <div className="container-input-start">
            <button class="animated-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="arr-2"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span class="text">Iniciar</span>
            <span class="circle"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="arr-1"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
          <a href="">Olvidó su contraseña?</a>
          </div>
        </form>
        <div className="container-derechos-general">
          <p className="derechos-general-foot" href="">@ 2024 Linc - Privacy & Terms / Contact support </p>
        </div>
      </div>
    </div>
  );
}

export default Login2;
