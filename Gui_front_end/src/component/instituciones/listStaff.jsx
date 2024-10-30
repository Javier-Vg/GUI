import React, { useEffect, useState } from "react";
import { fetchStaff } from "../../Redux/Slices/SliceStaff";
import { useDispatch, useSelector } from "react-redux";
import { putStaff } from "../../service/LoginGui.js"; // Importa la función putStaff
import "../../css/list_staff.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function ListStaff() {
  const [staff, setStaff] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editedStaff, setEditedStaff] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [filterPosition, setFilterPosition] = useState("");
  const [institution_id, setInstitutionId] = useState(null);
  const searchTerm = useSelector((state) => state.search.searchTerm); // Obtén el término de búsqueda
  const dispatch = useDispatch();

  const itemsStaff = useSelector((state) => state.staff.items);
  const loading = useSelector((state) => state.staff.loading);
  const error = useSelector((state) => state.staff.error);

  useEffect(() => {
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        // Desencriptar el token
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.info.institution;
        
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    dispatch(fetchStaff());
  }, [dispatch]);


  useEffect(() => {
    const filteredStaff = itemsStaff.filter(
      (staffMember) =>
        staffMember.institution === parseInt(institution_id, 10) &&
        (!filterPosition ||
          staffMember.position.toLowerCase() ===
            filterPosition.toLowerCase()) &&
        (!searchTerm ||
          staffMember.username.toLowerCase().includes(searchTerm.toLowerCase())) // Filtra por searchTerm
    );
    setStaff(filteredStaff);
  }, [itemsStaff, institution_id, filterPosition, searchTerm]);

  const openModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setEditedStaff(staffMember);
    setModal(true);
    setEditMode(false);
  };

  const closeModal = () => {
    setSelectedStaff(null);
    setModal(false);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "authorization") {
      setEditedStaff({ ...editedStaff, [e.target.name]: e.target.checked });
    } else if (e.target.name === "employment_status") {
      setEditedStaff({ ...editedStaff, employment_status: e.target.value });
    } else {
      setEditedStaff({ ...editedStaff, [e.target.name]: e.target.value });
    }
  };

  const saveChanges = async () => {
    try {
      const data = await putStaff(editedStaff);
      // Despacha la acción fetchStaff para obtener los datos actualizados del personal
      dispatch(fetchStaff());

      setSelectedStaff(data); // Actualiza el staff seleccionado
      setEditMode(false);
      closeModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-list-staff">
        <h2 style={{ textAlign: "left" }}>Personal Registrado:</h2>

        <div className="filter-buttons">
          {/* Filtros por posición */}
          <button onClick={() => setFilterPosition("Teacher")}>Teachers</button>
          <button onClick={() => setFilterPosition("Directors")}>
            Directors
          </button>
          <button onClick={() => setFilterPosition("Educational counselors")}>
            Educational Counselors
          </button>
          <button onClick={() => setFilterPosition("Secretaries")}>
            Secretaries
          </button>
          <button onClick={() => setFilterPosition("Cleaning staff")}>
            Cleaning Staff
          </button>
          <button onClick={() => setFilterPosition("Librarians")}>
            Librarians
          </button>
          <button onClick={() => setFilterPosition("Security staff")}>
            Security Staff
          </button>
          <button onClick={() => setFilterPosition("")}>Mostrar Todos</button>
        </div>

        <div className="div1">
          {staff.length > 0 ? (
            staff.map((staffMember, index) => (
              <div key={index} className="div-vista">
                <h3>{staffMember.username}</h3>
                <h3>{staffMember.last_name}</h3>
                <button
                  className="button"
                  onClick={() => openModal(staffMember)}
                >
                  Mostrar más...
                </button>
                <img src={staffMember.imagen_url} alt="Imagen del staff" />
              </div>
            ))
          ) : (
            <p>No hay personal registrado con la posición seleccionada.</p>
          )}

          {modal && selectedStaff && (
            <dialog className="dialog" open>
              <div className="dialog-content">
                <div>
                  {editMode ? (
                    <>
                      <h3>
                        Nombre:{" "}
                        <input
                          type="text"
                          name="username"
                          value={editedStaff.username}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        Apellido:{" "}
                        <input
                          type="text"
                          name="last_name"
                          value={editedStaff.last_name}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        Número de Identificación:{" "}
                        <input
                          type="text"
                          name="identification_number"
                          value={editedStaff.identification_number}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        Fecha de Nacimiento:{" "}
                        <input
                          type="date"
                          name="birthdate_date"
                          value={editedStaff.birthdate_date}
                          onChange={handleChange}
                        />
                      </h3>
                    </>
                  ) : (
                    <>
                      <h3>Nombre: {selectedStaff.username}</h3>
                      <h3>Apellido: {selectedStaff.last_name}</h3>
                      <h3>
                        Número de Identificación:{" "}
                        {selectedStaff.identification_number}
                      </h3>
                      <h3>
                        Fecha de Nacimiento: {selectedStaff.birthdate_date}
                      </h3>
                    </>
                  )}
                </div>

                <div>
                  {editMode ? (
                    <>
                      <h3>
                        Dirección:{" "}
                        <input
                          type="text"
                          name="direction"
                          value={editedStaff.direction}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        Teléfono:{" "}
                        <input
                          type="text"
                          name="phone_number"
                          value={editedStaff.phone_number}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        Email:{" "}
                        <input
                          type="email"
                          name="email"
                          value={editedStaff.email}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        Estado de Empleo:
                        <label>
                          <input
                            type="checkbox"
                            name="employment_status"
                            value="Active"
                            checked={editedStaff.employment_status === "Active"}
                            onChange={handleChange}
                          />
                          Active
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="employment_status"
                            value="Inactive"
                            checked={
                              editedStaff.employment_status === "Inactive"
                            }
                            onChange={handleChange}
                          />
                          Inactive
                        </label>
                      </h3>
                      <h3>
                        Autorización:
                        <input
                          type="checkbox"
                          name="authorization"
                          checked={editedStaff.authorization}
                          onChange={handleChange}
                        />
                      </h3>
                    </>
                  ) : (
                    <>
                      <h3>Dirección: {selectedStaff.direction}</h3>
                      <h3>Teléfono: {selectedStaff.phone_number}</h3>
                      <h3>Email: {selectedStaff.email}</h3>
                      <h3>
                        Estado de Empleo: {selectedStaff.employment_status}
                      </h3>
                      <h3>
                        Autorización:{" "}
                        {selectedStaff.authorization ? "True" : "False"}
                      </h3>
                    </>
                  )}
                </div>
              </div>

              {editMode ? (
                <button onClick={saveChanges}>Guardar Cambios</button>
              ) : (
                <button onClick={handleEdit}>Editar</button>
              )}

              <button onClick={closeModal}>Cerrar</button>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
}

export default ListStaff;
