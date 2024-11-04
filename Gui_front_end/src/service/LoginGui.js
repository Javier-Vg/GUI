import axios from "axios";
const domain = window.location.hostname;

function getTokenFromCookie() {
  
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "AuthCookie") {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export const getDatos = async () => {
  const token = getTokenFromCookie();
  try {
    const response = await axios.get(`http://${domain}:8000/api/gui/admins/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // hace get de el api para validar logins
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const loginAdmin = async (username, password) => {
  const token = getTokenFromCookie();
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/gui/login/`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw new Error(error.response?.data?.error || "Error en la autenticación");
  }
};

export const PostData = async (nombre, contra, email, rol) => {
  const token = getTokenFromCookie();
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/gui/admins/`,
      {
        username: nombre,
        email: email,
        password: contra,
        rol: rol,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/////////////////////////////////////////////////////////////////
export const getInstitutions = async () => {
  const token = getTokenFromCookie();
  try {
    const response = await axios.get(
      `http://${domain}:8000/api/institutions/institution/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const updateInstitutions = async (editingInstitution) => {
  try {
    const token = getTokenFromCookie();

    const response = await axios.put(
      `http://${domain}:8000/api/institutions/institution/${editingInstitution.id}/`,
      {
        direction: editingInstitution.direction,
        email: editingInstitution.email,
        imagen_url: editingInstitution.imagen_url,
        monthly_payent: editingInstitution.monthly_payent,
        username: editingInstitution.username,
        number_phone: editingInstitution.number_phone,
        payment_status: editingInstitution.payment_status,
        subscription_date: editingInstitution.subscription_date,
        suscription_type: editingInstitution.suscription_type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const postInstitutions = async (
  username,
  address,
  estado,
  subscriptionType,
  phoneNumber,
  email,
  imageUrl,
  monthly_payent,
  password
) => {
  try {
    const token = getTokenFromCookie();

    const response = await axios.post(
      `http://${domain}:8000/api/institutions/institution/`,
      {
        username: username,
        direction: address,
        payment_status: estado,
        suscription_type: subscriptionType,
        number_phone: phoneNumber,
        email: email,
        imagen_url: imageUrl,
        monthly_payent: monthly_payent,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

/////////////////////////////////////////////////////////////////
export const getStaff = async () => {
  const token = getTokenFromCookie();
  try {
    const response = await axios.get(`http://${domain}:8000/api/staff/staff/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postStaff = async (staff) => {
  
  try {
    const token = getTokenFromCookie(); // Obtener el token de la cookie    

    const response = await axios.post(
      `http://${domain}:8000/api/staff/staff/`,
      staff,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token a los headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const putStaff = async (staff) => {
  try {
    const token = getTokenFromCookie(); // Obtener el token de la cookie

    const response = await axios.put(
      `http://${domain}:8000/api/staff/staff/${staff.id}/`,
      staff,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const token = getTokenFromCookie(); // Obtener el token de la cookie

    const response = await axios.get(
      `http://${domain}:8000/api/students/students/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener estudiantes:",
      error.response?.data || error
    );
    throw error;
  }
};

export const putStudent = async (studentId, data) => {
  try {
    const token = getTokenFromCookie(); // Obtener el token de la cookie

    const response = await axios.put(
      `http://${domain}:8000/api/students/students/${studentId}/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const postStudents = async (
  nombre,
  apellido,
  identificacion,
  fechaNacimiento,
  grado,
  estadoAcademico,
  telefono,
  email,
  imageUrl,
  alergias,
  guardianTelefono,
  nameGuardian,
  mensualidadDelEstudiante,
  password,
  institution_id
) => {
  
  try {
   
    
    
    const token = getTokenFromCookie(); // Obtener el token de la cookie

    const response = await axios.post(
      `http://${domain}:8000/api/students/students/`,
      {
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token a los headers
        },
        withCredentials: true,
        
      }
    );

    return response.data;
    
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const getContracts = async () => {
  const token = getContractsToken();
  try {
    const response = await axios.get(
      `http://${domain}:8000/api/contracts/contracts/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postSubjects = async (subject) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/subjects/subjects/`, // Asegúrate de que esta sea la URL correcta de tu API
       subject,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token en los encabezados
        },
        withCredentials: true, // Si necesita enviar cookies con la solicitud
      }
    );
    return response.data; // Retornar la respuesta de la API si se requiere
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // Lanzar el error para ser manejado en la UI
  }
};

export const getSubjects = async () => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.get(
      `http://${domain}:8000/api/subjects/subjects/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token en los encabezados
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getSchedule = async () => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.get(
      `http://${domain}:8000/api/schedule/schedule/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token en los encabezados
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postGroups = async (group) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/groups/groups/`,
      group,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const postGroupsAssignment = async (assignments) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/group_assignment/group_assignment/`,
      assignments,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error haciendo la solicitud:",
      error.response?.data || error
    );
    throw error;
  }
};

export const getGroupsAssignment = async () => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.get(
      `http://${domain}:8000/api/group_assignment/group_assignment/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteGroupsAssignment = async (assignmentId) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.delete(
      `http://${domain}:8000/api/group_assignment/group_assignment/${assignmentId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

export const postGastos = async (datos) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/gastos/Gastos/`,
      {
        luz: datos.luz,
        agua: datos.agua,
        internet: datos.internet,
        comida: datos.comida,
        material_didactico: datos.materialDidactico,
        patentes: datos.patentes,
        deduccion_caja: datos.deduccionCaja,
        polizas: datos.polizas,
        uniformes_comprados_cantidad: datos.uniformesCompradosCantidad,
        uniformes_regalados_cantidad: datos.uniformesRegalados,
        precio_uniformes: datos.uniformeCostoInstitucion,
        fecha: datos.fechaRegistro,
        mensualidad_ninos_privados: datos.mensualidadNinosPrivados,
        mensualidad_ninos_red_cuido: datos.mensualidadNinosRedCuido,
        Total_ganancia: datos.TotalGanancia,
        Total_gastos: datos.TotalGastos,
        total: datos.total,
        alquiler_local: datos.alquilerLocal,
        institution: datos.institution,
        balance: datos.balance,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud:", error);
    throw error;
  }
};

// Enviar mensaje
export const sendMessage = async (messageData) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.post(
      `http://${domain}:8000/api/message/message/`,
      messageData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los headers
        },
      }
    );
    return response.data; // Devuelve el mensaje guardado desde el backend
  } catch (error) {
    throw new Error("Error al enviar el mensaje");
  }
};

export const getMessages = async () => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.get(`http://${domain}:8000/api/message/message/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los mensajes obtenidos desde el backend
  } catch (error) {
    throw new Error('Error al obtener los mensajes');
  }
};


export const postGrades = async (grade) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie

  try {
    const response = await axios.post(`http://${domain}:8000/api/grades/grades/`, grade, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud grades:", error.response?.data || error);
    throw error;
  }
};

export const postStudentAssistence = async (grade) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie

  try {
    const response = await axios.post(`http://${domain}:8000/api/student_assistance/student_assistance/`, grade, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud asistencia estudiantes:", error.response?.data || error);
    throw error;
  }
};

export const PostEvento = async (eventData) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  
  try {
    const response = await axios.post(`http://${domain}:8000/api/events/events/`, eventData,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agregar el token de autenticación
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting event data: ", error);
    throw error;
  }
};


export const PostSchedule = async (scheduleData) => {
  const token = Cookies.get('AuthCookie');
  const institutionId = token ? jwtDecode(token).info.institution : null;

  if (!institutionId) {
    console.error("No se pudo obtener la institución desde el token.");
    return;
  }
  
  try {
    const response = await axios.post(
    `http://${domain}:8000/api/schedule/schedule/`,
      scheduleData,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Añadir el token para autenticación si es necesario
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      console.log("Horario creado exitosamente:", response.data);
    } else {
      console.error("Error al crear el horario:", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};


export const GetEventos = async (institutionId) => {
  const token = getTokenFromCookie(); // Obtener el token de la cookie
  try {
    const response = await axios.get(`http://${domain}:8000/api/events/events/`,institutionId,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agregar el token de autenticación
      },
    });
    return response.data; // Devuelve los datos de los eventos filtrados por institutionId

    
    
  } catch (error) {
    console.error("Error fetching event data: ", error);
    throw error; // Lanza el error para que pueda ser manejado donde se llame
  }
};


