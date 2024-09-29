import React from 'react';

const Boton = ({ etiqueta, onClick, tipo = 'button', deshabilitado = false, clase = '' }) => {
    return (
        <button type={tipo} onClick={onClick} disabled={deshabilitado} className={`btn ${clase}`}>
            {etiqueta}
        </button>
    );
};

export default Boton;