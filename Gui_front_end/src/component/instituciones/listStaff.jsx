// import React, { useEffect, useState } from 'react';
// import { getStaff } from '../../service/LoginGui';

// function ListStaff() {

//   const [Staff, setStaff] = useState();

//   const [Modal, setModal] = useState(false);
//   const [Id, setId] = useState(null);

//   //Llama a metodo que hace la solicitud http al api
//   useEffect(()=> {
//     getData();
//   },[]);

//   const getData = async () => {
//     try {
//       const data = await getStaff();
//       setStaff(data);
//     } catch (error) {
//         console.error("Error fetching staff:", error);
//     }
//   }

//   const openModal = (i) => {
//     setId(i);
//     setModal(true);
//   }

//   const closeModal = () => {
//     setId(null);
//     setModal(!Modal);
//   }

//   return (
//     <>
//     <h2 style={{textAlign: "left"}}>Personal Registrado:</h2>

//       <div style={{
        
//         display: "grid",
//         gridTemplateColumns: "400px 400px 400px"
//         }}>
//         {Staff && (
//         Staff.map((i, index) => (
//           <div key={index} 
//           className='div-vista'
//           style={{
//             border: "2px solid #ccc",
//             borderRadius: "5px",
//             color: 'white',
//             padding: "20px",
//             marginBottom: "10px", // Añadir espacio entre los divs
//             width: "350px",
//             margin: "20px",
//             textAlign: "center"
//           }}>

//             <h3>{i.name}</h3>
//             <h3>{i.last_name}</h3>
//             <button style={{color: "#48e"}} onClick={(() => openModal(i))}>Mostrar mas...</button>
//             <img src={i.imagen_url} alt="iMGUR" />

//           </div>
//         ))
//       )}

//       {Modal && Id && (
//           <dialog style={{ borderRadius: "14px" }} open>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "220px 350px",
//                 padding: "20px",
//                 border: "3px solid black",
//                 borderRadius: "10px",
//               }}
//             >
//               <div>
//                 <h3>{Id.name}</h3>
//                 <h3>{Id.last_name}</h3>
//                 <h3>{Id.identification_number}</h3>
//               </div>

//               <div>
//                 <h3>{Id.direction}</h3>
//                 <h3>{Id.phone_number}</h3>
//               </div>

//               <div>
//                 <h3>{Id.email}</h3>
//                 <h3>{Id.position}</h3>
//                 <h3>{Id.contract_id}</h3>
//                 <h3>{Id.institution_id}</h3>
//                 <h3>{Id.subjects_id}</h3>
//                 <h3>{Id.schedule_id}</h3>
//               </div>
//             </div>

//             <div style={{ display: "flex", padding: "10px" }}>
//               {/* Puedes añadir más elementos aquí si lo deseas */}
//             </div>

//             <button onClick={closeModal}>Cerrar</button>
//           </dialog>
//         )}
//       </div>
//     </>
//   )
// }

// export default ListStaff
import React, { useEffect, useState } from 'react';
import { getStaff } from '../../service/LoginGui';

function ListStaff() {

  const [staff, setStaff] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const institution_id = localStorage.getItem('InstitutionID');  // Obtener el institution_id del localStorage

  // Llama a método que hace la solicitud HTTP al API
  useEffect(()=> {
    getData();
  },[]);

  const getData = async () => {
    try {
      const data = await getStaff();
      // Filtrar el personal por institution_id
      const filteredStaff = data.filter(staffMember => staffMember.institution === parseInt(institution_id, 10));
      setStaff(filteredStaff);
    } catch (error) {
        console.error("Error fetching staff:", error);
    }
  }

  const openModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setModal(true);
  }

  const closeModal = () => {
    setSelectedStaff(null);
    setModal(false);
  }

  return (
    <>
    <h2 style={{textAlign: "left"}}>Personal Registrado:</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "400px 400px 400px"
        }}>
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
