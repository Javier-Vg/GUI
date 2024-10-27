import React, { useState,useEffect } from 'react';
import {postGastos} from '../../service/LoginGui';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
function GastosGanancias() {
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
    TotalGanancia: 0,
    TotalGastos: 0,
    total: 0,
    alquilerLocal: '',
  });

  const [totalGastos, setTotalGastos] = useState(0);
  const [totalGanancias, setTotalGanancias] = useState(0);
  const [balance, setBalance] = useState(null);
  const [resultadosGastos, setResultadosGastos] = useState({});
  const [institution_id, setInstitutionId] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstado((prev) => ({ ...prev, [name]: value }));
  };
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

  }, []);

  const aplicarOperaciones = () => {
    const gastos = calcularGastos();
    const ganancias = calcularGanancias();
    setResultadosGastos(gastos);
    calcularBalance(ganancias, gastos.total);
  };

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
      alquilerLocal: parseFloat(estado.alquilerLocal || 0),
      uniformesComprados: parseFloat(estado.uniformesCompradosCantidad || 0) * parseFloat(estado.uniformeCostoInstitucion || 0),
      uniformesRegalados: parseFloat(estado.uniformesRegalados || 0) * parseFloat(estado.uniformeCostoInstitucion || 0),
    };

    const total = Object.values(gastos).reduce((acc, curr) => acc + curr, 0);
    setTotalGastos(total);
    setEstado((prev) => ({ ...prev, TotalGastos: total }));  // Guardar el total de gastos
    return { ...gastos, total };

  };

  const calcularGanancias = () => {
    const ingresosPrivados = parseFloat(estado.mensualidadNinosPrivados || 0);
    const ingresosRedCuido = parseFloat(estado.mensualidadNinosRedCuido || 0);
    const ingresosUniformesComprados = parseFloat(estado.uniformesCompradosCantidad || 0) * parseFloat(estado.uniformeCostoInstitucion || 0);

    const total = ingresosPrivados + ingresosRedCuido + ingresosUniformesComprados;
    setTotalGanancias(total);
    setEstado((prev) => ({ ...prev, TotalGanancia: total }));  // Guardar las ganancias
    return total;
  };

  const calcularBalance = (ganancias, gastosTotal) => {
    const resultado = ganancias - gastosTotal;
    setBalance(resultado);
    setEstado((prev) => ({ ...prev, balance: resultado }));  // Guardar el balance
  };

  const enviarDatosAlBackend = async () => {    
    const datos = {
      ...estado,  // Incluye todos los campos del estado
      balance: estado.balance,
      institution: institution_id
    };
    await postGastos(datos)
    try {
      const response = await postGastos(datos);  // Envía los datos al backend
      console.log('Datos enviados');
      console.log('Respuesta del backend');
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div>
      <h1>Gastos</h1>
      {['luz', 'agua', 'internet', 'comida', 'materialDidactico', 'patentes', 'deduccionCaja', 'polizas', 'uniformesCompradosCantidad', 'uniformeCostoInstitucion', 'uniformesRegalados', 'alquilerLocal'].map((item) => (
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
      <h3>Total Ganancias: ${totalGanancias.toFixed(2)}</h3>

      {balance !== null && <h3>Balance: ${balance.toFixed(2)}</h3>}

      <h2>Resultados Detallados</h2>
      <ul>
        {Object.entries(resultadosGastos).map(([key, value]) => (
          <li key={key}>{key.replace(/([A-Z])/g, ' $1').trim()}: ${value?.toFixed(2) || 0}</li>
        ))}
      </ul>

      <h2>Enviar Datos al Backend</h2>
      <button onClick={enviarDatosAlBackend}>Enviar Datos</button>
    </div>
  );
}

export default GastosGanancias;
