import React, { useState, useEffect } from "react";
import { postGastos } from "../../service/LoginGui"; // Servicio para enviar datos al backend
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Librería para decodificar tokens JWT
import '../../css/Institutions/Gastos.css'; // Archivo CSS para estilos

function GastosGanancias() {
  // Estado para almacenar valores de gastos y ganancias
  const [estado, setEstado] = useState({
    luz: "",
    agua: "",
    internet: "",
    comida: "",
    materialDidactico: "",
    patentes: "",
    deduccionCaja: "",
    polizas: "",
    uniformesCompradosCantidad: "",
    uniformeCostoInstitucion: "",
    uniformesRegalados: "",
    fechaRegistro: "",
    mensualidadNinosPrivados: "",
    mensualidadNinosRedCuido: "",
    TotalGanancia: 0,
    TotalGastos: 0,
    total: 0,
    alquilerLocal: "",
  });

  // Estado adicional para manejar totales y balance
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalGanancias, setTotalGanancias] = useState(0);
  const [balance, setBalance] = useState(null);
  const [resultadosGastos, setResultadosGastos] = useState({});
  const [institution_id, setInstitutionId] = useState(null);

  //Detecta cambios de los inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstado((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const token = Cookies.get("AuthCookie");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const institutionIdFromToken = decodedToken.info.institution;
        setInstitutionId(institutionIdFromToken);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  //
  const aplicarOperaciones = () => {
    const gastos = calcularGastos();
    const ganancias = calcularGanancias();
    setResultadosGastos(gastos); // Guarda los resultados de los gastos detallados
    calcularBalance(ganancias, gastos.total); // Calcula el balance general
  };

  // Función para calcular el total de gastos
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
      uniformesComprados:
        parseFloat(estado.uniformesCompradosCantidad || 0) *
        parseFloat(estado.uniformeCostoInstitucion || 0),
      uniformesRegalados:
        parseFloat(estado.uniformesRegalados || 0) *
        parseFloat(estado.uniformeCostoInstitucion || 0),
    };

    // Calcula el total sumando todos los gastos
    const total = Object.values(gastos).reduce((acc, curr) => acc + curr, 0);
    setTotalGastos(total); // Actualiza el estado del total de gastos
    setEstado((prev) => ({ ...prev, TotalGastos: total })); // Guarda el total en el estado
    return { ...gastos, total };
  };

  //Funcion que calcula los gastos y ganancias finales.
  const calcularGanancias = () => {
    const ingresosPrivados = parseFloat(estado.mensualidadNinosPrivados || 0);
    const ingresosRedCuido = parseFloat(estado.mensualidadNinosRedCuido || 0);
    const ingresosUniformesComprados =
      parseFloat(estado.uniformesCompradosCantidad || 0) *
      parseFloat(estado.uniformeCostoInstitucion || 0);

    const total =
      ingresosPrivados + ingresosRedCuido + ingresosUniformesComprados;
    setTotalGanancias(total); // Actualiza el total de ganancias en el estado
    setEstado((prev) => ({ ...prev, TotalGanancia: total }));
    return total;
  };

  // Función para calcular el balance final
  const calcularBalance = (ganancias, gastosTotal) => {
    const resultado = ganancias - gastosTotal;
    setBalance(resultado); // Actualiza el balance en el estado
    setEstado((prev) => ({ ...prev, balance: resultado }));
  };

  // Función para enviar los datos al backend
  const enviarDatosAlBackend = async () => {
    const datos = {
      ...estado,
      balance: estado.balance,
      institution: institution_id,
    };
    try {
      const response = await postGastos(datos); // Envía los datos al backend
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <>
      <div className="container-gastos">
        <h1 className="titulo-principal">Gastos</h1>
        <div className="grid">
          {/* Inputs para cada tipo de gasto */}
          {[
            "luz",
            "agua",
            "internet",
            "comida",
            "materialDidactico",
            "patentes",
            "deduccionCaja",
            "polizas",
            "uniformesCompradosCantidad",
            "uniformeCostoInstitucion",
            "uniformesRegalados",
            "alquilerLocal",
          ].map((item) => (
            <label key={item} className="etiqueta-gasto">
              {item.replace(/([A-Z])/g, " $1").trim()}:
              <input
                type="number"
                name={item}
                value={estado[item]}
                onChange={handleChange}
                step="0.01"
                className="input-gasto"
              />
            </label>
          ))}
        </div>

        <label className="etiqueta-fecha">
          Fecha de Registro de Gastos:
          <input
            type="date"
            name="fechaRegistro"
            value={estado.fechaRegistro}
            onChange={handleChange}
            className="input-fecha"
          />
        </label>

        <h2 className="titulo-secundario">Operaciones</h2>
        <button onClick={aplicarOperaciones} className="boton-operaciones">
          Aplicar Operaciones
        </button>
        <h3 className="total-gastos">
          Total Gastos: ${totalGastos.toFixed(2)}
        </h3>

        <h1 className="titulo-principal">Ganancias</h1>
        <div className="grid">
          {/* Inputs para cada tipo de ganancia */}
          {["mensualidadNinosPrivados", "mensualidadNinosRedCuido"].map(
            (item) => (
              <label key={item} className="etiqueta-ganancia">
                {item.replace(/([A-Z])/g, " $1").trim()}:
                <input
                  type="number"
                  name={item}
                  value={estado[item]}
                  onChange={handleChange}
                  step="0.01"
                  className="input-ganancia"
                />
              </label>
            )
          )}
        </div>

        <h3 className="total-ganancias">
          Total Ganancias: ${totalGanancias.toFixed(2)}
        </h3>

        {balance !== null && (
          <h3 className="balance">Balance: ${balance.toFixed(2)}</h3>
        )}

        <h2 className="titulo-secundario">Resultados Detallados</h2>
        <ul className="lista-resultados">
          {/* Muestra los resultados detallados de cada gasto */}
          {Object.entries(resultadosGastos).map(([key, value]) => (
            <li key={key} className="item-resultado">
              {key.replace(/([A-Z])/g, " $1").trim()}: ${value?.toFixed(2) || 0}
            </li>
          ))}
        </ul>

        <h2 className="titulo-secundario">Enviar Datos al Backend</h2>
        <button onClick={enviarDatosAlBackend} className="boton-enviar">
          Enviar Datos
        </button>
      </div>
    </>
  );
}

export default GastosGanancias;
