// import React, { useEffect, useState } from 'react';
// import { postStaff } from '../../service/LoginGui';
// import { fetchContract } from '../../Redux/Slices/SliceContract';
// import { fetchSchedule } from '../../Redux/Slices/SliceSchedule';
// import { setID } from '../../Redux/Slices/SliceInstitution';
// import { useDispatch, useSelector } from 'react-redux';
// import '../../css/create_staff.css';
// import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";
// const domain = window.location.hostname;

// function CreateStaff() {
//   // Estados para los campos del formulario
//   const [changeNombre, setChangeNombre] = useState('');
//   const [changeApellidos, setChangeApellidos] = useState('');
//   const [changeIdentificacion, setChangeIdentificacion] = useState('');
//   const [changeFechaNacimiento, setChangeFechaNacimiento] = useState('');
//   const [changeDireccion, setChangeDireccion] = useState('');
//   const [changeTelefono, setChangeTelefono] = useState('');
//   const [changeEstadoTrabajador, setChangeEstadoTrabajador] = useState('');
//   const [changeCorreo, setChangeCorreo] = useState('');
//   const [changePuesto, setChangePuesto] = useState('');
//   const [changeImagen, setChangeImagen] = useState(null);
//   const [changeContratoId, setChangeContratoId] = useState('');
//   const [changeHorarioId, setChangeHorarioId] = useState('');
//   const [changePassword, setChangePassword] = useState('');
//   const [formMessage, setFormMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const [institution_id, setInstitutionId] = useState(null); 

//   const [isAuthorized, setIsAuthorized] = useState(false);


//   const itemsContracts = useSelector(state => state.contract.items); 
//   const itemsSchedule = useSelector(state => state.schedule.items);  
//   const dispatch = useDispatch();
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setChangeImagen(file);
//     }
//   };
  
//   useEffect(() => {
//      // Extraer el token desde la cookie
//      const token = Cookies.get('AuthCookie');

//      if (token) {
//        try {
//          // Desencriptar el token
//          const decodedToken = jwtDecode(token);
//          const institutionIdFromToken = decodedToken.ID; 
         
//          setInstitutionId(institutionIdFromToken);
//        } catch (error) {
//          console.error('Error al decodificar el token', error);
//        }
//      }
//     dispatch(fetchContract());
//     dispatch(fetchSchedule());
//     dispatch(setID(Number(institution_id)));
//   }, [dispatch]);

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
//     const newErrors = {};

//     if (!changeNombre) newErrors.nombre = "El nombre es obligatorio.";
//     if (!changeApellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
//     if (!changeIdentificacion) newErrors.identificacion = "El número de identificación es obligatorio.";
//     if (!changeFechaNacimiento || !dateRegex.test(changeFechaNacimiento)) {
//       newErrors.fechaNacimiento = "Por favor, ingrese una fecha válida (formato: AAAA-MM-DD).";
//     }
//     if (!changeDireccion) newErrors.direccion = "La dirección es obligatoria.";
//     if (!changeTelefono) newErrors.telefono = "El teléfono es obligatorio.";
//     if (!changeCorreo || !emailRegex.test(changeCorreo)) {
//       newErrors.correo = "Por favor, ingrese un correo electrónico válido.";
//     }
//     if (!changeEstadoTrabajador) newErrors.estadoTrabajador = "Seleccione el estado del trabajador.";
//     if (!changePuesto) newErrors.puesto = "Seleccione un puesto.";
//     if (!changeImagen) newErrors.imagen = "Debe seleccionar una imagen.";
//     if (!changePassword) newErrors.password = "La contraseña es obligatoria.";
//     if (!changeContratoId) newErrors.contrato = "Debe seleccionar un contrato.";
//     if (!changeHorarioId) newErrors.horario = "Debe seleccionar un horario.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("image", changeImagen);

//       const response = await fetch(`http://${domain}:8000/api/urlResponse/`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       const imageUrl = data.image_url;

//       const staff = {
//         username: changeNombre,
//         last_name: changeApellidos,
//         identification_number: changeIdentificacion,
//         birthdate_date: changeFechaNacimiento,
//         direction: changeDireccion,
//         phone_number: changeTelefono,
//         email: changeCorreo,
//         employment_status: changeEstadoTrabajador,
//         position: changePuesto,
//         imagen_url: imageUrl,
//         contract: changeContratoId,
//         institution: institution_id,
//         schedule: changeHorarioId,
//         password: changePassword,
//         authorization: isAuthorized // Añadir el estado de autorización
//       };
      
