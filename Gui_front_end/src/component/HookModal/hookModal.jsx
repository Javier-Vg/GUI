// src/components/MyModal.js

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../../css/parents/expediente_notas.css';

const MyModal = forwardRef((props, ref) => { //forwardRef  Se usa para pasar la referencia al componente MyModal.
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({ //useImperativeHandle Se utiliza para exponer las funciones showModal y close al componente padre.
    showModal: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      style={{ display: isOpen ? 'block' : 'none' }} 
      className="modal-overlay" 
      onClick={handleOverlayClick}
    >
      <br />
      <br />
      <br />
      <div className="modal-content">
        {props.children}
        <button className='btn-hook' onClick={() => setIsOpen(false)}>Cerrar</button>
      </div>
    </div>
  );
});

export default MyModal;