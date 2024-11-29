import React, { useState } from "react";
import { PostData, getDatos } from "../../service/LoginGui";
import '../../css/Gui/RegisterFormGui.css'

function RegisterFormGui() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [texto, setTexto] = useState("");
  // const [token, setToken] = useState('');

  const cargarDatos = async () => {
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      contra.trim() === "" ||
      rol.trim() === ""
    ) {
      setTexto("Por favor llene todos los campos");
      return;
    }

    try {
      const datos = await getDatos(); // Obtén los datos existentes
      const usuarioExistente = datos.some((elem) => elem.email === email);

      if (usuarioExistente) {
        setTexto("Este correo ya está registrado");
      } else {
        const response = await PostData(nombre, contra, email, rol); // Enviar los datos en un objeto

        if (response.success) {
          setTexto("Registro exitoso!");
        } else {
          setTexto("Registro exitoso!");
          setNombre("")
          setRol("")
          setEmail("")
          setContra("")
          setTimeout(() => {
            setTexto(""); // Limpia el texto después de 2 segundos
          }, 2000);
          // setTexto(
          //   "Error en el registro: " +
          //     (response.error || "Ocurrió un error inesperado")
          // );
        }
      }
    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      setTexto("Error al procesar la solicitud");
    }
  };

  return (
    <>
      <div className="container-createGui">
        <h4 className="title-createGui">Register User Gui</h4>
        <div className="input-group-createGui">
          <label htmlFor="nombre" className="label-createGui">
            Nombre:
          </label>
          <input
            autoComplete="off"
            type="text"
            id="nombre"
            name="nombre"
            className="input-createGui"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="input-group-createGui">
          <label htmlFor="email" className="label-createGui">
            Correo:
          </label>
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            className="input-createGui"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group-createGui">
          <label htmlFor="contra" className="label-createGui">
            Contraseña:
          </label>
          <input
            autoComplete="off"
            type="password"
            id="contra"
            name="contra"
            className="input-createGui"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            pattern="\w{3,8}"
            title="La contraseña debe tener entre 3 y 8 caracteres alfanuméricos"
            required
          />
        </div>
        <div className="input-group-createGui">
          <label htmlFor="rol" className="label-createGui">
            Rol:
          </label>
          <input
            autoComplete="off"
            type="text"
            id="rol"
            name="rol"
            className="input-createGui"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
        </div>
        <h6 className="message-createGui">{texto}</h6>{" "}
        {/* Mostrar mensaje aquí */}
        <div className="button-group-createGui">
          <button className="button-createGui" onClick={cargarDatos}>
            Registrar
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterFormGui;
