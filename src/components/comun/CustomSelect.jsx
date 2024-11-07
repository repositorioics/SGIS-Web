// CustomSelect.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, OutlinedInput } from '@mui/material';

const CustomSelect = ({ label, name, value, onChange, options, error, touched , multiple = false}) => (
  <FormControl
    fullWidth
    margin="normal"
    error={!!error && touched}
    variant="outlined"
    sx={{
      minWidth: 120,
    }}
  >
    {/* Ajustes en InputLabel para crear espacio superior */}
    <InputLabel
      shrink={true} // Forzamos que suba siempre
      sx={{
        fontSize: '14px',
        color: 'text.secondary',
        transform: value ? 'translate(14px, -6px) scale(0.85)' : 'translate(14px, 14px)',
        pointerEvents: 'none',
      }}
    >
      {label}
    </InputLabel>

    <Select
      input={<OutlinedInput label={label} />} // OutlinedInput asegura el espacio superior
      name={name}
      value={value}
      onChange={onChange}
      multiple={multiple}
      displayEmpty
      sx={{
        height: '40px',
        fontSize: '16px',
        textAlign: 'center',
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: error ? 'error.main' : 'text.secondary',
        },
      }}
    >
      {/* Opciones para el Select */}
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id} sx={{ fontSize: '16px' }}>
          {option.nombre}
        </MenuItem>
      ))}
    </Select>

    {/* Mensaje de error */}
    {error && touched && (
      <Typography color="error" variant="body2" sx={{ mt: 0.5, fontSize: '12px' }}>
        {error}
      </Typography>
    )}
  </FormControl>
);

export default CustomSelect;