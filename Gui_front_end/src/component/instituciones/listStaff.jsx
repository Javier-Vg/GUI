
// export default ListStaff
import React, { useEffect, useState } from 'react';
import { fetchStaff } from '../../Redux/Slices/SliceStaff';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/list_staff.css';

function ListStaff() {

  const [staff, setStaff] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const institution_id = localStorage.getItem('InstitutionID');  // Obtener el institution_id del localStorage

  const dispatch = useDispatch();

  //Estados de Staff:
  const itemsStaff = useSelector(state => state.staff.items);  
  const loading = useSelector(state => state.staff.loading);  
  const error = useSelector(state => state.staff.error);  

  useEffect(() => {
    dispatch(fetchStaff()); // Llama a la acción para obtener productos al cargar el componente
  }, [dispatch]);

  useEffect(() => {
    setStaff([]);
    for (let i = 0; i < itemsStaff.length; i++) {
      if (itemsStaff[i].institution === parseInt(institution_id, 10)) {
        // Actualiza el valor de la clave correspondiente
        setStaff((prevFiltred) => [...prevFiltred, itemsStaff[i]]);
      };
    }
  },[itemsStaff]);

  const openModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setModal(true);
  }

  const closeModal = () => {
    setSelectedStaff(null);
    setModal(false);
  }

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra el error si ocurre
  }

  return (
    <>
    
    <h2 style={{textAlign: "left"}}>Personal Registrado:</h2>

      <div className="div1" >
        {staff.length > 0 ? (
        staff.map((staffMember, index) => (
          <div key={index} 
          className='div-vista'
          style={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            color: 'white',
            padding: "20px",
            marginBottom: "10px", // Añadir espacio entre los divs
            width: "350px",
            margin: "20px",
            textAlign: "center"
          }}>

            <h3>{staffMember.name}</h3>
            <h3>{staffMember.last_name}</h3>
            <button style={{color: "#48e"}} onClick={(() => openModal(staffMember))}>Mostrar más...</button>
            <img src={staffMember.imagen_url} alt="Imagen del staff" />

          </div>
        ))
      ) : (
        <p>No hay personal registrado en esta institución.</p>
      )}

      {modal && selectedStaff && (
          <dialog style={{ borderRadius: "14px" }} open>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "220px 350px",
                padding: "20px",
                border: "3px solid black",
                borderRadius: "10px",
              }}
            >
              <div>
                <h3>{selectedStaff.name}</h3>
                <h3>{selectedStaff.last_name}</h3>
                <h3>{selectedStaff.identification_number}</h3>
              </div>

              <div>
                <h3>{selectedStaff.direction}</h3>
                <h3>{selectedStaff.phone_number}</h3>
              </div>

              <div>
                <h3>{selectedStaff.email}</h3>
                <h3>{selectedStaff.position}</h3>
                <h3>{selectedStaff.contract_id}</h3>
                <h3>{selectedStaff.institution_id}</h3>
                <h3>{selectedStaff.subjects_id}</h3>
                <h3>{selectedStaff.schedule_id}</h3>
              </div>
            </div>

            <button onClick={closeModal}>Cerrar</button>
          </dialog>
        )}
      </div>
    </>
  );
}

export default ListStaff;
