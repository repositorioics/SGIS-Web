import React from 'react';
import { TextField } from '@mui/material';

/**
 * CustomTextField
 * 
 * Componente reutilizable de campo de texto, basado en Material UI, que admite validación de errores.
 * 
 * @param {string} label - Etiqueta del campo de texto.
 * @param {string} name - Nombre del campo de texto (propiedad `name`).
 * @param {string | number} value - Valor actual del campo de texto.
 * @param {function} onChange - Función para manejar el evento `onChange`.
 * @param {boolean} error - Indica si existe un error en el campo de texto.
 * @param {string} helperText - Mensaje de ayuda o error que se muestra debajo del campo de texto.
 * 
 * @returns {JSX.Element} Un campo de texto de Material UI con estilos personalizados.
 */
const CustomTextField = ({ label, name, value, onChange, error, helperText }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
    autoComplete="off"
    error={error}
    helperText={helperText}
    InputLabelProps={{
      sx: { color: 'text.secondary', fontSize: '16px' },
      shrink: true,
    }}
    InputProps={{
      className: 'formulario-input',
    }}
  />
);

export default CustomTextField;