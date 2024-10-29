import React, { useEffect, useState } from 'react';
import { getInstitutions, updateInstitutions } from '../../service/LoginGui';
import "../../css/Gui_list_institutions.css";

function ListInstitutions() { 
    const [instituciones, setInstituciones] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [editingInstitution, setEditingInstitution] = useState(null); // Estado para la edición

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
        setEditingInstitution({ ...institution }); // Inicializamos el estado para edición con los valores actuales
        setSeeMore(true);
    };

    const closeModal = () => {
        setSeeMore(false);
        setSelectedInstitution(null);
        setEditingInstitution(null); // Limpiamos el estado de edición al cerrar el modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingInstitution((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            // Agregar un console.log para ver los datos que se envían
            console.log("Enviando cambios a la API:", editingInstitution);

            // Llamar a la función updateInstitutions
            const updatedInstitution = await updateInstitutions(editingInstitution);
            
            // Después de la actualización, actualizar la lista de instituciones con los datos actualizados
            if (updatedInstitution) {
                const updatedInstitutions = instituciones.map((institution) =>
                    institution.id === updatedInstitution.id ? updatedInstitution : institution
                );
                setInstituciones(updatedInstitutions);
            }

            // El modal no se cierra automáticamente ahora
        } catch (error) {
            console.error("Error updating institution:", error);
        }
    };

    return (
        <div className='container_list'>
            <h1>Instituciones</h1>
            <div className='institutions'>
                {instituciones.map((item) => (
                    <div className='container_institutions_list' key={item.id}>
                        <div className='div_img'>
                            <img className='Logo_Institution' src={item.imagen_url} alt="No found" onError={() => console.log("Image failed to load:", item.imagen_url)} />
                        </div>
                        <div className='institution_inf'>
                            <h6>{item.username}</h6>
                            <input onClick={() => openModal(item)} type="button" value="Ver más" />
                        </div>   
                    </div>
                ))}
            </div>
            
            {seeMore && selectedInstitution && (
                <div className='modal_institution_list'>
                    <h2 className="institution-title">Información de la Institución</h2>
                    <div className="institution-grid">
                        <div className="institution-item">
                            <strong>ID:</strong> {selectedInstitution.id}
                        </div>
                        <div className="institution-item">
                            <strong>Nombre:</strong>
                            <input 
                                type="text" 
                                name="name" 
                                value={editingInstitution.username} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="institution-item">
                            <strong>Dirección:</strong>
                            <input 
                                type="text" 
                                name="direction" 
                                value={editingInstitution.direction} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="institution-item">
                            <strong>Estado de Pago:</strong>
                            <input 
                                type="text" 
                                name="payment_status" 
                                value={editingInstitution.payment_status} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="institution-item">
                            <strong>Tipo de Suscripción:</strong>
                            <input 
                                type="text" 
                                name="suscription_type" 
                                value={editingInstitution.suscription_type} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="institution-item">
                            <strong>Teléfono:</strong>
                            <input 
                                type="text" 
                                name="number_phone" 
                                value={editingInstitution.number_phone} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="institution-item">
                            <strong>Email:</strong>
                            <input 
                                type="email" 
                                name="email" 
                                value={editingInstitution.email} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="institution-item">
                            <strong>Suscripción:</strong>
                            <input 
                                type="text" 
                                name="subscription_date" 
                                value={editingInstitution.subscription_date} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>
                    <div className="institution-item">
                        <input type="button" value="Guardar cambios" onClick={handleSaveChanges} />
                    </div>
                    <button className="close-button" onClick={closeModal}>×</button>
                </div>
            )}
        </div>
    );
}

export default ListInstitutions;
