import React, { useState } from 'react';

function Notas() {
  const [socioafectiva, setSocioafectiva] = useState(null);
  const [psicomotriz, setPsicomotriz] = useState(null);
  const [cognitiva, setCognitiva] = useState(null);
  const [notas, setNotas] = useState({
    socioafectiva: '',
    psicomotriz: '',
    cognitiva: ''
  });

  const handleCheckClick = (area, level) => {
    if (area === 'socioafectiva') {
      setSocioafectiva(level);
    } else if (area === 'psicomotriz') {
      setPsicomotriz(level);
    } else if (area === 'cognitiva') {
      setCognitiva(level);
    }
  };

  const handleNotaChange = (area, value) => {
    setNotas((prev) => ({
      ...prev,
      [area]: value
    }));
  };

  const renderEmoji = (value, level) => {
    if (value === level) {
      switch (level) {
        case 1:
          return '😟'; // Bajo
        case 2:
          return '😐'; // Medio
        case 3:
          return '😄'; // Alto
        default:
          return '⬜'; // No marcado
      }
    }
    return '⬜'; // No marcado
  };

  return (
    <div>
      <h2>Informe de Desarrollo</h2>

      <div>
        <h3>Socioafectiva</h3>
        <div>
          <span onClick={() => handleCheckClick('socioafectiva', 1)}>{renderEmoji(socioafectiva, 1)} Bajo</span>
          <span onClick={() => handleCheckClick('socioafectiva', 2)}>{renderEmoji(socioafectiva, 2)} Medio</span>
          <span onClick={() => handleCheckClick('socioafectiva', 3)}>{renderEmoji(socioafectiva, 3)} Alto</span>
        </div>
        {socioafectiva && (
          <textarea
            placeholder="Escribe aquí tus observaciones sobre socioafectiva..."
            value={notas.socioafectiva}
            onChange={(e) => handleNotaChange('socioafectiva', e.target.value)}
            rows="2"
            cols="50"
          />
        )}
      </div>

      <div>
        <h3>Psicomotriz</h3>
        <div>
          <span onClick={() => handleCheckClick('psicomotriz', 1)}>{renderEmoji(psicomotriz, 1)} Bajo</span>
          <span onClick={() => handleCheckClick('psicomotriz', 2)}>{renderEmoji(psicomotriz, 2)} Medio</span>
          <span onClick={() => handleCheckClick('psicomotriz', 3)}>{renderEmoji(psicomotriz, 3)} Alto</span>
        </div>
        {psicomotriz && (
          <textarea
            placeholder="Escribe aquí tus observaciones sobre psicomotriz..."
            value={notas.psicomotriz}
            onChange={(e) => handleNotaChange('psicomotriz', e.target.value)}
            rows="2"
            cols="50"
          />
        )}
      </div>

      <div>
        <h3>Cognitiva</h3>
        <div>
          <span onClick={() => handleCheckClick('cognitiva', 1)}>{renderEmoji(cognitiva, 1)} Bajo</span>
          <span onClick={() => handleCheckClick('cognitiva', 2)}>{renderEmoji(cognitiva, 2)} Medio</span>
          <span onClick={() => handleCheckClick('cognitiva', 3)}>{renderEmoji(cognitiva, 3)} Alto</span>
        </div>
        {cognitiva && (
          <textarea
            placeholder="Escribe aquí tus observaciones sobre cognitiva..."
            value={notas.cognitiva}
            onChange={(e) => handleNotaChange('cognitiva', e.target.value)}
            rows="2"
            cols="50"
          />
        )}
      </div>
    </div>
  );
}

export default Notas;
