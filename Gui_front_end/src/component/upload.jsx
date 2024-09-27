import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) {
            alert('Por favor, selecciona una imagen primero.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', image);
    
        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                const response = await axios.post('https://api.imgur.com/3/image', formData, {
                    headers: {
                        'Authorization': `Client-ID YOUR_CLIENT_ID`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImageUrl(response.data.data.link);
                alert('Imagen subida exitosamente!');
                return; // Salimos de la función si la carga fue exitosa
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    // Espera un tiempo antes de reintentar
                    const waitTime = Math.pow(2, attempt) * 1000; // Aumenta el tiempo de espera
                    console.log(`Esperando ${waitTime / 1000} segundos antes de reintentar...`);
                    await delay(waitTime);
                } else {
                    console.error('Error al subir la imagen:', error.response?.data || error.message);
                    alert(`Hubo un problema al subir la imagen: ${error.response?.data?.message || error.message}`);
                    return; // Salimos de la función si hay otro error
                }
            }
        }
    
        alert('Se superó el número máximo de intentos para subir la imagen.');
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Subir Imagen</button>
            {imageUrl && <img src={imageUrl} alt="Imagen subida" style={{ marginTop: '20px', maxWidth: '100%' }} />}
        </div>
    );
};

export default ImageUpload;