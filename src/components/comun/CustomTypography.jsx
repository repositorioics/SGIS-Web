import React from 'react';
import { Typography } from '@mui/material';

/**
 * CustomTypography
 * 
 * Componente reutilizable para textos con configuración y estilos predeterminados.
 * 
 * @param {string} variant - Variante del estilo de texto, e.g., "h1", "h4", "subtitle1".
 * @param {string} color - Color del texto, predeterminado es "textPrimary".
 * @param {string} textAlign - Alineación del texto, predeterminado es "left".
 * @param {string} className - Clase CSS opcional para estilos específicos.
 * @param {ReactNode} children - Contenido a mostrar dentro del componente de texto.
 * @param {object} sx - Estilos adicionales opcionales para personalización.
 * 
 * @returns {JSX.Element} Elemento Typography de Material UI con estilos personalizados.
 */
const CustomTypography = ({
  variant = 'body1',
  color = 'textPrimary',
  textAlign = 'left',
  className = '',
  children,
  sx = {},
  ...props
}) => (
  <Typography
    variant={variant}
    color={color}
    textAlign={textAlign}
    sx={{ fontWeight: 'bold', ...sx }}
    className={className}
    {...props}
  >
    {children}
  </Typography>
);

export default CustomTypography;