//       await postStaff(staff); // Envia los datos
//       setFormMessage("Personal creado exitosamente"); // Mostrar mensaje de éxito
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//       // toast.error("Error.");
//     }
//   };

//   return (
//     <div className='div-core'>
//       <form className='form-staff' onSubmit={handleSubmit}>
//         <label>
//           Nombre:
//           <input type="text" value={changeNombre} onChange={(e) => setChangeNombre(e.target.value)} />
//           {errors.nombre && <p className="error">{errors.nombre}</p>}
//         </label>
//         <br />
//         <label>
//           Apellidos:
//           <input type="text" value={changeApellidos} onChange={(e) => setChangeApellidos(e.target.value)} />
//           {errors.apellidos && <p className="error">{errors.apellidos}</p>}
//         </label>
//         <br />
//         <label>
//           Número de Identificación:
//           <input type="text" value={changeIdentificacion} onChange={(e) => setChangeIdentificacion(e.target.value)} />
//           {errors.identificacion && <p className="error">{errors.identificacion}</p>}
//         </label>
//         <br />
//         <label>
//           Fecha de Nacimiento:
//           <input type="date" value={changeFechaNacimiento} onChange={(e) => setChangeFechaNacimiento(e.target.value)} />
//           {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento}</p>}
//         </label>
//         <br />
//         <label>
//           Dirección:
//           <input type="text" value={changeDireccion} onChange={(e) => setChangeDireccion(e.target.value)} />
//           {errors.direccion && <p className="error">{errors.direccion}</p>}
//         </label>
//         <br />
//         <label>
//           Teléfono:
//           <input type="number" value={changeTelefono} onChange={(e) => setChangeTelefono(e.target.value)} />
//           {errors.telefono && <p className="error">{errors.telefono}</p>}
//         </label>
//         <br />
//         <label>
//           Correo:
//           <input type="email" value={changeCorreo} onChange={(e) => setChangeCorreo(e.target.value)} />
//           {errors.correo && <p className="error">{errors.correo}</p>}
//         </label>
//         <br />
//         <label>
//           Estado del trabajador:
//           <select value={changeEstadoTrabajador} onChange={(e) => setChangeEstadoTrabajador(e.target.value)}>
//             <option value="">--Selecciona un estado--</option>
//             <option value="Active">Activo</option>
//             <option value="Inactive">Inactivo</option>
//           </select>
//           {errors.estadoTrabajador && <p className="error">{errors.estadoTrabajador}</p>}
//         </label>
//         <br />
//         <label>
//           Seleccione un Puesto:
//           <select value={changePuesto} onChange={(e) => setChangePuesto(e.target.value)}>
//           <option >--Selecciona un puesto--</option>
//           <option value="Directors" >Director</option>
//           <option value="Teacher" >Profesor</option>
//           <option value="Secretaries" >Secretaria</option>
//           <option value="Educational counselors" >Consejeras educativas</option>
//           <option value="Cleaning staff" >Personal de limpieza</option>
//           <option value="Librarians" >Bibliotecarios</option>
//           <option value="Security staff" >Personal de seguridad</option>
//             {/* Otras opciones */}
//           </select>
//           {errors.puesto && <p className="error">{errors.puesto}</p>}
//         </label>
//         <br />
//         <label>
//           Imagen del empleado:
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//           {errors.imagen && <p className="error">{errors.imagen}</p>}
//         </label>
//         <br />
//         <label>
//           Contraseña:
//           <input type="password" value={changePassword} onChange={(e) => setChangePassword(e.target.value)} />
//           {errors.password && <p className="error">{errors.password}</p>}
//         </label>
//         <br />
//         <label>
//           Seleccione su contrato:
//           {itemsContracts && (
//             <select value={changeContratoId} onChange={(e) => setChangeContratoId(e.target.value)}>
//               <option value="">--Seleccionar--</option>
//               {itemsContracts.map((contract) => (
//                 <option key={contract.id} value={contract.id}>
//                   {contract.contract_type}
//                 </option>
//               ))}
//             </select>
//           )}
//           {errors.contrato && <p className="error">{errors.contrato}</p>}
//         </label>
//         <br />
//         <label>
//           Seleccione el horario:
//           {itemsSchedule && (
//             <select value={changeHorarioId} onChange={(e) => setChangeHorarioId(e.target.value)}>
//               <option value="">--Seleccionar--</option>
//               {itemsSchedule.map((horario) => (
//                 <option key={horario.id} value={horario.id}>
//                   {horario.days}
//                 </option>
//               ))}
//             </select>
//           )}
//           {errors.horario && <p className="error">{errors.horario}</p>}
//           {formMessage && <p>{formMessage}</p>}
//         </label>
//         {/* Checkbox de autorización */}
//         <label>
//           Autorización:
//           <input
//             type="checkbox"
//             checked={isAuthorized}
//             onChange={(e) => setIsAuthorized(e.target.checked)} // Actualizar el estado al cambiar
//           />
//         </label>
//         <br />

