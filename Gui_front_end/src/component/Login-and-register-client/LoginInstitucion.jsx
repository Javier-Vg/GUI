import React from 'react'

function LoginInstitucion() {
  return (
    <div> 
         <form>
    <div>
     <label htmlFor="username">Nombre de Usuario:</label>
     <input
       type="text"
       id="username"
    
     />
   </div>

   <div>
     <label htmlFor="password">Contraseña:</label>
     <input
       type="password"
       id="password"
       
     />
   </div>

   <button type="submit">Iniciar Sesión</button>
 </form>
 </div>
  )
}

export default LoginInstitucion