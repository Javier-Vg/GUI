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
  
export const postInstitutions = async (name, address, estado, subscriptionType, phoneNumber, email,date,Image) => {
    try {
      const response = await axios.post("http://localhost:8000/api/institutions/institution/", {
        name: name,
        direction: address,
        payment_status : estado,
        suscription_type: subscriptionType,
        number_phone: phoneNumber,
        email: email,
        subscription_date: date,
        imagen:Image
      });
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };

 

  export const postStudents = async (nombre,apellido,identificacion,fecha_nacimiento,grado,estado_academico,telefono,email, contacto_emergencia ) => {
    try {
      const response = await axios.post('http://localhost:8000/api/students/students/', {
        name: nombre,
        last_name: apellido,
        identification_number: identificacion,
        birthdate_date: fecha_nacimiento,
        grade: grado,
        academic_status: estado_academico,
        contact_information: telefono, 
        email: email, 
        emergency_contact: contacto_emergencia, 
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error al agregar el estudiante', error);
      throw error;
    }
  };
  