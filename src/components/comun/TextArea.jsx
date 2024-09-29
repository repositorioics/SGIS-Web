import React from 'react';

const TextArea = ({ id, valor, onChange, requerido, placeholder }) => (
  <textarea
    id={id}
    value={valor}
    onChange={onChange}
    required={requerido}
    placeholder={placeholder}
  />
);

export default TextArea;