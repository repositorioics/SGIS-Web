import React from 'react';

const Entrada = ({ id, etiqueta, valor, onChange, tipo = 'text', placeholder = '', requerido = false }) => {
    return (
        <div className="control-formulario">
            <label htmlFor={id}>{etiqueta}</label>
            <input
                type={tipo}
                id={id}
                value={valor}
                onChange={onChange}
                required={requerido}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Entrada;