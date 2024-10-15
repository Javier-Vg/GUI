import React, { useEffect, useState } from 'react';
import { getStudents } from '../../service/LoginGui';
import { fetchGroups } from '../../Redux/Slices/SliceGroup';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/list_group.css'

function ListGroups() {
    const [groups, setGroups] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedGroup, setSelectedGroups] = useState(null);
    const institution_id = useSelector((state) => state.ids.institutionId); // Obtén el ID de la institución
    const dispatch = useDispatch();

    //Estados de Staff:
    const items= useSelector(state => state.group.items);
    const loading = useSelector(state => state.group.loading);
    const error = useSelector(state => state.group.error); 

    useEffect(() => {
        dispatch(fetchGroups()); // Llama a la acción para obtener productos al cargar el componente
    }, [dispatch]);

    useEffect(() => {
        setGroups([]);
        for (let i = 0; i < items.length; i++) {
            if (items[i].institution === parseInt(institution_id, 10)) {
              // Actualiza el valor de la clave correspondiente
              setGroups((prevFiltred) => [...prevFiltred, items[i]]);
            };
        }

    }, [items]);

    const openModal = (group) => {
        setSelectedGroups(group);
        setSeeMore(true);
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedGroups(null);
    };


    const listSubject = () => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
              console.log(`${key}: ${data[key]}`);
            }
        }
    }
    
    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
      }
    
      if (error) {
        return <div>Error: {error}</div>; // Muestra el error si ocurre
      }

    return (
        <div className='container_list'>
            <h1>Grupos</h1>
            <div className='students'>
                {groups.length > 0 ? (
                    groups.map((group, i) => (
                        <div className='container_students_list' key={i}>
                            <div className='student_inf'>
                                <h2>{group.name} {group.last_name}</h2>
                                <h6>{group.educational_level}</h6>
                                <input onClick={() => openModal(group)} type="button" value="Ver más" />
                            </div>   
                        </div>
                    ))
                ) : (
                    <p>No hay estudiantes en esta institución.</p>
                )}
            </div>
            
            {seeMore && selectedGroup && (
                <div className='modal'>
                    <h2>Información del Estudiante</h2>
                    <h3>Nombre del grupo: {selectedGroup.group_name}</h3>
                    <h3>Nivel de educacion: {selectedGroup.educational_level}</h3>
                    <h3>Capacidad maxima: {selectedGroup.capacity}</h3>
                    <h3>Numero de clase: {selectedGroup.classroom}</h3>
                    <h3>Estudiantes activos: {selectedGroup.current_students}</h3>
                    <h3>Docentes asignados:</h3>
                    <br />
                    
                      {selectedGroup.communication_of_subjects_and_teacher && (
                        <table className='table_json'>
                            <tr>
                                <th>Asignatura</th>
                                <th>Docente</th>
                            </tr>
                            
                            {Object.keys(selectedGroup.communication_of_subjects_and_teacher).map((key, index) => (
                                
                                <tr>
                                    <td key={index}>
                                        {key} 
                                    </td>
                                    
                                    <td>
                                        {selectedGroup.communication_of_subjects_and_teacher[key]}
                                    </td>
                                </tr>
                                
                            ))}
                         
                      </table>

                    )}
                        
                    
                    <input onClick={closeModal} type="button" value="Cerrar" />
                </div>
            )}
        </div>
    );
}

export default ListGroups;
