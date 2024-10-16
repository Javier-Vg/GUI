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
  const data = [
    { name: 'John', age: 28, city: 'New York' },
    { name: 'Jane', age: 34, city: 'Los Angeles' },
    { name: 'Mike', age: 45, city: 'Chicago' },
  ];

  const cellWidth = 100;
  const cellHeight = 40;
  

  return (
    <div>
      
      {/* {grupos && (
        Object.keys(grupos.communication_of_subjects_and_teacher).map((key, index) => (
        <p>{grupos.communication_of_subjects_and_teacher[key]}</p>
                                
                                
                                
      ))
      )} */}

      <svg width={cellWidth * 3} height={cellHeight * (data.length + 1)}>
      {/* Header */}
      <rect x="0" y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <rect x={cellWidth * 2} y="0" width={cellWidth} height={cellHeight} fill="#ddd" />
      <text x={cellWidth / 2} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Name</text>
      <text x={cellWidth * 1.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">Age</text>
      <text x={cellWidth * 2.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">City</text>

      {/* Rows */}
      {data.map((item, index) => (
        <g key={index} transform={`translate(0, ${cellHeight * (index + 1)})`}>
          <rect x="0" y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <rect x={cellWidth * 2} y="0" width={cellWidth} height={cellHeight} fill="#f9f9f9" />
          <text x={cellWidth / 2} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.name}</text>
          <text x={cellWidth * 1.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.age}</text>
          <text x={cellWidth * 2.5} y={cellHeight / 2} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="black">{item.city}</text>
        </g>
      ))}
      </svg>




      <h1>Grupos aqui</h1>
    </div>
  )
}

export default GroupsTeacher
