import React from 'react'
import '../../css/error.css'
function Error() {
  return (
    <div className="error-container">
        <div className="error-content">
            <div className="error-face">😢</div>
            <h1>Lo sentimos</h1>
            <p>Pero no tienes acceso a esta pagina.</p>
            <a href="/login" className="back-button">Regresar al Inicio</a>
        </div>
    </div> 
  )
}

export default Error
