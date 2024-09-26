import React, { useEffect, useState } from 'react';
import { getInstitutions } from '../../service/LoginGui';
import "../../css/Gui_list_institutions.css"
function ListInstitutions() { 
    const [instituciones, setInstituciones] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    
    useEffect(() => {
        getInstitutionsData(); 
    }, []);

    const getInstitutionsData = async () => {
        try {
            const institutions = await getInstitutions();
            setInstituciones(institutions);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    };

    const openModal = (institution) => {
        setSelectedInstitution(institution);
        setSeeMore(true);
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedInstitution(null);
    };

    return (
        <div className='container_list'>
            <h1>Instituciones</h1>
            <div className='institutions'>
                {instituciones.map((item) => (
                <div className='container_institutions_list' key={item.id}>
                    <div className='div_img'>
                        <img className='Logo_Institution' src={item.imagen_url} alt="No found" />
                    </div>
                    <div className='institution_inf'>
                        <h2>{item.name}</h2>
                        <h6>{item.name}</h6>
                        <input onClick={() => openModal(item)} type="button" value="Ver más" />
                    </div>   
                </div>
            ))}
            </div>
            
            {seeMore && selectedInstitution && (
                <div>
                    <h2>Información de la Institución</h2>
                    <h3>{selectedInstitution.id}</h3>
                    <h3>{selectedInstitution.name}</h3>
                    <h3>{selectedInstitution.direcciom}</h3>
                    <h3>{selectedInstitution.payment_status}</h3>
                    <h3>{selectedInstitution.suscription_type}</h3>
                    <h3>{selectedInstitution.create_date}</h3>
                    <h3>{selectedInstitution.number_phone}</h3>
                    <h3>{selectedInstitution.email}</h3>
                    <h3>{selectedInstitution.subscription}</h3>
                    <input onClick={closeModal} type="button" value="x" />
                </div>
            )}
        </div>
    );
}

export default ListInstitutions;
