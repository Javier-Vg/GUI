import axios from "axios";
const domain = window.location.hostname 

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
const token = getCookie('AuthCookie');


export const getDatos = async () => {
    try { 
      const response = await axios.get(`http://${domain}:8000/api/gui/admins/`);
      return response.data // hace get de el api para validar logins
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  // import { adminToken } from '../keys/keys'; // Asegúrate de que la ruta sea correcta
  export const loginAdmin = async (username, password) => {
    try {
      const response = await axios.post(
        `http://${domain}:8000/api/gui/login/`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error en el login:", error);
      throw new Error(error.response?.data?.error || "Error en la autenticación");
    }
  };
  export const PostData = async (nombre, contra, email, rol) => {
    try {
      const response = await axios.post(`http://${domain}:8000/api/gui/admins/`, {
        username: nombre,
        email: email,
        password: contra,
        rol: rol,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }); 
      return response
    } catch (error) {
      console.error("Error haciendo la solicitud:", error);
      return {
        success: false,
        error: error.message
      };
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




  
export const postInstitutions = async (username, address, estado, subscriptionType, phoneNumber, email,imageUrl,monthly_payent,password) => {
  

    try {
      const response = await axios.post(`http://${domain}:8000/api/institutions/institution/`, {
        username: username,
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

/////////////////////////////////////////////////////////////////
export const getStaff = async () => {

  try {
       const response = await axios.get(`http://${domain}:8000/api/staff/staff/`, {
          headers: {
              Authorization: `Bearer ${token}` // Enviar el token en el encabezado de autorización
          }
      });

      return response.data;
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
export const putStaff = async (staff) => {
  try {
    const response = await axios.put(`http://${domain}:8000/api/staff/staff/${staff.id}/`, staff, {
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
  export const getStudents = async () => {
    try {
      const response = await axios.get(`http://${domain}:8000/api/students/students/`);
      return response.data; // Asumiendo que la API devuelve un array de estudiantes
    } catch (error) {
      console.error("Error al obtener estudiantes:", error.response?.data || error);
      throw error; // Lanzar error para manejarlo en el componente
    }
  };
  export const putStudent = async (studentId,data ) => {
    try {
        const response = await axios.put(`http://${domain}:8000/api/students/students/${studentId}/`, data, {
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
  // service/LoginGui.js
export const postStudents = async (nombre, apellido, identificacion, fechaNacimiento, grado, estadoAcademico, telefono, email, imageUrl, alergias, guardianTelefono, nameGuardian, mensualidadDelEstudiante, password, institution_id) => {
  
  try {
    const response = await axios.post(`http://${domain}:8000/api/students/students/`, {
      username: nombre,
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
    console.log('Datos a enviar:', response.data);
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

export const postSubjects = async (subject,institution) => {
  try {
    console.log(subject);
    
      const response = await axios.post(
          `http://${domain}:8000/api/subjects/subjects/`,subject,institution,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Añade el token en los encabezados
              },
          }
      );
      return response.data; // Retornar la respuesta de la API si se requiere
  } catch (error) {
      console.error('Error en la solicitud:', error.response || error.message);
      // throw error; // Lanzar el error para ser manejado en la UI
  }
};
export const getSubjects = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/subjects/subjects/`);
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const getSchedule = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/schedule/schedule/`);
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

export const postGroupsAssignment = async (assignments) => {
  try {
    const response = await axios.post(`http://${domain}:8000/api/group_assignment/group_assignment/`, assignments, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error.response?.data || error);
    throw error;
  }
};
export const getGroupsAssignment = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/group_assignment/group_assignment/`);
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const deleteGroupsAssignment = async (assignmentId) => {
  try {
    const response = await axios.delete(`http://${domain}:8000/api/group_assignment/group_assignment/${assignmentId}/`);
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};
export const postGastos = async (datos) => {
  try {
    const response = await axios.post(`http://${domain}:8000/api/gastos/Gastos/`,{
      luz : datos.luz,
      agua : datos.agua,
      internet : datos.internet,
      comida : datos.comida ,
      material_didactico : datos.materialDidactico,
      patentes : datos.patentes ,
      deduccion_caja : datos.deduccionCaja ,
      polizas : datos.polizas ,
      uniformes_comprados_cantidad : datos.uniformesCompradosCantidad ,
      uniformes_regalados_cantidad : datos.uniformesRegalados ,
      precio_uniformes : datos.uniformeCostoInstitucion ,
      fecha:  datos.fechaRegistro,
      mensualidad_ninos_privados : datos.mensualidadNinosPrivados,
      mensualidad_ninos_red_cuido : datos.mensualidadNinosRedCuido,
      Total_ganancia: datos.TotalGanancia ,
      Total_gastos: datos.TotalGastos,
      total: datos.total,
      alquiler_local : datos.alquilerLocal,
      institution :datos.institution ,
      balance : datos.balance,
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

// ///////////////////////////////////////////////////////////////////////////////


// Enviar mensaje
export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`http://${domain}:8000/api/message/message/`, messageData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Devuelve el mensaje guardado desde el backend
  } catch (error) {
    throw new Error('Error al enviar el mensaje');
  }
};
export const getMessages = async () => {
  try {
    const response = await axios.get(`http://${domain}:8000/api/message/message/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Devuelve los mensajes obtenidos desde el backend
  } catch (error) {
    throw new Error('Error al obtener los mensajes');
  }
};
// /////////////////////////////////
// Función para enviar un evento
export const PostEvento = async (eventData) => {
  try {
    const response = await axios.post('http://192.168.100.44:8000/api/events/events/', eventData);
    return response.data;
  } catch (error) {
    console.error("Error posting event data: ", error);
    throw error;
  }
};
// Obtener mensajes de un profesor específico
// export const fetchMessagesForTeacher = async (teacherId) => {
//   try {
//     const response = await axios.get(`/api/messages/teacher-messages/${teacherId}/`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error al obtener los mensajes');
//   }
// };
