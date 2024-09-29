import React from 'react';
import PropTypes from 'prop-types';
import '@/assets/styles/resumen/tarjeta.css';

const Tarjeta = ({ icono, titulo, texto, color }) => {
  return (
    <div className="tarjeta">
        <h5 className="tarjeta__titulo">{titulo}</h5>
        <div className="tarjeta__contenido">
          <p className="tarjeta__texto">{texto}</p>
          <div className={`tarjeta__icono tarjeta__icono--${color}`}>{icono}</div>
        </div>
    </div>
  );
};

Tarjeta.propTypes = {
  icono: PropTypes.element.isRequired,
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Tarjeta;