import React, { useEffect, useState } from 'react';
import { postStaff } from '../../service/LoginGui';
import '../../css/create_staff.css';
import { clientId } from '../../keys/keys.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import { fetchContract } from '../../Redux/Slices/SliceContract.js';
import { fetchSchedule } from '../../Redux/Slices/SliceSchedule.js';
import { setID } from '../../Redux/Slices/SliceInstitution.js';
import { useDispatch, useSelector } from 'react-redux';

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

  //Estado id
  const [idRedux, setId] = useState();

  //Redux
  const itemsSchedule = useSelector(state => state.schedule.items);  
  const itemsContract = useSelector(state => state.contract.items);
  const StateReduxID = useSelector(state => state.institutions.InstitutionID);  
  const dispatch = useDispatch();  

  useEffect(() => {
    console.log();
  },[]);



  //Almacena los get de tablas consultadas
  const [contracts, setContracts] = useState();
  const [schedule, setSchedule] = useState();
  const institution_id = localStorage.getItem('InstitutionID');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChangeImagen(file);
    }mxm
  };

  useEffect(() => {
    dispatch(fetchContract());
    dispatch(fetchSchedule());
    dispatch(setID(Number(idRedux)));
  }, [dispatch]);

  //Ocultar id profesor
  const handleChangePuesto = (e) => {
    setChangePuesto(e.target.value)
  }

  const handleChangeHorario = (e) => {
    setChangeHorarioId(e.target.value)
  }
  const handleChangeContrato = (e) => {
    setChangeContratoId(e.target.value)
  }

  useEffect(() => {
      setContracts([]);//Setea
      setSchedule([]);
      
      setSchedule(itemsSchedule);
      setContracts(itemsContract);
  },[itemsContract, itemsSchedule])


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
      if (!data.data.link) {
        throw new Error('Error al subir la imagen');
      }
      const imageUrl = data.data.link; // URL de la imagen subida      
    
      // Expresión regular para validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      let confimacion = true

      dispatch(setID(Number(idRedux)));
      setId(idRedux);
      

      
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
        institution: idRedux,
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
    
      if (confimacion && idRedux){

        try {
          console.log(staff);
          
          postStaff(staff);
          toast.success("Personal creado con exito.");
        } catch (error) {
          toast.success("Error al crear usuario: ",error);
        }
        setId('');//Limpia el input
      }
    }
    catch (error) {
      console.error("Error al enviar los datos:", error);
      toast.error("Error.");
    }
  }

  return (
    <div className='div-core'>
      <ToastContainer />
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
        <select value={changePuesto} onChange={handleChangePuesto}  id="opciones">
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
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Cree una contraseña:
          <input type="text" onChange={((e) => setChangePassword(e.target.value))} />
        </label>

        <br />
        
        <label>
          Seleccione su contrato:
        {contracts && (
          <select value={changeContratoId} onChange={handleChangeContrato} id="opciones">
            <option value="">--Seleccionar--</option>
            {contracts.map((contract, index) => (
              <option key={index} value={contract.id}>
                {contract.contract_type}
              </option>
            ))}
          </select>
        )}
        </label>

        <br />

        <label>
          Seleccione el horario:
        {schedule && (
          <select value={changeHorarioId} onChange={handleChangeHorario} id="opciones">
            <option value="">--Seleccionar--</option>
            {schedule.map((horario, index) => (
              <option key={index} value={horario.id}>
                {horario.days}
              </option>
            ))}
          </select>
        )}
        </label>

        <br />

        <p>Id de la institucion</p>
        <input onChange={((e) => setId(e.target.value))} type="text" />

        <br />
        <button onClick={handleSubmit}>ENVIAR</button>
      </form>

    </div>
  );
  
}

export default CreateStaff;