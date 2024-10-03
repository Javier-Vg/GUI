import React, { useEffect, useState } from 'react';
import { getStaff } from '../../service/LoginGui';

function ListStaff() {

  const [Staff, setStaff] = useState();

  const [Modal, setModal] = useState(false);
  const [Id, setId] = useState(null);

  //Llama a metodo que hace la solicitud http al api
  useEffect(()=> {
    getData();
  },[]);

  const getData = async () => {
    try {
      const data = await getStaff();
      setStaff(data);
    } catch (error) {
        console.error("Error fetching staff:", error);
    }
  }

  const openModal = (i) => {
    setId(i);
    setModal(true);
  }

  const closeModal = () => {
    setId(null);
    setModal(!Modal);
  }

  return (
    <>
    <h2 style={{textAlign: "left"}}>Personal Registrado:</h2>

      <div style={{
        
        display: "grid",
        gridTemplateColumns: "400px 400px 400px"
        }}>
        {Staff && (
        Staff.map((i, index) => (
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

            <h3>{i.name}</h3>
            <h3>{i.last_name}</h3>
            <button style={{color: "#48e"}} onClick={(() => openModal(i))}>Mostrar mas...</button>
            <img src={i.imagen_url} alt="iMGUR" />

          </div>
        ))
      )}

      {Modal && Id && (
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
                <h3>{Id.name}</h3>
                <h3>{Id.last_name}</h3>
                <h3>{Id.identification_number}</h3>
              </div>

              <div>
                <h3>{Id.direction}</h3>
                <h3>{Id.phone_number}</h3>
              </div>

              <div>
                <h3>{Id.email}</h3>
                <h3>{Id.position}</h3>
                <h3>{Id.contract_id}</h3>
                <h3>{Id.institution_id}</h3>
                <h3>{Id.subjects_id}</h3>
                <h3>{Id.schedule_id}</h3>

                {/* Condición para verificar si la posición es igual a 6 */}
                {Id.position === 6 ? (
                  <h4 style={{ color: 'red' }}>Este miembro tiene posición 6</h4>
                ) : (
                  <h4>Posición diferente a 6</h4>
                )}
              </div>
            </div>

            <div style={{ display: "flex", padding: "10px" }}>
              {/* Puedes añadir más elementos aquí si lo deseas */}
            </div>

            <button onClick={closeModal}>Cerrar</button>
          </dialog>
        )}
      </div>
    </>
  )
}

export default ListStaff