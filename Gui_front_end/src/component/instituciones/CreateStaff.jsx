import React from 'react'

function CreateStaff() {
  return (
    <div>
        <input type="text" placeholder='nombre' />
        <input type="text" placeholder='apellidos'/>
        <input type="text" placeholder='numero de identificacion'/>
        <input type="text" placeholder='fecha de nacimiento'/>
        <input type="text" placeholder='direccion'/>
        <input type="text" placeholder='telefono' />
        <input type="text" placeholder='email'/>
        <input type="text" placeholder='creacion de puesto' />
        <label htmlFor="opciones">Selecciona un puesto creado anteriormente:</label>
        <select>
          <option value="">--Selecciona un puesto--</option>
          <option value="puesto1">director</option>
          <option value="puesto2">profesor</option>
          <option value="puesto3">secretaria</option>
        </select>
        <select >
        <option value="">--Selecciona un contracto--</option>
        <option value="contracto1">temporal</option>
          <option value="contracto2">permanente</option>
        </select>
        <input type="text" placeholder='salario mensual' />
        
    </div>
  )
}

export default CreateStaff