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
    <div>listStaff</div>
  )
}

export default ListStaff