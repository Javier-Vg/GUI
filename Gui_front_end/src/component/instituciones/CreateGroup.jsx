import React, { useEffect, useState } from "react";
import { postGroups, getInstitutions, getSubjects, getStaff, getSchedule,} from "../../service/LoginGui";
import "../../css/create_group.css";
import MiComponente from "./jijijaja";

function CreateGroup() {
  //Alamacena las respuestas del api
  const [institutions, setInstitution] = useState();
  const [subjects, setSubjects] = useState();
  const [staff, setStaff] = useState();

  //Alamacena los inputs
  const [Name, setName] = useState();
  const [educationLevel, setEducationLevel] = useState();
  const [capacity, setCapacity] = useState();
  const [classroom, setClassroom] = useState();
  const [institutionsId, setInstitutionId] = useState();

  //Modal
  const [modal, setModal] = useState(false);

  //Almacena los datos del api segun el id de institucion
  const [subjectsFiltred, setSubjectsFiltred] = useState("");
  const [teachersFiltred, setTeachersFiltred] = useState("");

  //Almacena a las materias que fueron seleccionadas.
  const [objctChosen, setObjctChosen] = useState([]);

  //Crea el objeto con la vinculacion de docente y asignaturas:
  const [objctFinish, setObjctFinish] = useState([]);

  useEffect(() => {
    getDataInsititution();
    getDataStaff();
    getDataSubjects();
  }, []);

  const handleChangeInstitucion = (e) => {
    const idChoose = e.target.value;
    setInstitutionId(e.target.value);
    setModal(true);

    //Condicion para luego mostrar las materia y profesores segun el id de institucions
    subjects.forEach((i) => {
      if (idChoose == i.institution) {
        setSubjectsFiltred((prevSubjectsFiltred) => [...prevSubjectsFiltred,i,]);
      }
    });

    staff.forEach((i) => {
      if (i.position == "Teacher" && idChoose == i.institution) { //MOSTRAR MENSAJE EN CASO DE QUE NO EXISTA PROFESOR DE ESA INSTITUCION. 
        setTeachersFiltred((prevTeachersFiltred) => [...prevTeachersFiltred,i,]);
      }
    });
  };

  const changeCommunication_of_subjects_and_teacher = (e) => {
    setObjctChosen([...objctChosen, e.target.value]);
  };


  const Post = () => {
    
   const group = {
    group_name: Name,
    educational_level: educationLevel,
    capacity: capacity,
    classroom: classroom,
    institution: institutionsId,
    communication_of_subjects_and_teacher: objctFinish,
    current_students: 0
   }

   postGroups(group); //Realiza el post.
  };

  const getDataInsititution = async () => {
    try {
      const institutionData = await getInstitutions();
      setInstitution(institutionData);
    } catch (error) {
      console.error("Error fetching institution:", error);
    }
  };

  const getDataSubjects = async () => {
    try {
      const subjectsData = await getSubjects();
      console.log(subjectsData);

      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error fetching institution:", error);
    }
  };

  const getDataStaff = async () => {
    try {
      const staffData = await getStaff();
      setStaff(staffData);
    } catch (error) {
      console.error("Error fetching institution:", error);
    }
  };

  const closeModal = () => {
    setModal(false);
    setSubjectsFiltred(""); //Setea cada que cierre el modal
    setTeachersFiltred("");
    setObjctChosen([]);
    setObjctFinish([]);
  };

  //empieza a crear el objeto final del objeto
  const asingTeachers = () => {
    console.log(objctChosen);

    objctChosen.forEach((i) => {
      // Usar la versión anterior del estado con el callback
      setObjctFinish((prevState) => ({
        ...prevState, // Mantener el estado previo
        [i]: "", // Agregar o modificar la nueva clave y valor
      }));
    });

    // El segundo `console.log` probablemente no mostrará el estado actualizado
    // correctamente porque `setObjctFinish` es asincrónico.
  };

  // Manejar cambios en los selects
  const handleSelectChange = (e, materiaKey) => {
    const value = e.target.value;

    // Actualiza el objeto en el estado con la clave y valor correspondiente
    setObjctFinish((prevState) => ({
      ...prevState, // Mantén el estado previo
      [materiaKey]: value, // Actualiza el valor de la clave correspondiente
    }));
  };

  return (
    <div className="div-core">
      <h2>Creacion de grupos</h2>
      <br />
      <form action="" className="form1">
        <label>
          Nombre del grupo:
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </label>
        <br />
        <label>
          Nivel de educacion:
          <input
            required
            onChange={(e) => setEducationLevel(e.target.value)}
            type="text"
          />
        </label>
        <br />
        <label>
          Capacidad maxima:
          <input
            required
            onChange={(e) => setCapacity(e.target.value)}
            type="number"
          />
        </label>
        <br />
        <label>
          Numero de aula:
          <input
            required
            onChange={(e) => setClassroom(e.target.value)}
            type="number"
          />
        </label>
        <br />

        <label>
          Seleccione la institucion:
          {institutions && (
            <select
              value={institutionsId}
              onChange={handleChangeInstitucion}
              id="opciones"
            >
              <option value="">--Seleccionar--</option>
              {institutions.map((instucion, index) => (
                <option key={index} value={instucion.id}>
                  {instucion.name}
                </option>
              ))}
            </select>
          )}
        </label>

        <br />

        {/* Muestra las materias y profesores disponibles para asignar al grupo */}
        {modal && (
          <dialog open className="modal1">
            <button className= "boton1" onClick={() => closeModal()}>
              ❌
            </button>
            <div className="div-1">
              <div>

                {/* Mensaje si no se ha seleccionado ninguna materia válida */}
                {objctChosen.length > 0 ? null : (
                  <p style={{ color: "red" }}>
                    Por favor seleccione una materia.
                  </p>
                )}

                {subjectsFiltred && subjectsFiltred.length > 0 ? (
                  <>
                    {subjectsFiltred.map((materia, index) => (
                      <div className="div-radios" key={index}>
                        <input
                          type="radio"
                          // id={`materia-${materia.id}`}
                          value={materia.name}
                          onChange={changeCommunication_of_subjects_and_teacher}
                        />
                        <label htmlFor={`materia-${materia.id}`}>
                          {materia.name}
                        </label>
                      </div>
                    ))}
                    <br />
                    <br />

                    <a onClick={() => asingTeachers()} className="a-asign">
                      Asignar docentes
                    </a>

                    
                  </>
                ) : (
                  <p>No hay materias disponibles para esta institución.</p>
                )}
              </div>

              {objctFinish.length != [] && (
                <div>
                <p>Asignacion de materias a docentes</p>
                    {/* Mapeo de lista para generar los selects */}
                    {Object.keys(objctFinish).map((materiaKey, index) => (
                      <div key={index}>
                        <label>{materiaKey}</label>
                        <select
                          value={objctFinish[materiaKey]} // Valor actual del select
                          onChange={(e) => handleSelectChange(e, materiaKey)} // Maneja el cambio
                        >
                          <option value="">-Seleccione docente-</option>
                          {teachersFiltred.map((teacher) => (
                            <option key={teacher.id} value={teacher.name}>
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <br />
                    <button onClick={() => Post()} className="btn-save">Guardar Grupo</button>
              </div>
              )}
              
            </div>

          </dialog>
        )}
        <br />
      </form>
      <br />
      <br />
      <br />
      {/* <MiComponente/> */}
    </div>
  );
}

export default CreateGroup;
