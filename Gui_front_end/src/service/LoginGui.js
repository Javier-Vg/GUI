import axios from "axios";
const domain = window.location.hostname 

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

/////////////////////////////////////////////////////////////////
export const getInstitutions = async () => {
    try {    
      const response = await axios.get(`http://${domain}:8000/api/institutions/institution/`);
      return response.data
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  
export const postInstitutions = async (name, address, estado, subscriptionType, phoneNumber, email,imageUrl,monthly_payent,password) => {
  
    try {
      const response = await axios.post(`http://${domain}:8000/api/institutions/institution/`, {
        name: name,
        direction: address,
        payment_status : estado,
        suscription_type: subscriptionType,
        number_phone: phoneNumber,
        email: email,
        imagen_url: imageUrl,
        monthly_payent: monthly_payent,
        password:password
      });
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
  };
  
export const updateInstitutions = async (editingInstitution) => {
    try {
      const response = await axios.put(`http://${domain}:8000/api/institutions/institution/${editingInstitution.id}/`, {
        // create_date: create_date,
        direction: editingInstitution.direction,
        email: editingInstitution.email,
        imagen_url: editingInstitution.imagen_url,
        monthly_payent: editingInstitution.monthly_payent,
        name: editingInstitution.name,
        number_phone: editingInstitution.number_phone,
        payment_status : editingInstitution.payment_status,       
        subscription_date: editingInstitution.subscription_date,
        suscription_type: editingInstitution.suscription_type,
        
      });
      return response.data;
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      throw error;
    }
};
/////////////////////////////////////////////////////////////////
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
  // service/LoginGui.js
export const postStudents = async (nombre, apellido, identificacion, fechaNacimiento, grado, estadoAcademico, telefono, email, imageUrl, alergias, guardianTelefono, nameGuardian, mensualidadDelEstudiante, password, institution_id) => {
    console.log(institution_id);
    
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
      monthly_payent_students: mensualidadDelEstudiante,
      password: password,
      institution: institution_id, // Agrega aquí el ID de la institución
      
    });
    return response.data;
  } catch (error) {
    // Manejo de errores...
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


export const postSubjects = async (subjects) => {
  try {
    const response = await axios.post(`http://${domain}:8000/api/subjects/subjects/`, subjects);
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
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

export const getSchedule = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/schedule/schedule`);
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


export const postGroups = async (group) => {
  try {
    const response = await axios.post(`http://${domain}:8000/api/groups/groups/`, group,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};