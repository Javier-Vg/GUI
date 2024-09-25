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
        <div>
            <h1>Instituciones</h1>
            {instituciones.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.subscription_date}</p>
                    <input onClick={() => openModal(item)} type="button" value="Ver más" />
                    <hr />
                </div>
            ))}
            {seeMore && selectedInstitution && (
                <div>
                    <h2>Información de la Institución</h2>
                    <p>{selectedInstitution.name}</p>
                    <input onClick={closeModal} type="button" value="x" />
                </div>
            )}
        </div>
    );
}

export default ListInstitutions;
