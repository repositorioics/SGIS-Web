// src/components/CustomButton.jsx
import React from 'react';
import { Box, Button } from '@mui/material';
import '@/assets/styles/formularios.css';
/**
 * CustomButton - Componente reutilizable para botones con diseño y estilos específicos
 *
 * @param {string} label - Texto que muestra el botón.
 * @param {string} color - Color del botón, predeterminado "primary".
 * @param {string} variant - Variante del botón (e.g., "contained", "outlined"), predeterminado "contained".
 * @param {string} type - Tipo de botón (e.g., "button", "submit"), predeterminado "submit".
 * @param {function} onClick - Función que se ejecuta al hacer clic (opcional).
 */
const CustomButton = ({ label, color = 'primary', variant = 'contained', type = 'submit', onClick }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
    <Button
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      sx={{
        fontWeight: 'bold',
        fontSize: '16px',
        height:'40px',
        textTransform: 'none',
      }}
    >
      {label}
    </Button>
  </Box>
);

export default CustomButton;