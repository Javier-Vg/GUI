import React from 'react'
import { useEffect, useState } from 'react';
import { getInstitutions } from '../../service/LoginGui'
function List_institutions() { 
    const [instituciones, setInstituciones] = useState([]);

    useEffect(() => {
        get_Institutions();// el useeffect actualiza el getInstitutions cada que hay un cambio
    }, []);                 // o se crea una nueva institucion

    const get_Institutions = async () => {
        try {
            const institutions = await getInstitutions();
            setInstituciones(institutions);
        } catch (error) {
            console.error("Error fetching institutions:", error);//maneja el flujo de errores
        }
    };
    return (
        <div>
            {instituciones.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>Direccion: {item.direction}</p>
                    <p>Correo electronico: {item.email}</p>
                    <p>Numero Telefonico: {item.number_phone}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default List_institutions
