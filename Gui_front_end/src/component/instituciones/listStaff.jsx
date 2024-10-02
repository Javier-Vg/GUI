<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { getStaff } from '../../service/LoginGui';
function ListStaff() {
  const [Staff, setStaff] = useState();

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


  return (
    <>
    <h2 style={{textAlign: "left"}}>Personal Registrado:</h2>
     {Staff && (
        Staff.map((i, index) => (
          <div key={index} 
          style={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "white",
            padding: "10px",
            marginBottom: "10px", // Añadir espacio entre los divs
            width: "500px",
            textAlign: "center"
            
        }}>
            <h3>{i.name}</h3>
            <h3>{i.last_name}</h3>
            <h3>{i.identification_number}</h3>
            <h3>{i.identification_number}</h3>
            <h3>{i.direction}</h3>
            <h3>{i.phone_number}</h3>
            <h3>{i.email}</h3>
            <h3>{i.phone_number}</h3>
            <h3>{i.position}</h3>
            <h3>{i.contract_id}</h3>
            <h3>{i.institution_id}</h3>
            <h3>{i.subjects_id}</h3>
            <h3>{i.schedule_id}</h3>
          </div>
        ))
      )}
  
    </>
=======
import React from 'react'
import { getStaff } from '../../service/LoginGui'
function listStaff() {
    const [staff, setStaff] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedStudent, setSelectedStaff] = useState(null);
 
    useEffect(() => {
        getStaffData(); 
    }, []);

    const getStaffData = async () => {
        const response = await getStaff();
        setStaff(response);
    };

    const openModal = () => {
        setSelectedStaff(staff);
        setSeeMore(true);
    };
    const closeModal = () => {
      setSelectedStaff(null);
        setSeeMore(false);
    };
  return (
    <div>


    </div>
>>>>>>> 04a02e857059120973790490310365fadc6d3aa3
  )
}

export default ListStaff