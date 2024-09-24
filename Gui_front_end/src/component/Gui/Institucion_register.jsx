import React from 'react'

function Institucion_register() {
  return (
    <div>
        <h2>Registro de Instituciones</h2>
      <form action="">
        <label for="nombre">Nombre de la Institución:</label>
        <input type="text" id="name_institution" name="nombre" required />

        <label htmlFor="">Direccion de la Institución</label>
        <input type="text" id='address_institution' name='address' required />

        <label htmlFor="">Correo de la institucion</label>
        <input type="text" />

        <label htmlFor="">Numero de telefono</label>
        <input type="number" name="" id="" />

        <input type="button" value="Guardar" />
      </form>
    </div>
  )
}

export default Institucion_register
