import React from 'react';
import PropTypes from 'prop-types';
import '@/assets/styles/inventario/estilosInventario.css';

const TarjetaResumen = ({ titulo, valor, icono }) => {
  return (
    <div className="tarjeta-resumen">
      <div className="icono-resumen">
        {icono}
        <p className='valor-resumen'>{valor}</p>
      </div>
      <div className="texto-resumen">
        <p>{titulo}</p>
      </div>
    </div>
  );
};

TarjetaResumen.propTypes = {
  titulo: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  icono: PropTypes.element,
};

export default TarjetaResumen;