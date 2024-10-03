import React, { useEffect, useState } from 'react';
import { postStaff, getInstitutions, getContracts, getSubjects } from '../../service/LoginGui';
import '../../css/create_staff.css';
import { clientId } from '../../keys/keys';

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
  const [changeInstitucionId, setChangeInstitucionId] = useState();
  const [changeMateriaId, setChangeMateriaId] = useState();
  const [changeHorarioId, setChangeHorarioId] = useState();

  //Almacena los get de tablas consultadas
  const [contracts, setContracts] = useState();
  const [institutions, setInstitution] = useState();
  const [subjects, setSubjects] = useState();

  //Ocultar id profesor
  const handleChange = (e) => {
    setChangePuesto(e.target.value)
  }

  useEffect(() => {
      getDataSubject();
      getDataInsititution();
      getDataContract();
  },[])

  const getDataInsititution = async () => {
    try {
      const institutionData = await getInstitutions();
      setInstitution(institutionData);
    } catch (error) {
        console.error("Error fetching institution:", error);
    }
  }

  const getDataContract = async () => {
    try {
        const contractsData = await getContracts();
        setContracts(contractsData);
        console.log(contractsData);

    } catch (error) {
        console.error("Error fetching contract:", error);
    }
  }

  const getDataSubject = async () => {
    try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
    } catch (error) {
        console.error("Error fetching subject:", error);
    }
  }

  const handleChangeStatus = (e) => {
    setChangeEstadoTrabajador(e.target.value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!changeImagen) {
      alert("Por favor selecciona una imagen.");
      return;
    }
    
    try {
      // Subir la imagen a Imgur
      const auth = "Client-ID " + clientId;
      const formData = new FormData();
      formData.append("image", changeImagen);

      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      const imageUrl = data.data.link; // URL de la imagen subida
      console.log(data);
    
      // Expresión regular para validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      let confimacion = true
      
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
        imagen_url: imageUrl,
        contract: changeContratoId,
        institution: changeInstitucionId,
        subjects: changeMateriaId,
        schedule: changeHorarioId
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
      console.log(staff);
      
      if (confimacion){
        postStaff(staff); //Envia los datos
      }
    }
    catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }

  return (
    <div className='div-core'>
      <form className='form-staff' action="submit">
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
          <input type="date" placeholder='fecha de nacimiento' onChange={(e) => setChangeFechaNacimiento(e.target.value)}/>
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" placeholder='dirección' onChange={(e) => setChangeDireccion(e.target.value)}/>
        </label>
        <br />
        <label>
          Teléfono:
          <input type="number" placeholder='teléfono' onChange={(e) => setChangeTelefono(e.target.value)}/>
        </label>
        <br />
        <label>
          Correo:
          <input type="email" placeholder='email' onChange={(e) => setChangeCorreo(e.target.value)}/>
        </label>
        <br />
        <label>
          Estado del trabajador:
          <select value={changeEstadoTrabajador} onChange={handleChangeStatus}  id="opciones">
          <option >--Selecciona un puesto--</option>
          <option value="Active" >Activo</option>
          <option value="Inactive" >Inactivo</option>
        </select>
        </label>
        <br />

        <label htmlFor="opciones">Selecciona un Puesto Creado Anteriormente:</label>
        <select value={changePuesto} onChange={handleChange}  id="opciones">
          <option >--Selecciona un puesto--</option>
          <option value="Directors" >Director</option>
          <option value="Teacher" >Profesor</option>
          <option value="Secretaries" >Secretaria</option>
          <option value="Educational counselors" >Consejeras educativas</option>
          <option value="Cleaning staff" >Personal de limpieza</option>
          <option value="Librarians" >Bibliotecarios</option>
          <option value="Security staff" >Personal de seguridad</option>
        </select>
        <br />
        <label>
          Imagen del empleado:
          <input type="file" placeholder='imagen' onChange={(e) => setChangeImagen(e.target.value)}/>
        </label>
        <br />
        <label>

         {contracts && (
            contracts.map((contract, index) => (
              <div key={index}>
                <p>{contract.contract_type}</p>
              </div>
            ))
          )}

          Id contrato:
          <input type="number" placeholder='contrato_id' onChange={(e) => setChangeContratoId(e.target.value)} />
        </label>
        <br />
        <label>
          Id Institucion:
          <input type="number" placeholder='institucion_id' onChange={(e) => setChangeInstitucionId(e.target.value)} />
        </label>
        <br />
        <label>
          Id Horario:
          <input type="number" placeholder='horario_id' onChange={(e) => setChangeHorarioId(e.target.value)} />
        </label>
        <br />

        {changePuesto == "Teacher" ? (
          <label>
            Id Materia:
            <input type="number" placeholder='materia_id' onChange={(e) => setChangeMateriaId(e.target.value)}/>
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