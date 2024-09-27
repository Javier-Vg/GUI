import React, { useEffect, useState } from 'react';
import { postStaff } from '../../service/LoginGui';

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
  const [changeSalarioMensual, setChangeSalarioMensual] = useState();
  const [changeImagen, setChangeImagen] = useState();
  const [changeContratoId, setChangeContratoId] = useState();
  const [changeInstitucionId, setChangeInstitucionId] = useState();
  const [changeMateriaId, setChangeMateriaId] = useState();

  //Ocultar id profesor
  const handleChange = (e) => {
    setChangePuesto(e.target.value)
  }
  
  const handleSubmit = () => {
    let staff = {
      name: changeNombre,
      last_name: changeApellidos,
      identification_number: changeIdentificacion,
      birthdate_date: changeFechaNacimiento,
      direction: changeDireccion,
      phone_number: changeTelefono,
      email: changeCorreo,
      employment_status: changeEstadoTrabajador,
      position: changePuesto,
      salary: changeSalarioMensual,
      imagen: changeImagen,
      contract: changeContratoId,
      institution: changeInstitucionId,
      subjects: changeMateriaId
    }
    postStaff(staff); //Envia los datos
  }

  return (
    <div>
      <form action="submit">
        <label>
          Nombre:
          <input type="text" placeholder='nombre' onChange={(e) => setChangeNombre(e.target.value)}/>
        </label>
        <br />
        <label>
          Apellidos:
          <input type="text" placeholder='apellidos' onChange={(e) => setChangeApellidos(e.target.value)}/>
        </label>
        <br />
        <label>
          Número de Identificación:
          <input type="text" placeholder='número de identificación' onChange={(e) => setChangeIdentificacion(e.target.value)}/>
        </label>
        <br />
        <label>
          Fecha de Nacimiento:
          <input type="text" placeholder='fecha de nacimiento' onChange={(e) => setChangeFechaNacimiento(e.target.value)}/>
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" placeholder='dirección' onChange={(e) => setChangeDireccion(e.target.value)}/>
        </label>
        <br />
        <label>
          Teléfono:
          <input type="text" placeholder='teléfono' onChange={(e) => setChangeTelefono(e.target.value)}/>
        </label>
        <br />
        <label>
          Correo:
          <input type="email" placeholder='email' onChange={(e) => setChangeCorreo(e.target.value)}/>
        </label>
        <br />
        <label>
          Estado del trabajador:
          <input type="text" placeholder='email' onChange={(e) => setChangeEstadoTrabajador(e.target.value)}/>
        </label>
        <br />

        <label htmlFor="opciones">Selecciona un Puesto Creado Anteriormente:</label>
        <select value={changePuesto} onChange={handleChange}  id="opciones">
          <option >--Selecciona un puesto--</option>
          <option value="director" >Director</option>
          <option value="profesor" >Profesor</option>
          <option value="secretaria" >Secretaria</option>
          <option value="consejeras edutactivas" >Consejeras educativas</option>
          <option value="personal de limpieza" >Personal de limpieza</option>
          <option value="bibliotecarios" >Bibliotecarios</option>
          <option value="personal de seguridad" >Personal de seguridad</option>
        </select>

        <br />
        <label>
          Salario Mensual:
          <input type="text" placeholder='salario mensual' onChange={(e) => setChangeSalarioMensual(e.target.value)}/>
        </label>
        <br />
        <label>
          Imagen del empleado:
          <input type="file" placeholder='imagen' onChange={(e) => setChangeImagen(e.target.value)}/>
        </label>
        <br />
        <label>
          Id contrato:
          <input type="text" placeholder='contrato_id' onChange={(e) => setChangeContratoId(e.target.value)} />
        </label>
        <br />
        <label>
          Id Institucion:
          <input type="text" placeholder='institucion_id' onChange={(e) => setChangeInstitucionId(e.target.value)} />
        </label>
        <br />

        {changePuesto == "profesor" ? (
          <label>
            Id Materia:
            <input type="text" placeholder='materia_id' onChange={(e) => setChangeMateriaId(e.target.value)}/>
          </label>
        ) : (
          <p style={{ display: "none" }}>oculto</p>
        )}
        <br />
        <button onClick={handleSubmit}>ENVIAR</button>
      </form>
    </div>
  );
  
}

export default CreateStaff;
