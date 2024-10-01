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
  
export const postInstitutions = async (name, address, estado, subscriptionType, phoneNumber, email,imageUrl) => {
    try {
      const response = await axios.post("http://localhost:8000/api/institutions/institution/", {
        name: name,
        direction: address,
        payment_status : estado,
        suscription_type: subscriptionType,
        number_phone: phoneNumber,
        email: email,
        imagen_url: imageUrl
      });
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };
  


  export const getStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/staff/staff/');
      return response.data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
  
  export const postStaff = async (staff) => {
    try {
      const response = await axios.post("http://localhost:8000/api/staff/staff/", staff);
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };
  
 

  export const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students/students/');
      return response.data; // Asumiendo que la API devuelve un array de estudiantes
    } catch (error) {
      console.error('Error al obtener estudiantes:', error.response?.data || error);
      throw error; // Lanzar error para manejarlo en el componente
    }
  };

  export const postStudents = async (studentData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/students/students/', {
        name: studentData.nombre,
        last_name: studentData.apellido,
        identification_number: studentData.identificacion,
        birthdate_date: studentData.fecha_nacimiento,
        grade: studentData.grado,
        academic_status: studentData.estado_academico,
        contact_information: studentData.telefono,
        email: studentData.email,
        emergency_contact: studentData.contacto_emergencia,
        imagen : studentData.imagen
      });
  
      return response.data;
    } catch (error) {
      console.error('Error al agregar el estudiante', error);
      throw error;
    }
  };

