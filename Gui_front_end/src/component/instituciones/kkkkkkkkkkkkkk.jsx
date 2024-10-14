

import React, { useEffect, useState } from 'react';
import { postStaff, getInstitutions, getContracts, getSchedule} from '../../service/LoginGui';
import '../../css/create_staff.css';
import { clientId } from '../../keys/keys.js';
import { setID } from '../../Redux/Slices/SliceInstitution.js';

function CreateStaff() {

  const [changeNombre, setChangeNombre] = useState();
  const [changeApellidos, setChangeApellidos] = useState();
  const [changeIdentificacion, setChangeIdentificacion] = useState();

  const [changeFechaNacimiento, setChangeFechaNacimiento] = useState();
  const [changeDireccion, setChangeDireccion] = useState();
  const [changeTelefono, setChangeTelefono] = useState();

  const [changeCorreo, setChangeCorreo] = useState();
  const [changeEstadoTrabajador, setChangeEstadoTrabajador] = useState();
  const [changePuesto, setChangePuesto] = useState();

  const [changeImagen, setChangeImagen] = useState();
  const [changeContratoId, setChangeContratoId] = useState();
  const [changeHorarioId, setChangeHorarioId] = useState();
  const [changePassword, setChangePassword] = useState();
  const [InstitutionId, setInstitutionId] = useState(1);

  //Almacena los get de tablas consultadas
  const [contracts, setContracts] = useState();
  const [schedule, setSchedule] = useState();
  const institution_id = localStorage.getItem('institution_id');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChangeImagen(file);
    }mxm
  };

  useEffect(() => {
    dispatch(fetchContract());
    dispatch(fetchSchedule());
    dispatch(setID(Number(InstitutionId)));
  }, [dispatch]);


//   const handleChangeStatus = (e) => {
//     setChangeEstadoTrabajador(e.target.value)
//   }
  
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
      if (!data.data.link) {
        throw new Error('Error al subir la imagen');
      }
      const imageUrl = data.data.link; // URL de la imagen subida      
    
      // Expresión regular para validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      let confimacion = true
      
      let staff = {
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
        institution: InstitutionId,
        schedule: changeHorarioId,
        password: changePassword
      }

      //Validaciones
      for (const [key, value] of Object.entries(staff)) {
        
        // Validar el correo electrónico
        if (key == "email"){
          if (!emailRegex.test(changeCorreo)) {
            alert('Por favor, ingrese un correo electrónico válido')
            confimacion = false
          } else {
            console.log("correo validado correctamente");
          }
        }
        // Validar la fecha
        if (key == "birthdate_date"){
          if (!dateRegex.test(changeFechaNacimiento)) {
            alert('Por favor, ingrese una fecha válida')
            confimacion = false
          } else {
            console.log("fecha validado correctamente");
          }
        }
      }
    
      if (confimacion){
        postStaff(staff); //Envia los datos
        dispatch(setID())
      }
    }
    catch (error) {
      console.error("Error al enviar los datos:", error);
      toast.error("Error.");
    }
  };

  return (
    <div className='div-core'>
      <form className='form-staff' action="submit">
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
          Cree una contraseña:
          <input type="password" onChange={((e) => setChangePassword(e.target.value))} />
        </label>
        <br />
        <label>
          Seleccione su contrato:
          {contracts && (
            <select value={changeContratoId} onChange={(e) => setChangeContratoId(e.target.value)}>
              <option value="">--Seleccionar--</option>
              {contracts.map((contract) => (
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
          {schedule && (
            <select value={changeHorarioId} onChange={(e) => setChangeHorarioId(e.target.value)}>
              <option value="">--Seleccionar--</option>
              {schedule.map((horario) => (
                <option key={horario.id} value={horario.id}>
                  {horario.days}
                </option>
              ))}
            </select>
          )}
          {errors.horario && <p className="error">{errors.horario}</p>}
          {formMessage && <p>{formMessage}</p>}
        </label>
        <br />

        <br />
        <button onClick={handleSubmit}>ENVIAR</button>
      </form>

    </div>
  );
}

export default CreateStaff;
