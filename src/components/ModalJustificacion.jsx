import React from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: 8,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  p: 3,
};

/**
 * ModalJustificacion
 *
 * Muestra un modal para que el usuario pueda proporcionar una justificación.
 *
 * @param {boolean} open - Estado que controla si el modal está abierto o cerrado.
 * @param {function} onClose - Función que cierra el modal.
 * @param {string} justificacion - Texto de justificación proporcionado por el usuario.
 * @param {function} onJustificacionChange - Función para manejar cambios en la justificación.
 * @param {function} onConfirm - Función que se ejecuta al confirmar la justificación.
 */
const ModalJustificacion = ({ open, onClose, justificacion, onJustificacionChange, onConfirm }) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-justificacion-title" aria-describedby="modal-justificacion-description">
      <Box sx={style}>
        <Typography id="modal-justificacion-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {t('pedido.justificacionTitulo')}
        </Typography>
        <Typography id="modal-justificacion-description" sx={{ mt: 2, color: 'text.secondary' }}>
          {t('pedido.ingreseJustificacion')}
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={justificacion}
          onChange={(e) => onJustificacionChange(e.target.value)}
          placeholder={t('pedido.justificacionPlaceholder')}
          sx={{ mt: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button onClick={onClose} variant="outlined" color="secondary" sx={{ borderRadius: 5 }}>
            {t('pedido.cancelar')}
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary" sx={{ borderRadius: 5 }}>
            {t('pedido.confirmar')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalJustificacion;