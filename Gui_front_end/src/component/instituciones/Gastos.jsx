import React, { useState } from 'react';

function GastosGanancias() {
  // Estado para los gastos y ganancias
  const [estado, setEstado] = useState({
    luz: '',
    agua: '',
    internet: '',
    comida: '',
    materialDidactico: '',
    patentes: '',
    deduccionCaja: '',
    polizas: '',
    uniformesCompradosCantidad: '',
    uniformeCostoInstitucion: '',
    uniformesRegalados: '',
    fechaRegistro: '',
    mensualidadNinosPrivados: '',
    mensualidadNinosRedCuido: '',
  });

  // Resultados
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalGanancias, setTotalGanancias] = useState(0);
  const [balance, setBalance] = useState(null);
  const [resultadosGastos, setResultadosGastos] = useState({});

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstado((prev) => ({ ...prev, [name]: value }));
  };

  // Función para aplicar las operaciones
  const aplicarOperaciones = () => {
    const gastos = calcularGastos();
    calcularGanancias();
    setResultadosGastos(gastos);
  };

  // Función para calcular gastos
  const calcularGastos = () => {
    const gastos = {
      luz: parseFloat(estado.luz || 0),
      agua: parseFloat(estado.agua || 0),
      internet: parseFloat(estado.internet || 0),
      comida: parseFloat(estado.comida || 0),
      materialDidactico: parseFloat(estado.materialDidactico || 0),
      patentes: parseFloat(estado.patentes || 0),
      deduccionCaja: parseFloat(estado.deduccionCaja || 0),
      polizas: parseFloat(estado.polizas || 0),
      uniformesComprados: parseFloat(estado.uniformesCompradosCantidad || 0) * parseFloat(estado.uniformeCostoInstitucion || 0),
      uniformesRegalados: parseFloat(estado.uniformesRegalados || 0) * parseFloat(estado.uniformeCostoInstitucion || 0),
    };

    const total = Object.values(gastos).reduce((acc, curr) => acc + curr, 0);
    setTotalGastos(total);
    calcularBalance(totalGanancias, total);

    return gastos;
  };

  // Función para calcular ganancias
  const calcularGanancias = () => {
    const ingresosPrivados = parseFloat(estado.mensualidadNinosPrivados || 0);
    const ingresosRedCuido = parseFloat(estado.mensualidadNinosRedCuido || 0);
    const ingresosUniformesComprados = parseFloat(estado.uniformesCompradosCantidad || 0) * parseFloat(estado.uniformeCostoInstitucion || 0);

    const total = ingresosPrivados + ingresosRedCuido + ingresosUniformesComprados;
    setTotalGanancias(total);
    calcularBalance(total, totalGastos); // Mantener el orden correcto
  };

  // Función para calcular balance
  const calcularBalance = (ingresos, gastos) => {
    const resultado = ingresos - gastos; // Ajuste aquí para el cálculo correcto del balance
    setBalance(resultado);
  };

  return (
    <div>
      <h1>Gastos</h1>
      {['luz', 'agua', 'internet', 'comida', 'materialDidactico', 'patentes', 'deduccionCaja', 'polizas', 'uniformesCompradosCantidad', 'uniformeCostoInstitucion', 'uniformesRegalados'].map((item) => (
        <label key={item}>
          {item.charAt(0).toUpperCase() + item.slice(1)}:
          <input
            type="number"
            name={item}
            value={estado[item]}
            onChange={handleChange}
            step="0.01"
          />
        </label>
      ))}
      <br />
      <label>
        Fecha de Registro de Gastos:
        <input type="date" name="fechaRegistro" value={estado.fechaRegistro} onChange={handleChange} />
      </label>
      <br />

      <h2>Operaciones</h2>
      <button onClick={aplicarOperaciones}>Aplicar Operaciones</button>
      <h3>Total Gastos: ${totalGastos.toFixed(2)}</h3>

      <h1>Ganancias</h1>
      {['mensualidadNinosPrivados', 'mensualidadNinosRedCuido'].map((item) => (
        <label key={item}>
          {item.replace(/([A-Z])/g, ' $1').trim()}:
          <input
            type="number"
            name={item}
            value={estado[item]}
            onChange={handleChange}
            step="0.01"
          />
        </label>
      ))}
      <br />
      <button onClick={calcularGanancias}>Calcular Ganancias</button>
      <h3>Total Ganancias: ${totalGanancias.toFixed(2)}</h3>

      {balance !== null && <h3>Balance: ${balance.toFixed(2)}</h3>}

      <h2>Resultados Detallados</h2>
      <ul>
        {Object.entries(resultadosGastos).map(([key, value]) => (
          <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: ${value?.toFixed(2) || 0}</li>
        ))}
      </ul>
    </div>
  );
}

export default GastosGanancias;
