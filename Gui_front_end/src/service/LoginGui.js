import axios from "axios";
const domain = window.location.hostname 
console.log(domain);

export const getDatos = async () => {
    try { 
      const response = await axios.get(`http://${domain}:8000/api/gui/admins/`);
      return response.data // hace get de el api para validar logins
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  export const PostData = async (nombre,contra, email,rol) => {
    try {
      console.log(domain);
      const response = await axios.post(`http://${domain}:8000/api/gui/admins/`, {// hace post a el api de los admins
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
      console.log(`http://${domain}:8000/api/institutions/institution/`);
      
      const response = await axios.get(`http://${domain}:8000/api/institutions/institution/`);
      return response.data
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  
export const postInstitutions = async (name, address, estado, subscriptionType, phoneNumber, email,imageUrl) => {
    try {
      console.log(`http://${domain}:8000/api/institutions/institution/`);

      const response = await axios.post(`http://${domain}:8000/api/institutions/institution/`, {
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
      const response = await axios.get(`http://${domain}:8000/api/staff/staff/`);
      return response.data
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  
  
  export const postStaff = async (staff) => {
    try {
      const response = await axios.post(`http://${domain}:8000/api/staff/staff/`, staff);
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };

  export const getStudents = async () => {
    try {
      const response = await axios.get(`http://${domain}:8000/api/students/students/`);
      return response.data; // Asumiendo que la API devuelve un array de estudiantes
    } catch (error) {
      console.error("Error al obtener estudiantes:", error.response?.data || error);
      throw error; // Lanzar error para manejarlo en el componente
    }
  };
  export const postStudents = async (nombre, apellido, identificacion, fechaNacimiento, grado, estadoAcademico, telefono, email, imageUrl, alergias, guardianTelefono, nameGuardian,mensualidadDelEstudiante) => {
    try {
        const response = await axios.post(`http://${domain}:8000/api/students/students/`, {
            name: nombre,
            last_name: apellido,
            identification_number: identificacion,
            birthdate_date: fechaNacimiento,
            grade: grado,
            academic_status: estadoAcademico,
            contact_information: telefono,
            email: email,
            imagen_url: imageUrl,
            allergy_information: alergias,
            guardian_phone_number: guardianTelefono,
            name_guardian: nameGuardian,
            monthly_payent_students:mensualidadDelEstudiante
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
        } else {
            console.error("Error al agregar el estudiante:", error);
        }
        throw error;
    }
};



export const getContracts = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/contracts/contracts/`);
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getSubjects = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/subjects/subjects`);
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};