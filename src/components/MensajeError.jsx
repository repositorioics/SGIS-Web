import React from 'react';
import '@/assets/styles/components/mensajeError.css';

const MensajeError = ({ mensaje }) => {
  return (
    <div className="mensaje-error">
      <p>Error: {mensaje}</p>
    </div>
  );
};

export default MensajeError;