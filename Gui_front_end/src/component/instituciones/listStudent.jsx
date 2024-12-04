import React, { useEffect, useState } from "react";
import { postGroupsAssignment, putStudent } from "../../service/LoginGui";
import { fetchStudent } from "../../Redux/Slices/SliceStudent";
import { fetchGroups } from "../../Redux/Slices/SliceGroup";
import { useDispatch, useSelector } from "react-redux";
import "../../css/list_student.css";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const domain = window.location.hostname;
  
  
function ListStudents() {
  const [students, setStudents] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [institution_id, setInstitutionId] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [GroupId, setGroupId] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Estado para almacenar la URL de la imagen

  

  const dispatch = useDispatch();
  const items = useSelector((state) => state.student.items);
  const loading = useSelector((state) => state.student.loading);
  const error = useSelector((state) => state.student.error);
  const searchTerm = useSelector((state) => state.search.searchTerm); // Obtén el término de búsqueda

  useEffect(() => {
    const token = Cookies.get('AuthCookie');

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.info.institution;
        
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
    dispatch(fetchStudent());
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    setStudents(
      items.filter(
        (item) =>
          item.institution === parseInt(institution_id, 10) &&
          (item.username.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por nombre
            item.identification_number.toLowerCase().includes(searchTerm.toLowerCase())) // Filtra por apellido
      )
    );
  }, [items, institution_id, searchTerm]);

  const openModal = (student) => {
    setSelectedStudent(student);
    setSeeMore(true);
    setUpdatedStudent(student);
    setImageFile(null);
    setImageUrl(student.imagen_url || ""); // Inicializa la URL de la imagen con la existente
  };

  const closeModal = () => {
    setSeeMore(false);
    setSelectedStudent(null);
    setConfirm(false);
    setEditMode(false);
  };

  const handleSubmit = (prop) => {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}/${String(
      fechaActual.getMonth() + 1
    ).padStart(2, "0")}/${String(fechaActual.getDate()).padStart(2, "0")}`;

    const group = {
      registration_day: fechaFormateada,
      group: GroupId,
      student: prop,
    };

    postGroupsAssignment(group);
    setConfirm(!confirm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Almacena el archivo de imagen seleccionado
    setImageFile(file);
  };

  const handleUpdate = async () => {
    // Subir la imagen primero si hay un archivo nuevo
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch(`http://${domain}:8000/api/urlResponse/`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!data.image_url) {
          throw new Error("Error al subir la imagen");
        }
        // Guarda la URL de la imagen
        setImageUrl(data.image_url);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        return; // Detiene la ejecución si hay un error al subir la imagen
      }
    }

    // Asegúrate de que la URL de la imagen sea la nueva
    const formData = new FormData();
    for (const key in updatedStudent) {
      formData.append(key, updatedStudent[key]);
    }

    // Agrega la nueva imagen solo si ha cambiado
    if (imageUrl) {
      formData.append("imagen_url", imageUrl);
    }

    const studentId = selectedStudent.id; // Asegúrate de que esto sea el ID correcto
    const data = Object.fromEntries(formData.entries());
    try {
      await putStudent(studentId, data);
      // Actualiza la lista de estudiantes inmediatamente
      const updatedStudents = students.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            ...updatedStudent,
            imagen_url: imageUrl || student.imagen_url,
          };
        }
        return student;
      });

      setStudents(updatedStudents); // Actualiza el estado con los cambios
      setEditMode(false); // Salir del modo de edición
      setSeeMore(true); // Mantener el modal abierto para ver los cambios actualizados
      
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container_list-students">
      <h1>Estudiantes</h1>
      <div className="students">
        {students.length > 0 ? (
          students.map((student, index) => (
            <div
              className="container_students_list"
              key={`${student.identification_number}-${index}`}
            >
              <div className="div_img">
                {student.imagen_url ? (
                  <img
                    className="Student_Image"
                    src={student.imagen_url}
                    alt="No found"
                  />
                ) : (
                  <div className="No_Image">Sin Imagen</div>
                )}
              </div>
              <div className="student_inf">
                <input
                  onClick={() => openModal(student)}
                  type="button"
                  value="Ver más"
                />
                <h2>
                  {student.username} {student.last_name}
                </h2>
                <h6>{student.grade}</h6>
              </div>
            </div>
          ))
        ) : (
          <p>No hay estudiantes en esta institución.</p>
        )}
      </div>

      {seeMore && selectedStudent && (
        <div className="modal-list-student">
          <h2>Información del Estudiante</h2>
          {/* dependiendo de su estado, muestra o edita la informacion del estudiante. */}
          {editMode ? (
            <div >
              <div className="edit-student-form">
              <label>Nombre:</label>
              <input
                type="text"
                name="username"
                value={updatedStudent.username}
                onChange={handleInputChange}
              />
              <label>Apellido:</label>
              <input
                type="text"
                name="last_name"
                value={updatedStudent.last_name}
                onChange={handleInputChange}
              />
              <label>Número de Identificación:</label>
              <input
                type="text"
                name="identification_number"
                value={updatedStudent.identification_number}
                onChange={handleInputChange}
              />
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                name="birthdate_date"
                value={updatedStudent.birthdate_date}
                onChange={handleInputChange}
              />
              <label>Grado:</label>
              <input
                type="text"
                name="grade"
                value={updatedStudent.grade}
                onChange={handleInputChange}
              />
              <label>Estado Académico:</label>
              <input
                type="text"
                name="academic_status"
                value={updatedStudent.academic_status}
                onChange={handleInputChange}
              />
              <label>Información de Alergias:</label>
              <input
                type="text"
                name="allergy_information"
                value={updatedStudent.allergy_information}
                onChange={handleInputChange}
              />
              <label>Contacto:</label>
              <input
                type="text"
                name="contact_information"
                value={updatedStudent.contact_information}
                onChange={handleInputChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedStudent.email}
                onChange={handleInputChange}
              />
              <label>Teléfono del Tutor:</label>
              <input
                type="text"
                name="guardian_phone_number"
                value={updatedStudent.guardian_phone_number}
                onChange={handleInputChange}
              />
              <label>Nombre del Tutor:</label>
              <input
                type="text"
                name="name_guardian"
                value={updatedStudent.name_guardian}
                onChange={handleInputChange}
              />
              <label>Pago Mensual del Estudiante:</label>
              <input
                type="text"
                name="monthly_payment_students"
                value={updatedStudent.monthly_payment_students}
                onChange={handleInputChange}
              />
              <label>Tipo de Estudiante:</label>
              <input
                type="text"
                name="type_of_student"
                value={updatedStudent.type_of_student}
                onChange={handleInputChange}
              />
              <label  >Grupo:</label>
              <input
                type="text"
                name="group"
                value={updatedStudent.group}
                onChange={handleInputChange}
              />
              <label>Imagen del Estudiante:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {selectedStudent.imagen_url && (
                <img
                  className="Student_Image"
                  src={selectedStudent.imagen_url}
                  alt="No found"
                />
              )}
              </div>
              <button className="buton-actualizar-list-student" onClick={handleUpdate}>Actualizar Estudiante</button>
            </div>
          ) : (
            
            <div className="container-list-info-student"> 
            <img src={selectedStudent.imagen_url} alt="" className="Student_Image-info"/>
            <div className="div-info-student">
              <p className="info-student">Nombre: {selectedStudent.username}</p>
              <p className="info-student">Apellido: {selectedStudent.last_name}</p>
              <p className="info-student">
                Número de Identificación:{" "}
                {selectedStudent.identification_number}
              </p>
              <p className="info-student">Fecha de Nacimiento: {selectedStudent.birthdate_date}</p>
              <p className="info-student">Grado: {selectedStudent.grade}</p>
              <p className="info-student">Estado Académico: {selectedStudent.academic_status}</p>
              <p className="info-student">
                Información de Alergias: {selectedStudent.allergy_information}
              </p>
              <p className="info-student">Contacto: {selectedStudent.contact_information}</p>
              <p className="info-student">Email: {selectedStudent.email}</p>
              <p className="info-student">Teléfono del Tutor: {selectedStudent.guardian_phone_number}</p>
              <p className="info-student">Nombre del Tutor: {selectedStudent.name_guardian}</p>
              <p className="info-student">
                Pago Mensual del Estudiante:{" "}
                {selectedStudent.monthly_payment_students}
              </p>
              <p className="info-student">Tipo de Estudiante: {selectedStudent.type_of_student}</p>
              <p className="info-student">Grupo: {selectedStudent.group}</p>
              <button className="buton-editar-list-student" onClick={() => setEditMode(true)}>Editar</button>
              <button className="buton-cerrar-list-student" onClick={closeModal}>Cerrar</button>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default ListStudents;
