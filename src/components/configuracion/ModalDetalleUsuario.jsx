import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const ModalDetalleUsuario = ({ usuario, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...estilosModal }}>
        <Button onClick={onClose} style={{ alignSelf: 'flex-end' }}>
          <FaTimes />
        </Button>
        <Typography variant="h6" component="h2">
          Detalles del Usuario
        </Typography>
        <Typography>ID: {usuario.id}</Typography>
        <Typography>Nombre: {usuario.nombre}</Typography>
        <Typography>Correo: {usuario.correo}</Typography>
        <Typography>Activo: {usuario.activo ? 'Sí' : 'No'}</Typography>
        {/* Agrega más campos si es necesario */}
      </Box>
    </Modal>
  );
};

const estilosModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

export default ModalDetalleUsuario;