//         <button type="submit">ENVIAR</button>
//       </form>
//     </div>
//   );
// }

// export default CreateStaff;


import React, { useEffect, useState } from 'react';
import { postStaff } from '../../service/LoginGui';
import { fetchContract } from '../../Redux/Slices/SliceContract';
import { fetchSchedule } from '../../Redux/Slices/SliceSchedule';
import { setID } from '../../Redux/Slices/SliceInstitution';
import { useDispatch, useSelector } from 'react-redux';
// import '../../css/create_staff.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
const domain = window.location.hostname;
 

function CreateStaff() {
  // Estados para los campos del formulario
  const [changeNombre, setChangeNombre] = useState('');
  const [changeApellidos, setChangeApellidos] = useState('');
  const [changeIdentificacion, setChangeIdentificacion] = useState('');
  const [changeFechaNacimiento, setChangeFechaNacimiento] = useState('');
  const [changeDireccion, setChangeDireccion] = useState('');
  const [changeTelefono, setChangeTelefono] = useState('');
  const [changeEstadoTrabajador, setChangeEstadoTrabajador] = useState('');
  const [changeCorreo, setChangeCorreo] = useState('');
  const [changePuesto, setChangePuesto] = useState('');
  const [changeImagen, setChangeImagen] = useState(null);
  const [changeContratoId, setChangeContratoId] = useState('');
  const [changeHorarioId, setChangeHorarioId] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [institution_id, setInstitutionId] = useState(null); 
  const [isAuthorized, setIsAuthorized] = useState(false);

  const itemsContracts = useSelector(state => state.contract.items); 
  const itemsSchedule = useSelector(state => state.schedule.items);  
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChangeImagen(file);
    }
  };
  
  useEffect(() => {
     // Extraer el token desde la cookie
     const token = Cookies.get('AuthCookie');

     if (token) {
       try {
         // Desencriptar el token
         const decodedToken = jwtDecode(token);
         const institutionIdFromToken = decodedToken.info.institution; 
         
         setInstitutionId(institutionIdFromToken);
       } catch (error) {
         console.error('Error al decodificar el token', error);
       }
     }
    dispatch(fetchContract());
    dispatch(fetchSchedule());
    dispatch(setID(Number(institution_id)));
  }, [dispatch]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const newErrors = {};

    if (!changeNombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!changeApellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
    if (!changeIdentificacion) newErrors.identificacion = "El número de identificación es obligatorio.";
    if (!changeFechaNacimiento || !dateRegex.test(changeFechaNacimiento)) {
      newErrors.fechaNacimiento = "Por favor, ingrese una fecha válida (formato: AAAA-MM-DD).";
    }
    if (!changeDireccion) newErrors.direccion = "La dirección es obligatoria.";
    if (!changeTelefono) newErrors.telefono = "El teléfono es obligatorio.";
    if (!changeCorreo || !emailRegex.test(changeCorreo)) {
      newErrors.correo = "Por favor, ingrese un correo electrónico válido.";
    }
    if (!changeEstadoTrabajador) newErrors.estadoTrabajador = "Seleccione el estado del trabajador.";
    if (!changePuesto) newErrors.puesto = "Seleccione un puesto.";
    if (!changeImagen) newErrors.imagen = "Debe seleccionar una imagen.";
    if (!changePassword) newErrors.password = "La contraseña es obligatoria.";
    if (!changeContratoId) newErrors.contrato = "Debe seleccionar un contrato.";
    if (!changeHorarioId) newErrors.horario = "Debe seleccionar un horario.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", changeImagen);

      const response = await fetch(`http://${domain}:8000/api/urlResponse/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.image_url;

      const staff = {
        username: changeNombre,
        last_name: changeApellidos,
        identification_number: changeIdentificacion,
        birthdate_date: changeFechaNacimiento,
        direction: changeDireccion,
        phone_number: changeTelefono,
        email: changeCorreo,
        employment_status: changeEstadoTrabajador,
        position: changePuesto,
        imagen_url: imageUrl,
        contract: changeContratoId,
        institution: institution_id,
        schedule: changeHorarioId,
        password: changePassword,
        authorization: isAuthorized // Añadir el estado de autorización
      };
      
      await postStaff(staff); // Envia los datos
      setFormMessage("Personal creado exitosamente"); // Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className='container-create-staff'>
      <form className='form-staff' onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={changeNombre} onChange={(e) => setChangeNombre(e.target.value)} />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </label>
        <br />
        <label>
          Apellidos:
          <input type="text" value={changeApellidos} onChange={(e) => setChangeApellidos(e.target.value)} />
          {errors.apellidos && <p className="error">{errors.apellidos}</p>}
        </label>
        <br />
        <label>
          Número de Identificación:
          <input type="text" value={changeIdentificacion} onChange={(e) => setChangeIdentificacion(e.target.value)} />
          {errors.identificacion && <p className="error">{errors.identificacion}</p>}
        </label>
        <br />
        <label>
          Fecha de Nacimiento:
          <input type="date" value={changeFechaNacimiento} onChange={(e) => setChangeFechaNacimiento(e.target.value)} />
          {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento}</p>}
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" value={changeDireccion} onChange={(e) => setChangeDireccion(e.target.value)} />
          {errors.direccion && <p className="error">{errors.direccion}</p>}
        </label>
        <br />
        <label>
          Teléfono:
          <input type="number" value={changeTelefono} onChange={(e) => setChangeTelefono(e.target.value)} />
          {errors.telefono && <p className="error">{errors.telefono}</p>}
        </label>
        <br />
        <label>
          Correo:
          <input type="email" value={changeCorreo} onChange={(e) => setChangeCorreo(e.target.value)} />
          {errors.correo && <p className="error">{errors.correo}</p>}
        </label>
        <br />
        <label>
          Estado del trabajador:
          <select value={changeEstadoTrabajador} onChange={(e) => setChangeEstadoTrabajador(e.target.value)}>
            <option value="">--Selecciona un estado--</option>
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>
          </select>
          {errors.estadoTrabajador && <p className="error">{errors.estadoTrabajador}</p>}
        </label>
        <br />
        <label>
          Seleccione un Puesto:
          <select value={changePuesto} onChange={(e) => setChangePuesto(e.target.value)}>
          <option >--Selecciona un puesto--</option>
          <option value="Directors" >Director</option>
          <option value="Teacher" >Profesor</option>
          <option value="Secretaries" >Secretaria</option>
          <option value="Educational counselors" >Consejeras educativas</option>
          <option value="Cleaning staff" >Personal de limpieza</option>
          <option value="Librarians" >Bibliotecarios</option>
          <option value="Security staff" >Personal de seguridad</option>
            {/* Otras opciones */}
          </select>
          {errors.puesto && <p className="error">{errors.puesto}</p>}
        </label>
        <br />
        <label>
          Imagen del empleado:
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {errors.imagen && <p className="error">{errors.imagen}</p>}
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={changePassword} onChange={(e) => setChangePassword(e.target.value)} />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <br />
        <label>
          Seleccione su contrato:
          {itemsContracts && (
            <select value={changeContratoId} onChange={(e) => setChangeContratoId(e.target.value)}>
              <option value="">--Seleccionar--</option>
              {itemsContracts.map((contract) => (
                <option key={contract.id} value={contract.id}>
                  {contract.contract_type}
                </option>
              ))}
            </select>
          )}
          {errors.contrato && <p className="error">{errors.contrato}</p>}
        </label>
        <br />
        <label>
          Seleccione el horario:
          {itemsSchedule && (
            <select value={changeHorarioId} onChange={(e) => setChangeHorarioId(e.target.value)}>
              <option value="">--Seleccionar--</option>
              {itemsSchedule.map((horario) => (
                <option key={horario.id} value={horario.id}>
                  {horario.days}
                </option>
              ))}
            </select>
          )}
          {errors.horario && <p className="error">{errors.horario}</p>}
          {formMessage && <p>{formMessage}</p>}
        </label>
        {/* Checkbox de autorización */}
        <label>
          Autorización:
          <input
            type="checkbox"
            checked={isAuthorized}
            onChange={(e) => setIsAuthorized(e.target.checked)} // Actualizar el estado al cambiar
          />
        </label>
        <br />

        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
}

export default CreateStaff;
