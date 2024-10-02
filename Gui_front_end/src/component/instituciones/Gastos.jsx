import React, { useState } from 'react';

function Gastos() {
  const [luz, setLuz] = useState('');
  const [agua, setAgua] = useState('');
  const [internet, setInternet] = useState('');
  const [comida, setComida] = useState('');
  const [materialDidactico, setMaterialDidactico] = useState('');
  const [patentes, setPatentes] = useState('');
  const [deduccionCaja, setDeduccionCaja] = useState('');
  const [polizas, setPolizas] = useState('');
  const [uniformes, setUniformes] = useState('');
  const [porcentajeMedico, setPorcentajeMedico] = useState('');
  const [alquilerLocal, setAlquilerLocal] = useState('');
  const [mensualidadNinosPrivados, setMensualidadNinosPrivados] = useState('');
  const [mensualidadNinosRedCuido, setMensualidadNinosRedCuido] = useState('');

  return (
    <div>
      <label>
        Luz:
        <input
          type="number"
          value={luz}
          onChange={(e) => setLuz(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Agua:
        <input
          type="number"
          value={agua}
          onChange={(e) => setAgua(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Internet:
        <input
          type="number"
          value={internet}
          onChange={(e) => setInternet(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Comida:
        <input
          type="number"
          value={comida}
          onChange={(e) => setComida(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Material Didáctico:
        <input
          type="number"
          value={materialDidactico}
          onChange={(e) => setMaterialDidactico(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Patentes:
        <input
          type="number"
          value={patentes}
          onChange={(e) => setPatentes(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Deducción Caja:
        <input
          type="number"
          value={deduccionCaja}
          onChange={(e) => setDeduccionCaja(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Pólizas:
        <input
          type="number"
          value={polizas}
          onChange={(e) => setPolizas(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Uniformes:
        <input
          type="number"
          value={uniformes}
          onChange={(e) => setUniformes(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Porcentaje Médico:
        <input
          type="number"
          value={porcentajeMedico}
          onChange={(e) => setPorcentajeMedico(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Alquiler Local:
        <input
          type="number"
          value={alquilerLocal}
          onChange={(e) => setAlquilerLocal(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Mensualidad Niños Privados:
        <input
          type="number"
          value={mensualidadNinosPrivados}
          onChange={(e) => setMensualidadNinosPrivados(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
      <label>
        Mensualidad Niños Red Cuido:
        <input
          type="number"
          value={mensualidadNinosRedCuido}
          onChange={(e) => setMensualidadNinosRedCuido(e.target.value)}
          step="0.01"
        />
      </label>
      <br />
    </div>
  );
}

export default Gastos;
