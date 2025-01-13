import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ModalConfirmacion = ({ abierto, onCerrar, onConfirmar }) => {
  const { t } = useTranslation(); // Usar el hook de traducción

  return (
    <Dialog open={abierto} onClose={onCerrar}>
      <DialogTitle>{t('formularioSolicitud.confirmarTitulo')}</DialogTitle>
      <DialogContent>
        <p>{t('formularioSolicitud.confirmarMensaje')}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCerrar} color="secondary">
          {t('formularioSolicitud.cancelar')}
        </Button>
        <Button onClick={onConfirmar} color="primary">
          {t('formularioSolicitud.confirmar')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmacion;