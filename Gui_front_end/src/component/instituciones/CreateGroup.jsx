import React, { useEffect, useState } from "react";
import { postGroups } from "../../service/LoginGui";
import "../../css/Institutions/createGroup.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects } from '../../Redux/Slices/SliceSubjects';
import { fetchInstitution } from '../../Redux/Slices/SliceInstitution';
import { fetchStaff } from '../../Redux/Slices/SliceStaff';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
function CreateGroup() {
  
  //Redux
  const itemsInstitution = useSelector(state => state.institutions.items);  
  const itemsSubjects = useSelector(state => state.subject.items);
  const itemsStaff = useSelector(state => state.staff.items);  

  const [educationLevel, setEducationLevel] = useState();
  const [capacity, setCapacity] = useState();
  const [classroom, setClassroom] = useState();

  const [subjectsFiltred, setSubjectsFiltred] = useState("");
  const [teachersFiltred, setTeachersFiltred] = useState("");
  const [objctChosen, setObjctChosen] = useState([]);

  const [Name, setName] = useState();
  const [objectStudentsSubjects, setObjectStudentsSubjects] = useState([]);
  const dispatch = useDispatch();
  const [institution_id, setInstitutionId] = useState(null); // Almacena el ID de la institución
  useEffect(() => {
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
        
    dispatch(fetchSubjects());
    dispatch(fetchInstitution());
    dispatch(fetchStaff());

  }, [dispatch]);
  useEffect(() => {

    // Limpiar los estados al entrar al componente.
    setSubjectsFiltred([]);
    setTeachersFiltred([]);

    //Condicion para luego mostrar las materia y profesores segun el id de institucions
    itemsSubjects.forEach((i) => {
      if (institution_id == i.institution) {
        setSubjectsFiltred((prevSubjectsFiltred) => [...prevSubjectsFiltred,i,]);
      }
    });

    //Filtra los estudiantes:
    itemsStaff.forEach((i) => {
      if (i.position == "Teacher" && institution_id == i.institution) { //MOSTRAR MENSAJE EN CASO DE QUE NO EXISTA PROFESOR DE ESA INSTITUCION. 
        setTeachersFiltred((prevTeachersFiltred) => [...prevTeachersFiltred,i,]);
      }
    }); 
  }, [itemsInstitution, itemsStaff, itemsSubjects]);
  
  const changeCommunication_of_subjects_and_teacher = (e) => {
    setObjctChosen([...objctChosen, e.target.value]);
  };
 
 
const Post = () => {
  const group = {
    group_name: Name,
    educational_level: educationLevel,
    capacity: capacity,
    classroom: classroom,
    institution: institution_id,
    communication_of_subjects_and_teacher: objectStudentsSubjects,
    current_students: 0
  };

  try {
    postGroups(group);
    toast.success("Grupo creado con exito.");
  } catch (error) {
    toast.success("Error al crear usuario: ",error);
  }
  };

  //empieza a crear el objeto final del objeto
  const asingTeachers = () => {

    objctChosen.forEach((i) => {
      // Usar la versión anterior del estado con el callback
      setObjectStudentsSubjects((prevState) => ({
        ...prevState, // Mantener el estado previo
        [i]: "", // Agregar o modificar la nueva clave y valor
      }));
    });

  };

  // Manejar cambios en los selects
  const handleSelectChange = (e, materiaKey) => {
    const value = e.target.value;

    // Actualiza el objeto en el estado con la clave y valor correspondiente
    setObjectStudentsSubjects((prevState) => ({
      ...prevState, // Mantén el estado previo
      [materiaKey]: value, // Actualiza el valor de la clave correspondiente
    }));
  };

  return (
    
    <div className="container-CreateGroup">
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
            type="text"
          />
        </label>
        <br />

        <div className="div-1">
              <div>
                <br />
               
                <h2>Asignaturas que se impartiran:</h2>

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

              {objectStudentsSubjects.length != [] && (
                <div>
                <p>Asignacion de materias a docentes</p>
                    {/* Mapeo de lista para generar los selects */}
                    {Object.keys(objectStudentsSubjects).map((materiaKey, index) => (
                      <div key={index}>
                        <label>{materiaKey}</label>
                        <select
                          value={objectStudentsSubjects[materiaKey]} // Valor actual del select
                          onChange={(e) => handleSelectChange(e, materiaKey)} // Maneja el cambio
                        >
                          <option value="">-Seleccione docente-</option>
                          {teachersFiltred.map((teacher) => (
                            <option key={teacher.id} value={teacher.name}>
                              {teacher.username}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <br />
                    <form >
                      <button onClick={(()  => Post())} className="btn-save">Guardar Grupo</button>
                    </form>
                </div>
              )}
              
            </div>

      </form>
    </div>
  );
}

export default CreateGroup;