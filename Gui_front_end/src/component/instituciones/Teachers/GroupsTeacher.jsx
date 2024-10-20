import React, { useEffect, useState } from 'react';
import { fetchGroups } from '../../../Redux/Slices/SliceGroup';
import { fetchStaff } from '../../../Redux/Slices/SliceStaff';
import { useDispatch, useSelector } from 'react-redux';
import '../../../css/groups_teacher.css';

function ListGroups() {
    const [groups, setGroups] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedGroup, setSelectedGroups] = useState(null);
    const institution_id = useSelector((state) => state.ids.institutionId); // Obtén el ID de la institución
    const dispatch = useDispatch();

    //Estados de Staff:
    const items= useSelector(state => state.group.items);
    const itemStaff= useSelector(state => state.staff.items);
    const loading = useSelector(state => state.group.loading);
    const error = useSelector(state => state.group.error);

    useEffect(() => {
        dispatch(fetchGroups()); // Llama a la acción para obtener productos al cargar el componente
        dispatch(fetchStaff()); // Llama a la acción para obtener productos al cargar el componente
    }, [dispatch]);

    useEffect(() => {
        setGroups([]);
        for (let i = 0; i < items.length; i++) {   
             
          Object.values(items[i].communication_of_subjects_and_teacher).forEach((value) => {
            
            for (const j in itemStaff) { //Itera el array de staff para conseguir el nombre del profesor
              
              if (items[i].institution === parseInt(institution_id, 10) && value == itemStaff[j].username) { //Valida nombre del profe y institucion
                // Actualiza el valor de la clave correspondiente
                
                setGroups((prevFiltred) => [...prevFiltred, items[i]]);
              }; 
            };
          });         
        };
    }, [items]);

    // const openModal = (group) => {
    //     setSelectedGroups(group);
    //     setSeeMore(true);
    // };

    // const closeModal = () => {
    //     setSeeMore(false);
    //     setSelectedGroups(null);
    // };

    // const listSubject = () => {
    //     for (const key in data) {
    //         if (data.hasOwnProperty(key)) {
    //           console.log(`${key}: ${data[key]}`);
    //         }
    //     }
    // }
    
    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
      }
    
      if (error) {
        return <div>Error: {error}</div>; // Muestra el error si ocurre
      }

    return (
      <>
      <h1>Grupos</h1>
      <br />
      <br />
      <div >
            
            {groups.length > 0 ? (
              <div className='container_list'>
                {groups.map((group, i) => (

                  <div key={i} className='divField'>
                    
                    <fieldset>
                      <legend>Detalles del Grupo: <br />{group.group_name}</legend>
                      
                      <div class="info">
                          <span class="label">Nivel de educacion:</span> {group.educational_level}
                      </div>
                      <div class="info">
                          <span class="label">Capacidad Maxima:</span> {group.capacity}
                      </div>
                      <div class="info">
                          <span class="label">Numero de clase:</span> {group.classroom}
                      </div>
                      <div class="info">
                          <span class="label">Estudiantes activos:</span>  {group.current_students}
                      </div>
                      <div class="info">
                          <span class="label">Docentes asignados:</span>
                    
                          <br />
                          <br />

                          {group.communication_of_subjects_and_teacher && (
                            <table className='table_json'>
                              <tr>
                                <th>Asignatura</th>
                                <th>Docente</th>
                              </tr>

                              {Object.keys(group.communication_of_subjects_and_teacher).map((key, index) => (
                                <tr key={index}>
                                  <td>
                                    {key}
                                  </td>
                                  <td>
                                    {group.communication_of_subjects_and_teacher[key]}
                                  </td>
                                </tr>
                              ))}
                            </table>
                          )}
                      </div>
                      
                    </fieldset>
                    
                  </div>
                 
                ))}
              </div>
                
            ) : (
                <p>Todavia usted no se encuentra en ningun grupo.</p>
            )}
      
      </div>
      </>
        
    );
}

export default ListGroups;
