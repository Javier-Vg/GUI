import React, { useState } from "react";

const MiComponente = () => {
  // Estado inicial con las keys ya definidas
  const [objctFinish, setObjctFinish] = useState({
    materia1: "",
    materia2: "",
    materia3: ""
  });

  // Lista que contiene las opciones a mostrar en los selects
  const listaMaterias = [
    { id: 1, nombre: "Matemáticas" },
    { id: 2, nombre: "Ciencias" },
    { id: 3, nombre: "Historia" }
  ];

  // Manejar cambios en los selects
  const handleSelectChange = (e, materiaKey) => {
    const value = e.target.value;
    
    // Actualiza el objeto en el estado con la clave y valor correspondiente
    setObjctFinish((prevState) => ({
      ...prevState, // Mantén el estado previo
      [materiaKey]: value // Actualiza el valor de la clave correspondiente
    }));
  };

  return (
    <div>
      {/* Mapeo de lista para generar los selects */}
      {Object.keys(objctFinish).map((materiaKey, index) => (
        <div key={index}>
          <label>{materiaKey}</label>
          <select
            value={objctFinish[materiaKey]} // Valor actual del select
            onChange={(e) => handleSelectChange(e, materiaKey)} // Maneja el cambio
          >
            <option value="">Selecciona una opción</option>
            {listaMaterias.map((materia) => (
              <option key={materia.id} value={materia.nombre}>
                {materia.nombre}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Mostrar el estado final (solo como ejemplo para depurar) */}
      <pre>{JSON.stringify(objctFinish, null, 2)}</pre>
    </div>
  );
};

export default MiComponente;
