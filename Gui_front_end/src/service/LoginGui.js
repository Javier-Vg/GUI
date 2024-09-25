import axios from 'axios';

export const getDatos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/gui/admins/');
      return response.data // hace get de el api para validar logins
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  export const PostData = async (nombre,contra, email,rol) => {
    try {
      const response = await axios.post("http://localhost:8000/api/gui/admins/", {// hace post a el api de los admins
          nombre: nombre,
          email:email,
          password: contra,
          rol: rol,
        
      });
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };
export const getInstitutions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/institutions/institution/');
      return response.data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
export const postInstitutions = async (name, address, estado, subscriptionType, phoneNumber, email) => {
    try {
      const response = await axios.post("http://localhost:8000/api/institutions/institution/", {
        name: name,
        direction: address,
        payment_status : estado,
        suscription_type: subscriptionType,
        number_phone: phoneNumber,
        email: email,
      });
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };
  