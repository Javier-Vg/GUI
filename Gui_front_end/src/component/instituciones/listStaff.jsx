import React, { useEffect, useState } from 'react';
import { getStaff } from '../../service/LoginGui';

function ListStaff() {

  const [Staff, setStaff] = useState();
  const [Modal, setModal] = useState(false);

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

  const modalChange = () => {
    setModal(!Modal)
  }

  return (
    <>
    <h2 style={{textAlign: "left"}}>Personal Registrado:</h2>
      <div style={{overflow: scroll}}>
        {Staff && (
        Staff.map((i, index) => (
          <div key={index} 
          className='div-vista'
          style={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            color: 'black',
            padding: "10px",
            marginBottom: "10px", // Añadir espacio entre los divs
            width: "500px",
            textAlign: "center",

          }}>
            <h3>{i.name}</h3>
            <h3>{i.last_name}</h3>
            <button onClick={(() => setModal(!Modal))}>Mostrar mas...</button>
            <img src={i.imagen_url} alt="iMGUR" />
          </div>
        ))
      )}

      {Modal && Staff && ( //Muestra el modal donde se realizara el proceso de compra

          Staff.map((i, index) => (
            
            <dialog key={index} style={{ borderRadius: "14px" }} open>
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
                <h3>{i.name}</h3>
                <h3>{i.last_name}</h3>
                <h3>{i.identification_number}</h3>
              </div>
  
              <div>
                <h3>{i.identification_number}</h3>
                <h3>{i.direction}</h3>
                <h3>{i.phone_number}</h3>
              </div>
  
              <div>
                <h3>{i.email}</h3>
                <h3>{i.phone_number}</h3>
                <h3>{i.position}</h3>
                <h3>{i.contract_id}</h3>
                <h3>{i.institution_id}</h3>
                <h3>{i.subjects_id}</h3>
                <h3>{i.schedule_id}</h3>
              </div>
            </div>
  
            <div style={{ display: "flex", padding: "10px" }}>
              
            </div>
  
            <button onClick={(() => setModal(!Modal))}>close</button>
            
            </dialog>
          ))
        )}
      </div>
    </>
  )
}

export default ListStaff