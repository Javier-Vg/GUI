import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../../Redux/Slices/SliceGroup';

function GroupsTeacher() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  const grupos = useSelector((state) => state.group.items); 

  console.log(grupos);
  

  return (
    <div>
      {/* {Object.keys(grupos.communication_of_subjects_and_teacher).map((key, index) => (
        <p>{selectedGroup.communication_of_subjects_and_teacher[key]}</p>
                                
                                
                                
      ))} */}
      <h1>Grupos aqui</h1>
    </div>
  )
}

export default GroupsTeacher
